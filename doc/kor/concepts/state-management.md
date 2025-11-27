# 상태 관리

이 프로젝트는 **Redux Toolkit + Redux Saga + reduxMaker 유틸리티**를 조합한 독자적인 상태 관리 아키텍처를 사용합니다.

## 📋 개요

### 핵심 철학

- ✅ **모든 비동기 요청은 Redux Store를 통해 관리**
- ✅ **reduxMaker 유틸리티로 보일러플레이트 최소화**
- ✅ **자동 로딩/에러 상태 관리**
- ✅ **타입 안전성 보장**
- ✅ **명시적 메모리 관리**

### 사용 기술

```json
{
    "@reduxjs/toolkit": "^2.6.1",
    "react-redux": "^9.2.0",
    "redux": "^5.0.1",
    "redux-saga": "^1.3.0"
}
```

## 🏗️ 아키텍처 구조

### 전체 구조

```
src/app/store/redux/
├── reduxStore.tsx      # Store 설정 & rootSaga
├── reduxHooks.tsx      # useAppDispatch, useAppSelector
└── reduxUtils.ts       # reduxMaker 유틸리티 (핵심!)
```

### 데이터 흐름

```
Component
  ↓ dispatch(action)
Reducer / Saga
  ↓ (비동기 액션인 경우)
Saga
  ↓ call(api)
API Server
  ↓ response
Saga
  ↓ put(success/fail action)
Reducer
  ↓ 상태 업데이트
Component
  ↓ 자동 리렌더링
```

## 🔑 핵심 개념

### 1. reduxMaker 유틸리티

**전통적인 Redux Toolkit**:

```typescript
// ❌ 100+ 줄의 보일러플레이트
const slice = createSlice({ ... })
const saga = function* () { ... }
// 로딩/에러 상태 수동 관리
```

**reduxMaker 사용**:

```typescript
// ✅ 간결한 정의
const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        initialState: null,
        api: () => axios.get('/api/data'),
    },
]
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
// Slice + Saga + 로딩/에러 상태 모두 자동 생성!
```

### 2. 비동기 상태 자동 관리

reduxMaker는 모든 비동기 요청에 대해 다음 구조를 자동 생성합니다:

```typescript
{
    data: {
        data: ResponseType | null,  // 실제 데이터
        loading: boolean,            // 로딩 중
        error: boolean,              // 에러 발생
        errorMsg: string,            // 에러 메시지
    }
}
```

### 3. 동기 vs 비동기 Reducer

**동기 Reducer (localState & localReducers)**:

```typescript
const localState = {
    count: 0,
    isOpen: false,
}

const localReducers = {
    increment: (state) => {
        state.count += 1
    },
}
```

**비동기 Reducer (asyncRequests)**:

```typescript
const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        api: () => axios.get('/api/data'),
    },
]
// 자동 생성: data.loading, data.error, data.data
```

## 🔄 Redux Saga의 역할

### 왜 Redux Saga를 사용하는가?

**Redux Thunk와 비교**:

| 기능              | Redux Thunk    | Redux Saga      |
| ----------------- | -------------- | --------------- |
| **비동기 처리**   | async/await    | 제너레이터      |
| **취소**          | 수동 구현 필요 | takeLatest 제공 |
| **디바운스**      | 수동 구현      | debounce 제공   |
| **병렬 처리**     | Promise.all    | all() 제공      |
| **테스트**        | 어려움         | 쉬움            |
| **복잡한 플로우** | 어려움         | 쉬움            |

### Saga의 강력한 기능

**1. 자동 취소 (takeLatest)**:

```typescript
// 이전 요청이 완료되지 않으면 자동 취소
yield takeLatest('search/query', searchSaga)
// 사용 사례: 검색 자동완성, 실시간 필터링
```

**2. 병렬/순차 처리**:

```typescript
// 병렬 처리 - 동시 실행
const [user, posts, comments] = yield all([
    call(fetchUser),
    call(fetchPosts),
    call(fetchComments),
])

// 순차 처리 - 이전 결과가 필요한 경우
const user = yield call(fetchUser)
const userPosts = yield call(fetchUserPosts, user.id)
```

**3. 디바운스**:

```typescript
// 500ms 동안 추가 입력이 없을 때만 검색
yield debounce(500, 'search/input', searchSaga)
```

## 💾 상태 구조

### Store의 실제 모습

```typescript
{
    sampleReducer: {
        // 비동기 상태 (자동 생성)
        pokemon: {
            data: { name: 'ditto', id: 132 } | null,
            loading: false,
            error: false,
            errorMsg: '',
        },
        // 동기 상태
        count: 0,
        isModalOpen: false,
    },
    // 다른 reducers...
}
```

### 타입 안전한 Hooks

```typescript
// ✅ 타입이 자동으로 추론됨
const pokemon = useAppSelector((state) => state.sampleReducer.pokemon)
// pokemon의 타입: AsyncState<{ name: string; id: number }>

// ✅ 타입 안전한 dispatch
const dispatch = useAppDispatch()
dispatch(sampleAction.getPokemon()) // ✅ OK
dispatch(sampleAction.getPokemon(123)) // ❌ 타입 에러
```

## 🎯 왜 이런 설계를 선택했는가?

### ✅ 장점

**1. 일관성**:

- 모든 API 요청이 동일한 패턴
- 팀원 누구나 쉽게 이해하고 추가 가능

**2. 보일러플레이트 최소화**:

- reduxMaker로 3줄이면 새 API 추가
- 수동으로 100+ 줄 작성할 필요 없음

**3. 자동 로딩/에러 관리**:

- loading, error 상태 자동 생성
- UI에서 간단히 사용 가능

**4. 예측 가능한 상태 흐름**:

- Redux DevTools로 모든 액션 추적
- Time-travel debugging 가능

**5. 중앙 집중식 에러 처리**:

- HTTP 상태 코드별 자동 에러 메시지
- 일관된 에러 처리 로직

### ⚠️ 단점 및 고려사항

**1. 학습 곡선**:

- Redux Saga의 제너레이터 문법 학습 필요
- 초기 설정이 복잡

**2. 번들 크기**:

- Redux + Redux Saga 라이브러리 추가 (~30KB)
- 작은 프로젝트에는 오버엔지니어링일 수 있음

**3. 캐싱 전략**:

- React Query처럼 자동 캐싱 기능 없음
- 필요시 직접 구현 필요

## 🆚 다른 솔루션과의 비교

### 언제 이 아키텍처가 적합한가?

**✅ 적합한 경우**:

- 중대형 프로젝트 (10+ 페이지)
- 복잡한 비동기 로직
- 예측 가능한 상태 흐름이 중요
- 팀 협업 프로젝트

**❌ 부적합한 경우**:

- 작은 프로젝트 (5페이지 이하)
- 프로토타입/MVP
- 빠른 개발 속도가 최우선
- 간단한 API 호출만 필요

### 대안

**React Query + Zustand**:

- 작은 프로젝트에 적합
- 자동 캐싱 및 리페칭
- 빠른 개발 속도

**Redux Toolkit + RTK Query**:

- REST API에 최적화
- 자동 캐싱
- 하지만 복잡한 비동기 로직 처리는 제한적

## 📊 실제 사용 예시

### 간단한 Feature

```typescript
// features/user/userReducer.ts
const prefix = 'user'

const asyncRequests = [
    {
        action: 'getUser',
        state: 'user',
        initialState: null,
        api: () => axios.get('/api/user'),
    },
] as const

const localState = {
    isEditing: false,
}

const localReducers = {
    toggleEditing: (state) => {
        state.isEditing = !state.isEditing
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const { slice, actions, saga } = module
```

### 컴포넌트에서 사용

```typescript
const UserProfile = () => {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(state => state.userReducer.user)

    useEffect(() => {
        dispatch(userAction.getUser())
        return () => {
            dispatch(userAction.initialize('user'))  // 메모리 정리
        }
    }, [])

    if (loading) return <Spinner />
    if (error) return <ErrorMessage />
    return <UserCard data={data} />
}
```

## 🚀 다음 단계

상태 관리 개념을 이해하셨다면:

- **[How-to: Reducer 생성](../how-to-guides/redux/create-reducer.md)**: 실제로 만들어보기
- **[How-to: 비동기 작업](../how-to-guides/redux/async-operations.md)**: API 연동하기
- **[Reference: Redux Utils API](../reference/api/redux-utils.md)**: API 상세 문서

---

[← Concepts 목차로 돌아가기](./README.md)
