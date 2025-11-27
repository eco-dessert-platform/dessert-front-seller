# Redux Utils API

`reduxMaker` 및 관련 유틸리티 함수의 상세 API 문서입니다.

## reduxMaker

Slice와 Saga를 자동으로 생성하는 팩토리 함수입니다.

### 함수 시그니처

```typescript
function reduxMaker<LocalState, AsyncRequests>(
    prefix: string,
    asyncRequests: readonly AsyncRequest[],
    localState: LocalState,
    localReducers: SliceCaseReducers<LocalState>,
): {
    slice: Slice
    actions: SliceActions
    saga: () => Generator
}
```

### 파라미터

#### `prefix: string`

- Feature의 고유 식별자
- 액션 타입의 prefix로 사용됨
- 예: `'sample'` → `'sample/getData'`

#### `asyncRequests: readonly AsyncRequest[]`

- 비동기 API 요청 정의 배열
- `as const`로 타입 추론 보장

**AsyncRequest 타입**:

```typescript
type AsyncRequest<DataType, ParamType> = {
    action: string // 액션 이름
    state: string // 상태 키 이름
    initialState: DataType // 초기 데이터
    api: (param: ParamType) => Promise<AxiosResponse<DataType>>
}
```

**예시**:

```typescript
import { getData } from './api'

const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        initialState: null,
        api: getData,
    },
] as const
```

#### `localState: LocalState`

- 동기 상태 초기값
- 비동기 상태와 병합됨

**예시**:

```typescript
const localState = {
    count: 0,
    isOpen: false,
}
```

#### `localReducers: SliceCaseReducers<LocalState>`

- 동기 상태 변경 함수들
- Immer를 사용하므로 직접 수정 가능

**예시**:

```typescript
const localReducers = {
    increment: (state) => {
        state.count += 1
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
        state.isOpen = action.payload
    },
}
```

### 반환값

```typescript
{
    slice: Slice // Redux Toolkit Slice
    actions: SliceActions // 액션 생성자 객체
    saga: () => Generator // Root Saga 함수
}
```

### 자동 생성되는 액션들

**API 요청 액션**:

```typescript
actions.getData() // { type: 'prefix/getData' }
actions.getData(params) // { type: 'prefix/getData', payload: params }
```

**내부 액션 (Saga에서 자동 dispatch)**:

```typescript
// 성공 시
{ type: 'prefix/getDataSuccess', payload: data }

// 실패 시
{ type: 'prefix/getDataFail', payload: errorMessage }
```

**동기 액션**:

```typescript
actions.increment() // { type: 'prefix/increment' }
actions.setOpen(true) // { type: 'prefix/setOpen', payload: true }
```

**초기화 액션**:

```typescript
actions.initialize('data') // 특정 상태 초기화
actions.initializeAll() // 모든 비동기 상태 초기화
```

## reducerUtils

비동기 상태를 생성하고 관리하는 헬퍼 함수들입니다.

### init<DataType>()

초기 비동기 상태를 생성합니다.

```typescript
reducerUtils.init<DataType>()

// 반환값
{
    data: null,
    loading: false,
    error: false,
    errorMsg: '',
}
```

### loading<DataType>(prevData)

로딩 중 상태를 생성합니다.

```typescript
reducerUtils.loading<DataType>(prevData)

// 반환값
{
    data: prevData,     // 이전 데이터 유지
    loading: true,
    error: false,
    errorMsg: '',
}
```

### success<DataType>(data)

성공 상태를 생성합니다.

```typescript
reducerUtils.success<DataType>(data)

// 반환값
{
    data: data,
    loading: false,
    error: false,
    errorMsg: '',
}
```

### error<DataType>(prevData, errorMsg)

에러 상태를 생성합니다.

```typescript
reducerUtils.error<DataType>(prevData, errorMsg)

// 반환값
{
    data: prevData,     // 이전 데이터 유지
    loading: false,
    error: true,
    errorMsg: errorMsg,
}
```

## createRequestSaga

API 호출을 처리하는 Saga를 생성합니다.

### 함수 시그니처

```typescript
function createRequestSaga(
    prefix: string,
    reducerName: string,
    api: (param: any) => Promise<AxiosResponse>,
): Generator
```

### 동작

1. API 함수 호출
2. HTTP 상태 코드 확인
3. 성공/실패에 따라 적절한 액션 dispatch
4. 에러 메시지 자동 생성

### 에러 처리 순서

1. 서버 응답의 커스텀 메시지 (`response.data.message`)
2. HTTP 상태 코드별 기본 메시지
3. Fallback 메시지

## useAppDispatch

타입이 지정된 dispatch hook입니다.

```typescript
const dispatch = useAppDispatch()

// 타입 체크됨
dispatch(sampleAction.getData()) // ✅
dispatch({ type: 'INVALID' }) // ❌ 타입 에러
```

## useAppSelector

타입이 지정된 selector hook입니다.

```typescript
// 타입이 자동으로 추론됨
const pokemon = useAppSelector((state) => state.sampleReducer.pokemon)
// pokemon: AsyncState<{ name: string; id: number }>
```

## 전체 사용 예시

```typescript
// 1. Reducer 정의
import { reduxMaker } from 'src/global/store/redux/reduxUtils'
import { getUser } from './userAPI'

const prefix = 'user'

const asyncRequests = [
    {
        action: 'getUser',
        state: 'user',
        initialState: null,
        api: getUser,
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

// 2. Store에 등록
// reduxStore.tsx
import { slice, saga } from './userReducer'

const reducers = {
    userReducer: slice.reducer,
}

export function* rootSaga() {
    yield all([saga()])
}

// 3. 컴포넌트에서 사용
import { useAppDispatch, useAppSelector } from 'src/global/store/redux/reduxHooks'
import { actions } from './userReducer'

function UserProfile() {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(state => state.userReducer.user)

    useEffect(() => {
        dispatch(actions.getUser())
        return () => dispatch(actions.initialize('user'))
    }, [])

    if (loading) return <Spinner />
    if (error) return <Error />
    return <Profile data={data} />
}
```

## 타입 정의

```typescript
// AsyncState 타입
type AsyncState<DataType> = {
    data: DataType | null
    loading: boolean
    error: boolean
    errorMsg: string
}

// AsyncRequest 타입
type AsyncRequest<DataType, ParamType> = {
    action: string
    state: string
    initialState: DataType
    api: (param: ParamType) => Promise<AxiosResponse<DataType>>
}
```

---

[← Reference 목차로 돌아가기](../README.md)
