# Redux 상태 관리 가이드

> **이 프로젝트의 Redux 아키텍처 완벽 가이드**

## 📋 개요

이 프로젝트는 **Redux Toolkit + Redux Saga + 커스텀 reduxMaker 유틸리티**를 조합하여 상태 관리를 구현합니다.
일반적인 Redux 패턴이 아닌, **보일러플레이트를 최소화한 독자적인 아키텍처**를 사용합니다.

### 🎯 핵심 철학
- ✅ **모든 비동기 요청은 Redux Store를 통해 관리**
- ✅ **`reduxMaker` 유틸리티로 Slice + Saga 자동 생성**
- ✅ **일관된 로딩/에러 상태 자동 관리**
- ✅ **타입 안전성 보장**
- ✅ **명시적 메모리 관리 (initialize/initializeAll)**

### 📦 설치된 패키지
```json
{
  "@reduxjs/toolkit": "^2.6.1",
  "react-redux": "^9.2.0",
  "redux": "^5.0.1",
  "redux-saga": "^1.3.0"
}
```

### 🏗️ 프로젝트 Redux 구조
```
src/
├── app/store/redux/
│   ├── reduxStore.tsx      # Store 설정 & rootSaga
│   ├── reduxHooks.tsx      # useAppDispatch, useAppSelector
│   └── reduxUtils.ts       # reduxMaker 유틸리티 (핵심!)
└── features/
    └── [feature]/
        └── [feature]Reducer.ts  # reduxMaker로 생성된 reducer
```

---

## 📚 문서 구조

### 1. [아키텍처 구조](./architecture.md)
- 기술 스택 소개
- Redux 파일 구조
- reduxStore, reduxUtils, reduxHooks 설명
- 핵심 유틸리티 함수 (reduxMaker, reducerUtils)

### 2. [왜 Redux Store를 사용하는가?](./why-redux-store.md)
- 중앙 집중식 상태 관리의 장점
- 예측 가능한 상태 흐름
- 일관된 에러 처리
- 자동 로딩 상태 관리

### 3. [비동기 처리 & 미들웨어](./async-middleware.md)
- Redux Saga의 Effect 활용
- 비동기 처리의 장점
- Redux Thunk vs Redux Saga
- 미들웨어 체인과 로깅

### 4. [사용 가이드](./usage-guide.md)
- 실제 코드 예시
- sampleReducer 구현
- 컴포넌트에서 사용하기
- 액션 흐름 이해하기

### 5. [성능 최적화](./performance-optimization.md)
- 메모리 관리 전략
- 불필요한 리렌더링 방지
- 대용량 데이터 처리
- Redux DevTools 활용

### 6. [Best Practices](./best-practices.md)
- 설계의 장단점
- 언제 이 패턴을 사용해야 하는가?
- 프로젝트 규모별 가이드
- 권장사항

---

## 🚀 빠른 시작

### 🔹 이 프로젝트의 Redux는 어떻게 다른가?

**일반 Redux Toolkit:**
```typescript
// ❌ 전통적인 방식: 100+ 줄의 보일러플레이트
const slice = createSlice({ ... })
const saga = function* () { ... }
// 성공/실패 액션, 로딩 상태 등 수동 관리
```

**이 프로젝트의 reduxMaker:**
```typescript
// ✅ 3줄이면 끝!
const asyncRequests = [{ action: 'getData', state: 'data', ... }]
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
// Slice + Saga + 로딩/에러 상태 모두 자동 생성
```

---

### 1️⃣ 새로운 Feature Reducer 만들기

```typescript
// features/myFeature/myFeatureReducer.ts
import { reduxMaker, AsyncRequest } from 'src/app/store/redux/reduxUtils.ts'
import axios from 'axios'

const prefix = 'myFeature'

// 비동기 API 요청 정의
const asyncRequests = [
    {
        action: 'getData',      // 액션 이름
        state: 'data',          // 상태 이름
        initialState: null,     // 초기 데이터
        api: () => axios.get('/api/data'),  // API 함수
    } as const satisfies AsyncRequest<DataType, void>,
] as const

// 동기 상태 정의
const localState = {
    count: 0,
    isModalOpen: false,
}

// 동기 리듀서 정의
const localReducers = {
    increment: (state) => {
        state.count += 1
    },
    openModal: (state) => {
        state.isModalOpen = true
    },
}

// 🎉 자동으로 Slice + Saga 생성!
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: myFeatureSlice,
    actions: myFeatureAction,
    saga: myFeatureSaga,
} = module
```

**자동으로 생성되는 것들:**
- ✅ `myFeatureAction.getData()` - API 요청 액션
- ✅ `data.loading` - 로딩 상태
- ✅ `data.error` / `data.errorMsg` - 에러 상태
- ✅ `data.data` - 실제 데이터
- ✅ `myFeatureAction.initialize('data')` - 상태 초기화
- ✅ Saga로 자동 API 호출 & 에러 처리

### 2️⃣ Store에 등록하기

```typescript
// app/store/redux/reduxStore.tsx
import { myFeatureSlice, myFeatureSaga } from 'src/features/myFeature/myFeatureReducer'

const reducers = {
    myFeatureReducer: myFeatureSlice.reducer,  // ← 추가
}

export function* rootSaga() {
    yield all([
        myFeatureSaga(),  // ← 추가
    ])
}
```

### 3️⃣ 컴포넌트에서 사용하기

```typescript
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/app/store/redux/reduxHooks'
import { myFeatureAction } from 'src/features/myFeature/myFeatureReducer'

const MyComponent = () => {
    const dispatch = useAppDispatch()
    
    // 자동으로 생성된 상태 구조
    const { data, loading, error, errorMsg } = useAppSelector(
        state => state.myFeatureReducer.data
    )
    const count = useAppSelector(state => state.myFeatureReducer.count)
    
    useEffect(() => {
        // API 요청
        dispatch(myFeatureAction.getData())
        
        return () => {
            // ⚠️ 중요! 메모리 정리
            dispatch(myFeatureAction.initialize('data'))
        }
    }, [])
    
    // 로딩/에러 상태는 자동으로 관리됨
    if (loading) return <Spinner />
    if (error) return <ErrorMessage message={errorMsg} />
    
    return (
        <div>
            <p>Data: {JSON.stringify(data)}</p>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(myFeatureAction.increment())}>
                증가
            </button>
        </div>
    )
}
```

---

## 🎯 동기 vs 비동기 Reducer

### 동기 Reducer (localState & localReducers)
```typescript
const localState = { count: 0 }
const localReducers = {
    increment: (state) => { state.count += 1 }
}
// 사용: dispatch(myFeatureAction.increment())
```

### 비동기 Reducer (asyncRequests)
```typescript
const asyncRequests = [{
    action: 'getData',
    state: 'data',
    api: () => axios.get('/api/data')
}]
// 사용: dispatch(myFeatureAction.getData())
// 자동 생성: data.loading, data.error, data.data
```

---

## 📖 상세 문서

더 자세한 내용은 위의 문서 구조에서 해당 주제의 문서를 참고하세요.

- 아키텍처 구조를 이해하려면 → [architecture.md](./architecture.md)
- 왜 이런 설계를 했는지 알고 싶다면 → [why-redux-store.md](./why-redux-store.md)
- 비동기 처리 방식을 알고 싶다면 → [async-middleware.md](./async-middleware.md)
- 실제 사용 예시를 보려면 → [usage-guide.md](./usage-guide.md)
- 성능 최적화를 하려면 → [performance-optimization.md](./performance-optimization.md)
- 프로젝트에 적용 여부를 판단하려면 → [best-practices.md](./best-practices.md)

---

## 🎯 핵심 개념 요약

### reduxMaker의 자동 생성 흐름
```
Component
  ↓ dispatch(action.getData())
Saga (자동 생성)
  ↓ API 호출
  ↓ loading: true
API Response
  ↓ 성공 → Success Action
  ↓ 실패 → Fail Action
Reducer (자동 생성)
  ↓ 상태 업데이트
Component Re-render
```

### 자동으로 생성되는 상태 구조
```typescript
{
    myFeatureReducer: {
        // 비동기 상태 (asyncRequests)
        data: {
            data: ResponseType | null,  // 실제 데이터
            loading: boolean,            // 로딩 중
            error: boolean,              // 에러 발생
            errorMsg: string,            // 에러 메시지
        },
        // 동기 상태 (localState)
        count: 0,
        isModalOpen: false,
    }
}
```

### 자동으로 생성되는 액션들
```typescript
// API 요청 액션
myFeatureAction.getData()              // API 호출
myFeatureAction.getData({ id: 123 })   // 파라미터와 함께

// 동기 액션
myFeatureAction.increment()            // 동기 상태 변경

// 초기화 액션 (자동 생성)
myFeatureAction.initialize('data')     // 특정 상태 초기화
myFeatureAction.initializeAll()        // 모든 비동기 상태 초기화
```

---

## 🆚 일반 Redux Toolkit vs 이 프로젝트

| 항목 | 일반 Redux Toolkit | 이 프로젝트 (reduxMaker) |
|------|-------------------|------------------------|
| **Slice 생성** | createSlice 수동 작성 | reduxMaker로 자동 생성 |
| **Saga 생성** | 수동 작성 | 자동 생성 |
| **로딩 상태** | 수동 관리 | 자동 생성 & 관리 |
| **에러 처리** | 수동 작성 | 자동 생성 & 일관된 처리 |
| **코드량** | 100+ 줄 | 10~20 줄 |
| **타입 안전성** | 수동 타입 정의 | 자동 타입 추론 |

---

## 📌 실제 프로젝트 예시

실제 프로젝트의 `sampleReducer` 확인:
- 📄 `src/features/sample/sampleReducer.ts`
- 📄 `src/features/sample/Sample.tsx`

---

## ⚠️ 주의사항

### 1. 메모리 정리 필수
```typescript
useEffect(() => {
    dispatch(action.getData())
    return () => {
        // ✅ 언마운트 시 반드시 초기화
        dispatch(action.initialize('data'))
    }
}, [])
```

### 2. 타입 안전성
```typescript
// ✅ 올바른 사용
const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        initialState: null,
        api: () => axios.get<DataType>('/api/data'),
    } as const satisfies AsyncRequest<DataType, void>,
] as const
```

### 3. useAppDispatch & useAppSelector 사용
```typescript
// ❌ 사용하지 마세요
import { useDispatch, useSelector } from 'react-redux'

// ✅ 타입 안전한 훅 사용
import { useAppDispatch, useAppSelector } from 'src/app/store/redux/reduxHooks'
```

---

## 📚 다음 단계

- 🏗️ [아키텍처 상세 구조](./architecture.md) - reduxMaker 내부 동작 이해
- ❓ [왜 이런 설계를 했나?](./why-redux-store.md) - 설계 철학과 장점
- 📘 [실전 사용 가이드](./usage-guide.md) - CRUD 구현 예시
- 🚀 [성능 최적화](./performance-optimization.md) - 메모리 관리와 최적화
- ✨ [Best Practices](./best-practices.md) - 프로젝트 규모별 가이드

---

**작성일**: 2024-11-26  
**버전**: 2.0.0  
**최종 수정**: Redux 문서 통합 및 재구성

