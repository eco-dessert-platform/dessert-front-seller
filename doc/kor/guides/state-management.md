# Redux 상태 관리

> **이 프로젝트의 Redux 아키텍처를 소개합니다**

이 프로젝트는 **Redux Toolkit + Redux Saga + 커스텀 reduxMaker 유틸리티**를 사용하여 전역 상태를 관리합니다.

일반적인 Redux Toolkit 패턴이 아닌, **보일러플레이트를 대폭 줄인 독자적인 아키텍처**를 채택했습니다.

## 🎯 핵심 특징

- ✅ **`reduxMaker` 유틸리티로 Slice + Saga 자동 생성**
- ✅ **로딩/에러 상태 자동 관리 - 수동 작성 불필요**
- ✅ **일관된 코드 패턴으로 빠른 개발**
- ✅ **타입 안전성 보장 (TypeScript)**
- ✅ **명시적 메모리 관리 (initialize/initializeAll)**

## 📦 설치된 패키지

```json
{
  "@reduxjs/toolkit": "^2.6.1",
  "react-redux": "^9.2.0",
  "redux": "^5.0.1",
  "redux-saga": "^1.3.0"
}
```

## 🏗️ 프로젝트 Redux 구조

```
src/
├── app/store/redux/
│   ├── reduxStore.tsx      # Store 설정 & rootSaga
│   ├── reduxHooks.tsx      # useAppDispatch, useAppSelector
│   └── reduxUtils.ts       # reduxMaker 유틸리티 (핵심!)
└── features/
    └── sample/
        ├── sampleReducer.ts    # reduxMaker로 생성된 reducer
        ├── sampleAPI.tsx       # API 함수들
        └── Sample.tsx          # 컴포넌트
```

## 🚀 빠른 시작

### 1. Reducer 생성하기

**일반 Redux Toolkit (❌ 사용 안 함):**
```typescript
// 100+ 줄의 보일러플레이트...
const slice = createSlice({ ... })
function* saga() { ... }
// 로딩/에러 상태 수동 관리
```

**이 프로젝트 (✅ reduxMaker):**
```typescript
// features/myFeature/myFeatureReducer.ts
import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'

const prefix = 'myFeature'

// 비동기 API 요청
const asyncRequests = [{
    action: 'getData',
    state: 'data',
    initialState: null,
    api: () => axios.get('/api/data'),
}] as const

// 동기 상태
const localState = { count: 0 }

// 동기 리듀서
const localReducers = {
    increment: (state) => { state.count += 1 }
}

// 🎉 자동 생성!
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
export const { slice, actions, saga } = module
```

### 2. Store에 등록

```typescript
// app/store/redux/reduxStore.tsx
import { slice, saga } from 'src/features/myFeature/myFeatureReducer'

const reducers = {
    myFeatureReducer: slice.reducer,
}

export function* rootSaga() {
    yield all([saga()])
}
```

### 3. 컴포넌트에서 사용

```typescript
import { useAppDispatch, useAppSelector } from 'src/app/store/redux/reduxHooks'
import { actions } from 'src/features/myFeature/myFeatureReducer'

function MyComponent() {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(
        state => state.myFeatureReducer.data
    )
    
    useEffect(() => {
        dispatch(actions.getData())
        return () => {
            dispatch(actions.initialize('data'))  // 메모리 정리
        }
    }, [])
    
    if (loading) return <Spinner />
    if (error) return <ErrorMessage />
    return <div>{JSON.stringify(data)}</div>
}
```

## 📊 자동으로 생성되는 것들

### 상태 구조
```typescript
{
    myFeatureReducer: {
        // 비동기 상태 (자동 생성)
        data: {
            data: ResponseType | null,
            loading: boolean,
            error: boolean,
            errorMsg: string,
        },
        // 동기 상태
        count: 0,
    }
}
```

### 액션들
```typescript
// API 요청
actions.getData()                   // API 호출
actions.getData({ id: 123 })        // 파라미터와 함께

// 동기 액션
actions.increment()                 // 상태 변경

// 초기화 (자동 생성)
actions.initialize('data')          // 특정 상태 초기화
actions.initializeAll()             // 모든 비동기 상태 초기화
```

## 💡 주요 개념

### 동기 vs 비동기

**동기 상태 (localState):**
```typescript
const localState = { count: 0, isOpen: false }
const localReducers = {
    increment: (state) => { state.count += 1 }
}
```

**비동기 상태 (asyncRequests):**
```typescript
const asyncRequests = [{
    action: 'getData',
    state: 'data',
    api: () => axios.get('/api/data')
}]
// 자동 생성: data.loading, data.error, data.data
```

## ⚠️ 주의사항

1. **메모리 정리 필수**
   ```typescript
   useEffect(() => {
       dispatch(actions.getData())
       return () => dispatch(actions.initialize('data'))
   }, [])
   ```

2. **타입 안전한 훅 사용**
   ```typescript
   // ✅ 올바른 사용
   import { useAppDispatch, useAppSelector } from 'src/app/store/redux/reduxHooks'
   
   // ❌ 사용하지 마세요
   import { useDispatch, useSelector } from 'react-redux'
   ```

## 📚 상세 문서

이 프로젝트의 Redux 아키텍처에 대한 완벽한 가이드:

**👉 [Redux 상세 가이드 (redux/)](./redux/)**

- [📖 Redux 개요 & 빠른 시작](./redux/README.md)
- [🏗️ 아키텍처 구조](./redux/architecture.md) - reduxMaker 내부 동작
- [❓ 왜 Redux Store를 사용하는가?](./redux/why-redux-store.md)
- [⚡ 비동기 처리 & 미들웨어](./redux/async-middleware.md)
- [📘 사용 가이드](./redux/usage-guide.md) - 실전 예시
- [🚀 성능 최적화](./redux/performance-optimization.md)
- [✨ Best Practices](./redux/best-practices.md)

## 🔗 추가 리소스

- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [Redux Saga 공식 문서](https://redux-saga.js.org/)
- 실제 코드: `src/features/sample/sampleReducer.ts`
