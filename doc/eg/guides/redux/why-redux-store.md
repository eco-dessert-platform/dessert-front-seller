# 왜 모든 API 요청에 Redux Store를 사용하는가?

## 📋 목차
1. [중앙 집중식 상태 관리](#1-중앙-집중식-상태-관리)
2. [예측 가능한 상태 흐름](#2-예측-가능한-상태-흐름)
3. [일관된 에러 처리](#3-일관된-에러-처리)
4. [자동 로딩 상태 관리](#4-자동-로딩-상태-관리)
5. [다른 라이브러리와의 비교](#5-다른-라이브러리와의-비교)

---

## 1. 중앙 집중식 상태 관리

### 📊 문제점

**React Query, SWR 등을 사용할 때:**
- 각 컴포넌트가 독립적으로 캐시를 관리
- 여러 컴포넌트에서 동일한 데이터를 사용할 때 동기화 어려움
- 전역 상태와 서버 상태가 분리됨

### ✅ Redux Store의 해결책

```typescript
// Redux Store를 사용하면
// 어느 컴포넌트에서든 동일한 데이터에 접근 가능
const pokemon = useAppSelector(state => state.sampleReducer.pokemon)
```

### 장점

#### ✅ 전역에서 동일한 데이터 상태 보장

```typescript
// ComponentA.tsx
const pokemon = useAppSelector(state => state.sampleReducer.pokemon)

// ComponentB.tsx (다른 컴포넌트)
const pokemon = useAppSelector(state => state.sampleReducer.pokemon)
// 항상 동일한 데이터를 참조함 (동기화 문제 없음)
```

#### ✅ Redux DevTools로 모든 API 요청 추적 가능

```typescript
// Redux DevTools에서 확인 가능
Action: sample/getPokemon
State Before: { pokemon: { data: null, loading: false } }
State After: { pokemon: { data: null, loading: true } }

Action: sample/getPokemonSuccess
State Before: { pokemon: { data: null, loading: true } }
State After: { pokemon: { data: {...}, loading: false } }
```

#### ✅ Time-travel debugging 가능

- Redux DevTools에서 액션을 되돌리고 다시 재생 가능
- 버그 재현이 쉬움
- 특정 시점의 상태로 이동 가능

---

## 2. 예측 가능한 상태 흐름

### 명확한 데이터 흐름

```
Component Dispatch 
    → Action 
    → Saga 
    → API Call 
    → Success/Fail Action 
    → Reducer 
    → State Update 
    → Component Re-render
```

### 이점

#### 1) 모든 상태 변화가 액션을 통해 추적 가능

```typescript
// Redux DevTools에서 전체 흐름 확인 가능
1. sample/getPokemon (사용자 클릭)
2. sample/getPokemonSuccess (API 성공)
3. sample/setValue (로컬 상태 변경)
```

#### 2) 디버깅이 명확하고 쉬움

```typescript
// 문제 발생 시
// 1. Redux DevTools에서 액션 히스토리 확인
// 2. 어느 액션에서 문제가 생겼는지 파악
// 3. 해당 액션의 payload 확인
// 4. Saga 또는 Reducer의 로직 점검
```

#### 3) 상태 변화의 원인을 명확히 알 수 있음

```typescript
// ❌ useState를 사용한 경우
const [data, setData] = useState(null)
setData(newData) // 어디서 호출되었는지 추적 어려움

// ✅ Redux를 사용한 경우
dispatch(sampleAction.getPokemon()) 
// Redux DevTools에서 정확히 어느 컴포넌트에서 호출되었는지 확인 가능
```

---

## 3. 일관된 에러 처리

### Saga에서 중앙 집중식 에러 처리

```typescript
function* fetchApiData(action) {
    try {
        const response = yield call(api, action.payload)
        const { status, data } = response
        
        if (status >= 400) {
            // 모든 API 에러를 일관되게 처리
            const errorMessage = getErrorMessage(status, data)
            yield put({ 
                type: `${prefix}/${reducerName}Fail`, 
                payload: errorMessage 
            })
            return
        }
        
        yield put({ 
            type: `${prefix}/${reducerName}Success`, 
            payload: data 
        })
    } catch (error) {
        // 네트워크 에러 등 예외 처리
        const errorMessage = extractErrorMessage(error, fallback)
        yield put({ 
            type: `${prefix}/${reducerName}Fail`, 
            payload: errorMessage 
        })
    }
}
```

### 장점

#### ✅ HTTP 상태 코드별 에러 메시지 자동 매핑

```typescript
const messages = {
    400: '잘못된 요청입니다.',
    401: '인증 오류 발생: 로그인 해주세요.',
    403: '접근이 거부되었습니다.',
    404: '요청한 리소스를 찾을 수 없습니다.',
    500: '서버 오류가 발생했습니다.',
    503: '서버가 현재 사용할 수 없습니다.',
}
```

#### ✅ 네트워크 에러, Axios 에러 통합 처리

```typescript
// 모든 에러를 동일한 형태로 변환
try {
    // API 호출
} catch (error) {
    if (axios.isAxiosError(error)) {
        // Axios 에러
    } else if (error instanceof TypeError) {
        // 네트워크 에러
    } else {
        // 기타 에러
    }
    // 최종적으로 일관된 형태의 에러 메시지 반환
}
```

#### ✅ UI에서 에러 처리 로직 간소화

```typescript
// 컴포넌트에서는 단순하게 처리
const { error, errorMsg } = useAppSelector(
    state => state.sampleReducer.pokemon
)

if (error) {
    return <ErrorMessage message={errorMsg} />
}
```

---

## 4. 자동 로딩 상태 관리

### Redux 방식

```typescript
// 컴포넌트에서 사용
const { data, loading, error, errorMsg } = useAppSelector(
    state => state.sampleReducer.pokemon
)

if (loading) return <Spinner />
if (error) return <ErrorMessage message={errorMsg} />
return <PokemonCard data={data} />
```

### React Query를 사용한 경우

```typescript
const { data, isLoading, error } = useQuery('pokemon', fetchPokemon)
// 각 컴포넌트에서 개별적으로 처리
```

### Redux 방식의 장점

#### ✅ 모든 API 요청의 로딩 상태가 Store에 저장됨

```typescript
// Store 상태
{
    sampleReducer: {
        pokemon: { loading: true },
        userInfo: { loading: false },
        orderList: { loading: false },
    }
}

// 전역 로딩 인디케이터 구현 가능
const isAnyLoading = useAppSelector(state => 
    state.sampleReducer.pokemon.loading ||
    state.sampleReducer.userInfo.loading ||
    state.sampleReducer.orderList.loading
)
```

#### ✅ 여러 컴포넌트에서 동일한 로딩 상태 공유 가능

```typescript
// ComponentA - 로딩 중인지 확인
const isLoading = useAppSelector(state => state.sampleReducer.pokemon.loading)

// ComponentB - 같은 로딩 상태 참조
const isLoading = useAppSelector(state => state.sampleReducer.pokemon.loading)
```

#### ✅ 글로벌 로딩 인디케이터 구현 용이

```typescript
// GlobalLoadingIndicator.tsx
const GlobalLoadingIndicator = () => {
    const isLoading = useAppSelector(state => {
        // 모든 reducer의 loading 상태 확인
        return Object.values(state).some(reducer => 
            Object.values(reducer).some(value => 
                value?.loading === true
            )
        )
    })
    
    if (!isLoading) return null
    return <div className="global-spinner">Loading...</div>
}
```

---

## 5. 다른 라이브러리와의 비교

### React Query vs Redux Store

| 기능 | React Query | Redux Store |
|-----|-------------|-------------|
| **상태 추적** | 컴포넌트 레벨 캐시 | 전역 Store |
| **디버깅** | React DevTools | Redux DevTools (Time-travel) |
| **상태 동기화** | 자동 리페칭 | 명시적 관리 |
| **에러 처리** | 각 쿼리마다 개별 처리 | 중앙 집중식 처리 |
| **캐싱 전략** | 자동 (staleTime, cacheTime) | 수동 (명시적 관리) |
| **학습 곡선** | 낮음 | 높음 (Saga 학습 필요) |
| **번들 크기** | 작음 (~13KB) | 큼 (~30KB) |
| **예측 가능성** | 낮음 (자동 리페칭) | 높음 (명시적 액션) |

### 언제 Redux Store를 사용해야 하는가?

#### ✅ Redux Store가 적합한 경우

1. **중대형 프로젝트**
   - 여러 페이지에서 동일한 데이터를 공유
   - 복잡한 상태 관리가 필요한 경우

2. **예측 가능한 상태 흐름이 중요한 경우**
   - 금융, 의료 등 critical한 도메인
   - 모든 상태 변화를 추적해야 하는 경우

3. **복잡한 비동기 로직**
   - API 요청 간 의존성이 있는 경우
   - 취소, 재시도, 폴링 등이 필요한 경우

4. **팀 협업**
   - 일관된 코드 스타일이 중요한 경우
   - 신입 개발자도 쉽게 따라할 수 있는 패턴

#### ❌ React Query가 더 적합한 경우

1. **작은 프로젝트**
   - 페이지가 몇 개 없는 경우
   - 상태 공유가 거의 없는 경우

2. **프로토타입/MVP**
   - 빠른 개발 속도가 중요한 경우
   - 복잡한 설정 없이 바로 시작하고 싶은 경우

3. **서버 상태 캐싱이 중요한 경우**
   - 자동 캐싱/리페칭이 필요한 경우
   - Stale-While-Revalidate 패턴이 필요한 경우

---

## 실전 시나리오

### 시나리오 1: 사용자 정보를 여러 곳에서 사용

```typescript
// ❌ React Query를 사용한 경우
// Header.tsx
const { data: user } = useQuery('user', fetchUser)

// Sidebar.tsx
const { data: user } = useQuery('user', fetchUser) // 중복 호출 가능성

// Profile.tsx
const { data: user } = useQuery('user', fetchUser) // 또 중복 호출 가능성
```

```typescript
// ✅ Redux Store를 사용한 경우
// App.tsx - 한 번만 호출
useEffect(() => {
    dispatch(userAction.getUser())
}, [])

// Header.tsx - Store에서 읽기만
const user = useAppSelector(state => state.userReducer.user)

// Sidebar.tsx - Store에서 읽기만
const user = useAppSelector(state => state.userReducer.user)

// Profile.tsx - Store에서 읽기만
const user = useAppSelector(state => state.userReducer.user)
```

### 시나리오 2: 복잡한 에러 처리

```typescript
// ✅ Redux Saga에서 중앙 집중식 처리
function* handleApiError(error, action) {
    // 1. 에러 로깅
    yield call(logErrorToServer, error)
    
    // 2. 특정 에러는 특별 처리
    if (error.status === 401) {
        yield put(authAction.logout())
        yield call(redirectToLogin)
    }
    
    // 3. 사용자에게 메시지 표시
    yield put(toastAction.showError(error.message))
    
    // 4. 에러 상태 업데이트
    yield put(action.fail(error.message))
}
```

---

**다음 문서**: [비동기 처리 & 미들웨어](./async-middleware.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0

