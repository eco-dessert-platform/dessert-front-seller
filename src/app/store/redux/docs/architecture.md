# Redux 아키텍처 구조

## 📋 목차
1. [기술 스택](#기술-스택)
2. [파일 구조](#파일-구조)
3. [reduxStore - 중앙 스토어 설정](#reduxstore---중앙-스토어-설정)
4. [reduxUtils - 비동기 처리 유틸리티](#reduxutils---비동기-처리-유틸리티)
5. [reduxHooks - 타입 안전한 커스텀 훅](#reduxhooks---타입-안전한-커스텀-훅)

---

## 기술 스택

```json
{
  "@reduxjs/toolkit": "^2.6.1",
  "react-redux": "^9.2.0",
  "redux": "^5.0.1",
  "redux-saga": "^1.3.0",
  "axios": "1.12.0"
}
```

### 주요 라이브러리
- **Redux Toolkit**: 현대적인 Redux 개발을 위한 공식 도구
- **Redux Saga**: Side Effect 처리를 위한 미들웨어
- **Axios**: HTTP 클라이언트

---

## 파일 구조

```
src/
├── app/
│   └── store/
│       └── redux/
│           ├── reduxStore.tsx      # Store 설정 및 미들웨어 구성
│           ├── reduxHooks.tsx      # 타입 안전한 커스텀 훅
│           ├── reduxUtils.ts       # 비동기 처리 유틸리티
│           └── docs/               # 문서
│               ├── README.md
│               ├── architecture.md (현재 문서)
│               ├── why-redux-store.md
│               ├── async-middleware.md
│               ├── usage-guide.md
│               ├── performance-optimization.md
│               └── best-practices.md
└── features/
    └── sample/
        ├── sampleReducer.ts        # Slice + Saga 정의
        ├── sampleAPI.tsx           # API 함수
        └── Sample.tsx              # 컴포넌트
```

---

## reduxStore - 중앙 스토어 설정

### 기본 구조

```typescript
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import { all } from 'redux-saga/effects'

const reducers = {
    routerReducer: routerSlice.reducer,
    sampleReducer: sampleSlice.reducer,
    themeReducer: themeSlice.reducer,
}

export function* rootSaga() {
    yield all([sampleSaga(), routerSaga()])
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducers,
    middleware: () => new Tuple(sagaMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)
export default store
```

### 핵심 포인트

1. **Redux Saga 미들웨어**
   - 모든 비동기 액션을 가로채서 처리
   - Side Effect를 중앙에서 관리

2. **Redux DevTools**
   - 개발 환경에서만 활성화
   - 모든 액션과 상태 변화 추적 가능

3. **rootSaga**
   - 모든 Saga를 통합 관리
   - `yield all()`로 병렬 실행

---

## reduxUtils - 비동기 처리 유틸리티

이 파일은 프로젝트의 **핵심 설계 철학**이 담겨있는 부분입니다.

### 1. 비동기 상태 타입 정의

```typescript
type AsyncState<DataType> = {
    data: DataType | null      // 실제 데이터
    loading: boolean            // 로딩 상태
    error: boolean              // 에러 발생 여부
    errorMsg: string            // 에러 메시지
}
```

### 2. reducerUtils - 상태 헬퍼 함수

```typescript
export const reducerUtils = {
    init: <DataType>() => ({
        data: null,
        loading: false,
        error: false,
        errorMsg: '',
    }),
    loading: <DataType>(prevData) => ({
        data: prevData,        // 이전 데이터 유지
        loading: true,
        error: false,
        errorMsg: '',
    }),
    success: <DataType>(data) => ({
        data: data,
        loading: false,
        error: false,
        errorMsg: '',
    }),
    error: <DataType>(prevData, errorMsg) => ({
        data: prevData,        // 이전 데이터 유지
        loading: false,
        error: true,
        errorMsg: errorMsg,
    }),
}
```

**설계 의도:**
- 모든 비동기 요청에 대해 **일관된 상태 구조** 제공
- UI에서 로딩 상태, 에러 상태를 쉽게 처리 가능
- 이전 데이터를 유지하여 깜빡임 방지

### 3. reduxMaker - 보일러플레이트 제거 팩토리

```typescript
export function reduxMaker<LocalState, AsyncRequests>(
    prefix: string,           // 액션 타입 prefix
    asyncRequests: AsyncRequests,  // API 요청 목록
    localState: LocalState,        // 로컬 상태
    localReducers: SliceCaseReducers<LocalState>,
) {
    // 1. 비동기 상태 자동 생성
    const asyncState = makeAsyncRequestState(asyncRequests)
    
    // 2. 로컬 상태와 병합
    const allInitialState = { ...localState, ...asyncState }
    
    // 3. 비동기 리듀서 자동 생성
    const asyncReducers = asyncRequests.reduce(...)
    
    // 4. Slice 생성
    const slice = createSlice({
        name: prefix,
        initialState: allInitialState,
        reducers: { ...localReducers, ...asyncReducers },
        extraReducers: (builder) => {
            // Success/Fail 케이스 자동 처리
        },
    })
    
    // 5. Saga 자동 생성
    const saga = function* () {
        for (const { action, api } of asyncRequests) {
            yield takeLatest(
                `${prefix}/${action}`,
                createRequestSaga(prefix, action, api),
            )
        }
    }
    
    return { slice, actions: slice.actions, saga }
}
```

**주요 기능:**

1. **자동 상태 생성**: API 요청마다 loading/error/data 상태 자동 생성
2. **자동 리듀서 생성**: 요청/성공/실패 액션 자동 처리
3. **자동 Saga 생성**: takeLatest 패턴으로 중복 요청 방지
4. **타입 안전성**: TypeScript 제네릭으로 완벽한 타입 추론

### 4. createRequestSaga - API 호출 Saga 생성

```typescript
function createRequestSaga(prefix, reducerName, api) {
    return function* fetchApiData(action) {
        try {
            // API 호출
            const response = yield call(api, action.payload)
            const { status, data } = response
            
            // HTTP 에러 처리
            if (status >= 400) {
                const errorMessage = getErrorMessage(status, ...)
                yield put({ 
                    type: `${prefix}/${reducerName}Fail`, 
                    payload: errorMessage 
                })
                return
            }
            
            // 성공 처리
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
}
```

### 5. 에러 처리 유틸리티

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

## reduxHooks - 타입 안전한 커스텀 훅

```typescript
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './reduxStore'

// 타입이 지정된 useDispatch 훅
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// 타입이 지정된 useSelector 훅
export const useAppSelector = useSelector.withTypes<RootState>()
```

**장점:**
- ✅ 자동완성 지원
- ✅ 컴파일 타임 타입 체크
- ✅ 리팩토링 안전성

**사용 예시:**

```typescript
// 타입 추론이 자동으로 됨
const pokemon = useAppSelector(state => state.sampleReducer.pokemon)
// pokemon의 타입: AsyncState<{ name: string; id: number }>

const dispatch = useAppDispatch()
// dispatch(sampleAction.getPokemon()) // ✅ 올바른 액션
// dispatch({ type: 'WRONG_ACTION' })  // ❌ 타입 에러
```

---

## 전체 데이터 흐름

```
┌─────────────┐
│  Component  │
└──────┬──────┘
       │ dispatch(action)
       ▼
┌─────────────┐
│   Reducer   │ ◄── 동기 액션 처리
└─────────────┘
       │
       │ 비동기 액션
       ▼
┌─────────────┐
│    Saga     │ ◄── takeLatest로 감지
└──────┬──────┘
       │ call(api)
       ▼
┌─────────────┐
│  API Server │
└──────┬──────┘
       │ response
       ▼
┌─────────────┐
│    Saga     │ ◄── Success/Fail 판단
└──────┬──────┘
       │ put(action)
       ▼
┌─────────────┐
│   Reducer   │ ◄── 상태 업데이트
└──────┬──────┘
       │ state change
       ▼
┌─────────────┐
│  Component  │ ◄── 리렌더링
└─────────────┘
```

---

## 핵심 설계 원칙

### 1. 관심사의 분리
- **Component**: UI 렌더링만 담당
- **Action**: 순수한 객체, 의도만 표현
- **Saga**: 부수 효과(API 호출) 처리
- **Reducer**: 순수 함수, 상태 업데이트만 담당

### 2. 단방향 데이터 흐름
- 상태 변경은 항상 Action → Reducer 흐름을 따름
- 예측 가능한 상태 관리

### 3. 타입 안전성
- TypeScript로 전체 흐름의 타입 보장
- 런타임 에러를 컴파일 타임에 방지

### 4. 테스트 가능성
- 순수 함수(Reducer)는 테스트가 쉬움
- Saga는 제너레이터로 단계별 테스트 가능

---

**다음 문서**: [왜 Redux Store를 사용하는가?](./why-redux-store.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0

