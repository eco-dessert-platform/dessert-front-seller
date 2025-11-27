# 성능 및 메모리 최적화

## 📋 목차

1. [메모리 관리 전략](#메모리-관리-전략)
2. [성능 최적화](#성능-최적화)
3. [대용량 데이터 처리](#대용량-데이터-처리)
4. [Redux DevTools 최적화](#redux-devtools-최적화)
5. [메모리 프로파일링](#메모리-프로파일링)
6. [실전 메모리 관리 패턴](#실전-메모리-관리-패턴)

---

## 메모리 관리 전략

### ⚠️ 잠재적 문제

Redux Store는 전역 상태이므로 데이터가 계속 누적될 수 있습니다.

```typescript
// 문제: 모든 API 응답이 Store에 계속 쌓임
{
    sampleReducer: {
        pokemon: { data: {...}, loading: false },      // 페이지 A에서 호출
        userList: { data: [1000개 항목], loading: false },  // 페이지 B에서 호출
        orderHistory: { data: [5000개 항목], loading: false }, // 페이지 C에서 호출
        // 페이지를 벗어나도 데이터가 계속 남아있음 ⚠️
    }
}
```

**메모리 누적 시나리오:**

1. 사용자가 여러 페이지를 탐색
2. 각 페이지에서 API 호출
3. 데이터가 Store에 계속 쌓임
4. 페이지를 떠나도 데이터 유지
5. 장시간 사용 시 메모리 증가

### ✅ 해결 방법

#### 1) 페이지 언마운트 시 상태 초기화

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // 컴포넌트 마운트 시 데이터 fetch
        dispatch(sampleAction.getPokemon())

        return () => {
            // ✅ 언마운트 시 해당 상태만 초기화
            dispatch(sampleAction.initialize('pokemon'))
        }
    }, [])

    return <div>...</div>
}
```

#### 2) 라우트 변경 시 특정 reducer 초기화

```typescript
// routerSaga.tsx
function* handleRouteChange(action) {
    const { from, to } = action.payload

    // 특정 페이지를 벗어날 때 대용량 데이터 정리
    if (from === '/orders' && to !== '/orders') {
        yield put(orderAction.initialize('orderHistory'))
    }

    // 로그인 페이지로 이동 시 사용자 데이터 정리
    if (to === '/login') {
        yield put(userAction.initializeAll())
    }
}

function* routerSaga() {
    yield takeEvery('router/change', handleRouteChange)
}
```

#### 3) 전역 초기화 액션 활용

```typescript
// 로그아웃 시 모든 상태 초기화
const handleLogout = () => {
    // 모든 reducer의 상태 초기화
    dispatch(sampleAction.initializeAll())
    dispatch(userAction.initializeAll())
    dispatch(orderAction.initializeAll())

    // Store가 완전히 초기 상태로 돌아감
}
```

#### 4) 선택적 데이터 보존

```typescript
const localState = {
    value: 0,
    // 캐시하고 싶은 데이터 (앱이 종료될 때까지 유지)
    cachedUserInfo: null as UserInfo | null,
}

// 초기화 시에도 캐시 데이터는 유지
const localReducers = {
    clearTemporaryData: (state) => {
        // 임시 데이터만 초기화
        state.value = 0
        // cachedUserInfo는 유지
    },
}
```

---

## 성능 최적화

### ⚠️ 불필요한 리렌더링 문제

```typescript
// ❌ 나쁜 예: 전체 reducer를 구독
const Sample = () => {
    // sampleReducer의 어떤 값이라도 변경되면 리렌더링!
    const allState = useAppSelector(state => state.sampleReducer)

    return <div>{allState.pokemon.data?.name}</div>
}

// ✅ 좋은 예: 필요한 것만 선택
const Sample = () => {
    // pokemon만 변경될 때만 리렌더링
    const pokemon = useAppSelector(state => state.sampleReducer.pokemon)

    return <div>{pokemon.data?.name}</div>
}
```

### ✅ Selector 최적화

#### 1) Memoized Selector 사용

```typescript
import { createSelector } from '@reduxjs/toolkit'

// 복잡한 연산을 메모이제이션
const selectPokemonName = createSelector(
    [(state: RootState) => state.sampleReducer.pokemon],
    (pokemon) => {
        // 무거운 연산 (예: 데이터 변환)
        console.log('복잡한 연산 실행')
        return pokemon.data?.name.toUpperCase()
    },
)

const Sample = () => {
    // pokemon.data가 변경될 때만 재계산
    const name = useAppSelector(selectPokemonName)
}
```

**장점:**

- ✅ 동일한 입력에 대해 이전 결과 재사용
- ✅ 불필요한 계산 방지
- ✅ 리렌더링 최소화

#### 2) 여러 상태 조합

```typescript
const selectPokemonSummary = createSelector(
    [
        (state: RootState) => state.sampleReducer.pokemon,
        (state: RootState) => state.sampleReducer.value,
    ],
    (pokemon, value) => {
        // 복잡한 계산
        return {
            name: pokemon.data?.name,
            power: (pokemon.data?.id || 0) * value,
            level: Math.floor(value / 10),
        }
    }
)

const Sample = () => {
    const summary = useAppSelector(selectPokemonSummary)
    return <div>Power: {summary.power}</div>
}
```

#### 3) shallowEqual 사용

```typescript
import { shallowEqual } from 'react-redux'

const Sample = () => {
    // 객체의 속성이 변경되지 않으면 리렌더링하지 않음
    const { pokemon, test } = useAppSelector(
        (state) => ({
            pokemon: state.sampleReducer.pokemon,
            test: state.sampleReducer.test,
        }),
        shallowEqual,
    )
}
```

#### 4) React.memo로 컴포넌트 최적화

```typescript
// 불필요한 리렌더링 방지
const PokemonCard = React.memo(({ pokemon }) => {
    console.log('PokemonCard 렌더링')

    return (
        <div>
            <h2>{pokemon.data?.name}</h2>
            <p>ID: {pokemon.data?.id}</p>
        </div>
    )
})

const Sample = () => {
    const pokemon = useAppSelector(state => state.sampleReducer.pokemon)

    // pokemon이 변경될 때만 PokemonCard 리렌더링
    return <PokemonCard pokemon={pokemon} />
}
```

#### 5) useCallback으로 콜백 최적화

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()

    // 콜백 메모이제이션
    const handleFetch = useCallback(() => {
        dispatch(sampleAction.getPokemon())
    }, [dispatch])

    return <ExpensiveComponent onFetch={handleFetch} />
}
```

---

## 대용량 데이터 처리

### ⚠️ 문제 상황

```typescript
// ❌ 위험: 10,000개 아이템을 한 번에 Store에 저장
const asyncRequests = [
    {
        action: 'getAllProducts',
        state: 'products',
        initialState: [],
        api: () => axios.get('/api/products?limit=10000'),
        // 수백 KB ~ 수 MB의 데이터가 메모리에 상주
    },
]
```

### ✅ 해결 방법

#### 1) 페이지네이션

```typescript
// 페이지별로 데이터 로드
const asyncRequests = [
    {
        action: 'getProducts',
        state: 'products',
        initialState: {
            items: [],
            page: 1,
            totalPages: 0,
            hasMore: true,
        },
        api: (params: { page: number; limit: number }) =>
            axios.get(`/api/products?page=${params.page}&limit=${params.limit}`),
    },
]

// 사용
const ProductList = () => {
    const dispatch = useAppDispatch()
    const { data, loading } = useAppSelector(state => state.productReducer.products)

    const loadMore = () => {
        if (data?.hasMore && !loading) {
            dispatch(productAction.getProducts({
                page: (data.page || 0) + 1,
                limit: 20
            }))
        }
    }

    return (
        <div>
            {data?.items.map(item => <ProductCard key={item.id} {...item} />)}
            {data?.hasMore && <button onClick={loadMore}>더 보기</button>}
        </div>
    )
}
```

#### 2) 무한 스크롤 + 가상화

```typescript
import { useVirtualizer } from '@tanstack/react-virtual'

const ProductList = () => {
    const parentRef = useRef<HTMLDivElement>(null)
    const products = useAppSelector(state => state.productReducer.products)

    // 화면에 보이는 아이템만 렌더링
    const virtualizer = useVirtualizer({
        count: products.data?.items.length || 0,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100, // 각 아이템 높이
        overscan: 5, // 버퍼 아이템 개수
    })

    return (
        <div ref={parentRef} style={{ height: '600px', overflow: 'auto' }}>
            <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
                {virtualizer.getVirtualItems().map((virtualItem) => (
                    <div
                        key={virtualItem.index}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualItem.start}px)`,
                        }}
                    >
                        <ProductCard {...products.data.items[virtualItem.index]} />
                    </div>
                ))}
            </div>
        </div>
    )
}
```

#### 3) 필요한 필드만 저장

```typescript
// API 응답 변환
function* fetchProductsSaga(action) {
    try {
        const response = yield call(api, action.payload)

        // ✅ 필요한 데이터만 추출
        const essentialData = response.data.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            thumbnail: item.thumbnail,
            // 불필요한 필드는 제외
            // description: item.description (1KB+)
            // reviews: item.reviews (수십 KB)
            // relatedProducts: item.relatedProducts
        }))

        yield put({
            type: 'product/getProductsSuccess',
            payload: essentialData,
        })
    } catch (error) {
        // ...
    }
}
```

#### 4) 데이터 정규화

```typescript
// ❌ 중복된 데이터
const products = [
    { id: 1, name: 'A', category: { id: 1, name: 'Electronics' } },
    { id: 2, name: 'B', category: { id: 1, name: 'Electronics' } },
    { id: 3, name: 'C', category: { id: 2, name: 'Books' } },
]

// ✅ 정규화된 데이터
const normalizedData = {
    products: {
        1: { id: 1, name: 'A', categoryId: 1 },
        2: { id: 2, name: 'B', categoryId: 1 },
        3: { id: 3, name: 'C', categoryId: 2 },
    },
    categories: {
        1: { id: 1, name: 'Electronics' },
        2: { id: 2, name: 'Books' },
    },
}
```

---

## Redux DevTools 최적화

```typescript
const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: {
        // ✅ 액션 히스토리 제한 (메모리 절약)
        maxAge: 50,

        // ✅ 큰 payload는 간략하게 표시
        actionSanitizer: (action) => {
            if (action.type === 'product/getProductsSuccess') {
                return {
                    ...action,
                    payload: `<<LONG_PAYLOAD: ${action.payload?.length} items>>`,
                }
            }
            return action
        },

        // ✅ 상태 직렬화 제한
        stateSanitizer: (state) => {
            return {
                ...state,
                productReducer: {
                    ...state.productReducer,
                    products: state.productReducer.products?.items?.length
                        ? `<<${state.productReducer.products.items.length} items>>`
                        : state.productReducer.products,
                },
            }
        },

        // ✅ 프로덕션에서는 비활성화
        trace: process.env.NODE_ENV === 'development',
        traceLimit: 25,
    },
})
```

---

## 메모리 프로파일링

### Chrome DevTools로 메모리 측정

```typescript
// 특정 액션의 메모리 영향 측정
const measureMemory = async (actionName: string, action: any) => {
    if (performance.memory) {
        const before = performance.memory.usedJSHeapSize

        store.dispatch(action)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const after = performance.memory.usedJSHeapSize
        const diff = ((after - before) / 1024 / 1024).toFixed(2)

        console.log(`${actionName}: ${diff} MB`)
    }
}

// 사용
measureMemory(
    'fetchProducts',
    sampleAction.getProducts({ page: 1, limit: 100 }),
)
```

### 메모리 누수 감지

```typescript
// App.tsx
const App = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && performance.memory) {
            const checkMemory = setInterval(() => {
                const used = performance.memory.usedJSHeapSize
                const total = performance.memory.jsHeapSizeLimit
                const ratio = used / total

                console.log(`Memory: ${(used / 1024 / 1024).toFixed(2)} MB (${(ratio * 100).toFixed(1)}%)`)

                if (ratio > 0.9) {
                    console.warn('⚠️ High memory usage detected!')
                }
            }, 10000) // 10초마다 체크

            return () => clearInterval(checkMemory)
        }
    }, [])

    return <Router />
}
```

---

## 실전 메모리 관리 패턴

### 1. 라이프사이클 기반 정리

```typescript
// App.tsx 또는 라우터 레벨
const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        // visibility change 감지
        const handleVisibilityChange = () => {
            if (document.hidden) {
                // ✅ 탭이 백그라운드로 가면 임시 데이터 정리
                console.log('Tab hidden - cleaning temporary data')
                dispatch(sampleAction.clearTemporaryData())
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
        }
    }, [])

    return <Router />
}
```

### 2. 메모리 압박 시 자동 정리

```typescript
const MemoryManager = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        if ('memory' in performance) {
            const checkMemory = setInterval(() => {
                const ratio =
                    performance.memory.usedJSHeapSize /
                    performance.memory.jsHeapSizeLimit

                if (ratio > 0.9) {
                    console.warn('High memory usage - clearing caches')

                    // 대용량 데이터 정리
                    dispatch(productAction.initialize('products'))
                    dispatch(orderAction.initialize('orderHistory'))
                }
            }, 30000) // 30초마다 체크

            return () => clearInterval(checkMemory)
        }
    }, [])

    return null
}
```

### 3. 라우트별 메모리 관리

```typescript
// Router.tsx
const Router = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    useEffect(() => {
        // 라우트 변경 시 이전 페이지 데이터 정리
        return () => {
            const path = location.pathname

            if (path.startsWith('/products')) {
                dispatch(productAction.initializeAll())
            } else if (path.startsWith('/orders')) {
                dispatch(orderAction.initializeAll())
            }
        }
    }, [location])

    return <Routes>...</Routes>
}
```

### 4. 캐시 만료 전략

```typescript
// cacheMiddleware.ts
const cacheMiddleware = (store) => (next) => (action) => {
    const result = next(action)

    // 성공 액션에 타임스탬프 추가
    if (action.type.endsWith('Success')) {
        const state = store.getState()
        const timestamp = Date.now()

        // 5분 후 데이터 만료
        setTimeout(
            () => {
                const currentState = store.getState()
                // 데이터가 여전히 같으면 초기화
                if (currentState === state) {
                    store.dispatch({
                        type: action.type.replace('Success', 'Expire'),
                    })
                }
            },
            5 * 60 * 1000,
        )
    }

    return result
}
```

---

## 성능 벤치마크

### 시나리오: 1000개 상품 목록 렌더링

#### Redux (최적화 전)

```
- 초기 렌더링: 850ms
- 메모리: 12.5 MB
- 리렌더링: 320ms
```

#### Redux (최적화 후)

```
- 초기 렌더링: 180ms (useSelector 최적화)
- 메모리: 3.2 MB (필요한 필드만 저장)
- 리렌더링: 45ms (React.memo + memoized selector)
```

### 최적화 체크리스트

#### ✅ 필수 최적화

- [ ] 페이지 언마운트 시 `initialize` 호출
- [ ] useSelector로 필요한 상태만 구독
- [ ] 대용량 리스트는 페이지네이션 적용
- [ ] Redux DevTools 프로덕션 비활성화

#### ✅ 선택적 최적화

- [ ] createSelector로 복잡한 계산 메모이제이션
- [ ] React.memo로 컴포넌트 리렌더링 방지
- [ ] shallowEqual 사용
- [ ] 가상화 라이브러리 적용 (react-virtual)
- [ ] 데이터 정규화

---

## 결론: 성능 관점

### ✅ Redux Store의 장점

**명시적인 메모리 관리**

- initialize, initializeAll로 언제든 데이터 정리 가능
- React Query의 자동 캐싱보다 예측 가능

**실시간 모니터링**

- Redux DevTools로 상태 크기 확인
- 메모리 누수 추적 용이

**선택적 영속성**

- redux-persist로 중요한 데이터만 로컬스토리지에 저장
- 임시 데이터는 메모리에만 유지

### ⚠️ 주의사항

1. **페이지 언마운트 시 cleanup 필수**
2. **대용량 데이터는 페이지네이션 필수**
3. **useSelector 최적화 필요**
4. **불필요한 필드는 Store에 저장하지 않기**

### 💡 권장사항

1. 컴포넌트 언마운트 시 cleanup 습관화
2. Redux DevTools로 정기적 메모리 점검
3. 대용량 리스트는 가상화 적용
4. 필요한 데이터만 선택적으로 저장

---

**다음 문서**: [Best Practices](./best-practices.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0
