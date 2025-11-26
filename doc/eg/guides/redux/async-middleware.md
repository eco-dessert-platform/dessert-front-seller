# 비동기 처리 & 미들웨어

## 📋 목차
1. [비동기 처리 관점](#비동기-처리-관점)
2. [Redux Saga를 선택한 이유](#redux-saga를-선택한-이유)
3. [Saga Effect의 강력한 기능들](#saga-effect의-강력한-기능들)
4. [Side Effect의 중앙 집중 관리](#side-effect의-중앙-집중-관리)
5. [미들웨어 체인과 로깅](#미들웨어-체인과-로깅)

---

## 비동기 처리 관점

### 1. Saga의 Effect 활용

```typescript
function* createRequestSaga(prefix, reducerName, api) {
    return function* fetchApiData(action) {
        try {
            // call: API 호출을 동기적으로 대기
            const response = yield call(api, action.payload)
            
            // put: 액션 디스패치
            yield put({
                type: `${prefix}/${reducerName}Success`,
                payload: response.data,
            })
        } catch (error) {
            yield put({
                type: `${prefix}/${reducerName}Fail`,
                payload: errorMessage,
            })
        }
    }
}
```

### 2. 비동기 처리의 장점

#### 1) 테스트 가능성

```typescript
// Saga는 제너레이터 함수이므로 테스트가 쉬움
test('should handle API success', () => {
    const gen = fetchApiData({ payload: {} })
    
    // 첫 번째 yield 확인
    expect(gen.next().value).toEqual(call(api, {}))
    
    // 두 번째 yield 확인
    expect(gen.next(response).value).toEqual(
        put({ type: 'sample/getPokemonSuccess', payload: data })
    )
})
```

**장점:**
- 제너레이터는 단계별로 실행 제어 가능
- 실제 API 호출 없이 테스트 가능
- 각 단계의 출력을 검증 가능

#### 2) 취소 가능한 비동기 작업

```typescript
const saga = function* () {
    // takeLatest: 이전 요청이 완료되지 않았으면 자동 취소
    yield takeLatest('sample/getPokemon', createRequestSaga(...))
}
```

**실전 시나리오:**

```typescript
// 검색 자동완성
function* searchSaga() {
    yield takeLatest('search/query', function* (action) {
        // 사용자가 'React'를 입력
        // R → e → a → c → t
        // 'R', 'Re', 'Rea', 'Reac' 요청은 자동으로 취소
        // 'React' 요청만 실행됨
        const results = yield call(searchAPI, action.payload)
        yield put(searchAction.setResults(results))
    })
}
```

**사용 사례:**
- 검색 자동완성
- 실시간 필터링
- 무한 스크롤
- 타이핑 중 API 호출

#### 3) 병렬 처리와 순차 처리

```typescript
function* fetchMultipleData() {
    // 병렬 처리 - 모든 요청을 동시에 실행
    const [user, posts, comments] = yield all([
        call(fetchUser),
        call(fetchPosts),
        call(fetchComments),
    ])
    
    // 순차 처리 - user 정보가 필요한 경우
    const user = yield call(fetchUser)
    const userPosts = yield call(fetchUserPosts, user.id)
    const postDetails = yield call(fetchPostDetails, userPosts[0].id)
}
```

**병렬 처리 예시:**

```typescript
// 대시보드 로딩 시 여러 데이터를 동시에 가져오기
function* loadDashboard() {
    try {
        const [analytics, users, orders] = yield all([
            call(fetchAnalytics),
            call(fetchUsers),
            call(fetchOrders),
        ])
        
        yield put(dashboardAction.loadSuccess({
            analytics,
            users,
            orders,
        }))
    } catch (error) {
        yield put(dashboardAction.loadFail(error.message))
    }
}
```

**순차 처리 예시:**

```typescript
// 주문 프로세스 (이전 단계의 결과가 필요)
function* processOrder() {
    // 1단계: 재고 확인
    const stock = yield call(checkStock, productId)
    
    if (!stock.available) {
        yield put(orderAction.fail('재고가 부족합니다'))
        return
    }
    
    // 2단계: 결제 처리
    const payment = yield call(processPayment, paymentInfo)
    
    // 3단계: 주문 생성
    const order = yield call(createOrder, {
        productId,
        paymentId: payment.id,
    })
    
    yield put(orderAction.success(order))
}
```

### 3. 로딩 상태의 세밀한 제어

```typescript
// 이전 데이터를 유지하면서 로딩
loading: (prevData) => ({
    data: prevData,  // 이전 데이터 표시 유지
    loading: true,
    error: false,
})
```

**사용자 경험 향상:**
- 새로고침 시 깜빡임 없이 이전 데이터 표시
- 백그라운드에서 새 데이터 로딩
- 로딩 완료 후 부드러운 전환

**실제 구현:**

```typescript
const ProductList = () => {
    const { data, loading } = useAppSelector(
        state => state.productReducer.products
    )
    
    return (
        <div>
            {/* 이전 데이터를 표시하면서 로딩 인디케이터 */}
            {loading && <LoadingOverlay />}
            
            {/* 데이터가 있으면 항상 표시 */}
            {data && data.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}
```

### 4. 에러 복구 전략

```typescript
const getErrorMessage = (status, fallback, responseData) => {
    const messages = {
        400: '잘못된 요청입니다.',
        401: '인증 오류 발생: 로그인 해주세요.',
        403: '접근이 거부되었습니다.',
        404: '요청한 리소스를 찾을 수 없습니다.',
        500: '서버 오류가 발생했습니다.',
        503: '서버가 현재 사용할 수 없습니다.',
    }
    
    // 서버에서 보낸 에러 메시지가 있으면 우선 사용
    if (responseData?.message) {
        return responseData.message
    }
    
    return messages[status] || fallback
}
```

**계층적 에러 처리:**
1. 서버 응답의 커스텀 메시지
2. HTTP 상태 코드별 기본 메시지
3. Fallback 메시지

---

## Redux Saga를 선택한 이유

### Redux Thunk vs Redux Saga 비교

#### ❌ Redux Thunk (사용하지 않음)

```typescript
// Thunk 방식
export const fetchPokemon = () => async (dispatch) => {
    dispatch({ type: 'pokemon/loading' })
    try {
        const response = await axios.get('/api/pokemon')
        dispatch({ type: 'pokemon/success', payload: response.data })
    } catch (error) {
        dispatch({ type: 'pokemon/fail', payload: error.message })
    }
}

// 문제점:
// 1. 액션 크리에이터가 비즈니스 로직을 포함
// 2. 테스트가 어려움 (async/await를 모킹해야 함)
// 3. 취소, 디바운스 등 구현이 복잡
// 4. 여러 액션을 조합하기 어려움
```

#### ✅ Redux Saga (현재 사용)

```typescript
// Saga 방식
function* fetchPokemonSaga() {
    try {
        const response = yield call(axios.get, '/api/pokemon')
        yield put({ type: 'pokemon/success', payload: response.data })
    } catch (error) {
        yield put({ type: 'pokemon/fail', payload: error.message })
    }
}

function* watchFetchPokemon() {
    yield takeLatest('pokemon/fetch', fetchPokemonSaga)
}

// 장점:
// 1. 액션은 순수하게 유지
// 2. 제너레이터로 테스트 간편
// 3. takeLatest, debounce, throttle 등 내장
// 4. 복잡한 비동기 플로우 관리 용이
```

### Thunk의 한계

```typescript
// ❌ Thunk로 복잡한 로직 구현 시
export const complexFlow = () => async (dispatch, getState) => {
    // 1. 여러 API를 순차적으로 호출
    const user = await fetchUser()
    const posts = await fetchUserPosts(user.id)
    
    // 2. 상태 확인
    const state = getState()
    if (state.cache.hasData) {
        return
    }
    
    // 3. 조건부 로직
    if (posts.length > 0) {
        await fetchComments(posts[0].id)
    }
    
    // 코드가 복잡해지고 테스트가 어려움
}
```

### Saga의 우아한 해결

```typescript
// ✅ Saga로 동일한 로직 구현
function* complexFlow() {
    // 1. 여러 API를 순차적으로 호출
    const user = yield call(fetchUser)
    const posts = yield call(fetchUserPosts, user.id)
    
    // 2. 상태 확인
    const state = yield select()
    if (state.cache.hasData) {
        return
    }
    
    // 3. 조건부 로직
    if (posts.length > 0) {
        yield call(fetchComments, posts[0].id)
    }
    
    // 제너레이터로 단계별 테스트 가능
}
```

---

## Saga Effect의 강력한 기능들

### 1. takeLatest - 최신 요청만 처리

```typescript
yield takeLatest('sample/getPokemon', fetchPokemonSaga)
// 이전 요청이 완료되지 않으면 자동 취소
// 검색 자동완성, 필터링 등에 유용
```

**사용 사례:**

```typescript
function* searchAutocompleteSaga() {
    yield takeLatest('search/input', function* (action) {
        // 300ms 대기
        yield delay(300)
        
        // API 호출
        const results = yield call(searchAPI, action.payload)
        yield put(searchAction.setResults(results))
    })
}
```

### 2. takeEvery - 모든 요청 처리

```typescript
yield takeEvery('sample/logEvent', logEventSaga)
// 모든 요청을 처리 (분석 이벤트 등)
```

**사용 사례:**

```typescript
function* trackingEventSaga() {
    yield takeEvery('tracking/*', function* (action) {
        // 모든 tracking 액션을 분석 서버로 전송
        yield call(analyticsAPI.track, action.type, action.payload)
    })
}
```

### 3. debounce - 요청 지연

```typescript
yield debounce(500, 'search/input', searchSaga)
// 500ms 동안 추가 입력이 없을 때만 검색
```

**사용 사례:**

```typescript
function* searchDebounce() {
    yield debounce(500, 'search/query', function* (action) {
        const results = yield call(searchAPI, action.payload)
        yield put(searchAction.setResults(results))
    })
}

// 사용자가 'React'를 입력할 때
// R (대기) → e (대기) → a (대기) → c (대기) → t (500ms 후 검색 실행)
```

### 4. throttle - 요청 제한

```typescript
yield throttle(1000, 'button/click', clickSaga)
// 1초에 최대 1번만 실행
```

**사용 사례:**

```typescript
function* likeButtonThrottle() {
    yield throttle(1000, 'post/like', function* (action) {
        yield call(likeAPI, action.payload.postId)
        yield put(postAction.likeSuccess(action.payload.postId))
    })
}

// 사용자가 연타해도 1초에 1번만 실행됨
```

### 5. race - 경쟁 조건

```typescript
function* fetchWithTimeout() {
    const { response, timeout } = yield race({
        response: call(fetchAPI),
        timeout: delay(5000),
    })
    
    if (timeout) {
        yield put(action.timeout())
    } else {
        yield put(action.success(response))
    }
}
```

### 6. retry - 재시도

```typescript
function* fetchWithRetry() {
    try {
        const response = yield retry(3, 1000, fetchAPI)
        yield put(action.success(response))
    } catch (error) {
        // 3번 재시도 후에도 실패
        yield put(action.fail(error))
    }
}
```

---

## Side Effect의 중앙 집중 관리

### Saga가 처리하는 Side Effect

```typescript
function* rootSaga() {
    yield all([
        // 1. API 호출
        sampleSaga(),
        
        // 2. 라우팅 감지
        routerSaga(),
        
        // 3. 로컬 스토리지 동기화
        localStorageSaga(),
        
        // 4. 분석 이벤트 전송
        analyticsSaga(),
        
        // 5. 웹소켓 연결 관리
        websocketSaga(),
    ])
}
```

### 예시: 로컬 스토리지 동기화

```typescript
function* localStorageSaga() {
    // 테마 변경 시 로컬 스토리지에 저장
    yield takeEvery('theme/change', function* (action) {
        yield call(
            [localStorage, localStorage.setItem],
            'theme',
            action.payload
        )
    })
    
    // 로그인 성공 시 토큰 저장
    yield takeEvery('auth/loginSuccess', function* (action) {
        yield call(
            [localStorage, localStorage.setItem],
            'token',
            action.payload.token
        )
    })
}
```

### 예시: 웹소켓 관리

```typescript
function* websocketSaga() {
    // 웹소켓 연결
    yield takeEvery('websocket/connect', function* () {
        const socket = yield call(createWebSocket)
        
        // 메시지 리스닝
        const channel = yield call(createSocketChannel, socket)
        
        while (true) {
            const message = yield take(channel)
            yield put(messageAction.receive(message))
        }
    })
    
    // 웹소켓 연결 해제
    yield takeEvery('websocket/disconnect', function* () {
        yield call(closeWebSocket)
    })
}
```

### 장점

- ✅ 모든 부수 효과가 한 곳에서 관리됨
- ✅ 컴포넌트는 순수하게 유지
- ✅ 비즈니스 로직과 UI 로직 분리
- ✅ 테스트 가능성 향상

---

## 미들웨어 체인과 로깅

### 미들웨어 설정

```typescript
const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    // 필요시 추가 미들웨어 체인 가능
    // middleware: (getDefaultMiddleware) => 
    //     getDefaultMiddleware().concat(logger, sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
```

### 커스텀 미들웨어 추가

```typescript
// 로깅 미들웨어
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Dispatching:', action)
    const result = next(action)
    console.log('Next State:', store.getState())
    return result
}

// 에러 추적 미들웨어
const errorTrackingMiddleware = (store) => (next) => (action) => {
    try {
        return next(action)
    } catch (error) {
        console.error('Error in action:', action.type, error)
        // Sentry 등으로 에러 전송
        throw error
    }
}

const store = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(loggerMiddleware)
            .concat(errorTrackingMiddleware)
            .concat(sagaMiddleware),
})
```

### Redux DevTools 활용

```typescript
const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: {
        name: 'My App',
        trace: true,
        traceLimit: 25,
    },
})
```

**DevTools 기능:**
- ✅ 모든 액션 흐름 시각화
- ✅ Time-travel debugging
- ✅ State diff 확인
- ✅ 액션 재생 (Replay)
- ✅ 액션 Jump (특정 시점으로 이동)

---

## 실전 패턴

### 패턴 1: 폴링 (Polling)

```typescript
function* pollDataSaga() {
    while (true) {
        try {
            const data = yield call(fetchData)
            yield put(dataAction.success(data))
            
            // 5초 대기
            yield delay(5000)
        } catch (error) {
            yield put(dataAction.fail(error))
        }
    }
}

function* watchPolling() {
    yield takeLatest('polling/start', pollDataSaga)
    yield takeLatest('polling/stop', function* () {
        // 폴링 중지
        yield cancel(pollDataSaga)
    })
}
```

### 패턴 2: 낙관적 업데이트

```typescript
function* optimisticUpdateSaga(action) {
    // 1. 즉시 UI 업데이트
    yield put(todoAction.addOptimistic(action.payload))
    
    try {
        // 2. API 호출
        const result = yield call(addTodoAPI, action.payload)
        
        // 3. 서버 응답으로 교체
        yield put(todoAction.addSuccess(result))
    } catch (error) {
        // 4. 실패 시 롤백
        yield put(todoAction.addRollback(action.payload))
        yield put(todoAction.showError(error.message))
    }
}
```

### 패턴 3: 인증 플로우

```typescript
function* authFlowSaga() {
    // 로그인 성공 시
    yield takeEvery('auth/loginSuccess', function* (action) {
        // 1. 토큰 저장
        yield call(saveToken, action.payload.token)
        
        // 2. 사용자 정보 가져오기
        yield put(userAction.fetchUser())
        
        // 3. 메인 페이지로 이동
        yield call(navigate, '/dashboard')
    })
    
    // 로그아웃 시
    yield takeEvery('auth/logout', function* () {
        // 1. 토큰 삭제
        yield call(removeToken)
        
        // 2. 모든 상태 초기화
        yield put({ type: 'RESET_ALL' })
        
        // 3. 로그인 페이지로 이동
        yield call(navigate, '/login')
    })
    
    // 401 에러 시 자동 로그아웃
    yield takeEvery('*', function* (action) {
        if (action.payload?.status === 401) {
            yield put(authAction.logout())
        }
    })
}
```

---

**다음 문서**: [사용 가이드](./usage-guide.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0

