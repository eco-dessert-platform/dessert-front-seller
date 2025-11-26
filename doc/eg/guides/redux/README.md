# Redux 아키텍처 문서

## 📋 개요

이 프로젝트는 **Redux Toolkit + Redux Saga**를 조합하여 상태 관리를 구현하고 있습니다.
특히, 모든 API 요청을 Redux Store를 통해 관리하는 중앙 집중식 상태 관리 패턴을 채택하고 있습니다.

### 핵심 철학
- ✅ **모든 비동기 요청은 Redux Store를 통해 관리**
- ✅ **일관된 로딩/에러 상태 관리**
- ✅ **보일러플레이트 최소화를 위한 커스텀 유틸리티 제공**
- ✅ **타입 안전성 보장**
- ✅ **명시적 메모리 관리**

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

### 1. 새로운 Feature 추가하기

```typescript
// features/myFeature/myFeatureReducer.ts
import { reduxMaker, AsyncRequest } from 'src/app/store/redux/reduxUtils.ts'

const prefix = 'myFeature'

const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        initialState: null,
        api: () => axios.get('/api/data'),
    } as const satisfies AsyncRequest<DataType, void>,
] as const

const localState = {
    count: 0,
}

const localReducers = {
    increment: (state) => {
        state.count += 1
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: myFeatureSlice,
    actions: myFeatureAction,
    saga: myFeatureSaga,
} = module
```

### 2. Store에 등록하기

```typescript
// app/store/redux/reduxStore.tsx
import { myFeatureSlice } from 'src/features/myFeature/myFeatureReducer'
import { myFeatureSaga } from 'src/features/myFeature/myFeatureReducer'

const reducers = {
    // ... 기존 reducers
    myFeatureReducer: myFeatureSlice.reducer,
}

export function* rootSaga() {
    yield all([
        // ... 기존 sagas
        myFeatureSaga(),
    ])
}
```

### 3. 컴포넌트에서 사용하기

```typescript
import { useAppDispatch, useAppSelector } from 'src/app/store/redux/reduxHooks'
import { myFeatureAction } from 'src/features/myFeature/myFeatureReducer'

const MyComponent = () => {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(
        state => state.myFeatureReducer.data
    )
    
    useEffect(() => {
        dispatch(myFeatureAction.getData())
        
        return () => {
            // 메모리 정리
            dispatch(myFeatureAction.initialize('data'))
        }
    }, [])
    
    if (loading) return <Spinner />
    if (error) return <ErrorMessage />
    return <div>{JSON.stringify(data)}</div>
}
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

### Redux Store를 통한 API 관리
```
Component → Dispatch Action → Saga → API Call → Success/Fail → Reducer → State Update → Re-render
```

### 자동 생성되는 상태 구조
```typescript
{
    myFeatureReducer: {
        data: {
            data: ResponseType | null,
            loading: boolean,
            error: boolean,
            errorMsg: string,
        },
        count: 0,
    }
}
```

### 핵심 장점
- ✅ 일관된 패턴으로 빠른 개발
- ✅ Redux DevTools로 완벽한 디버깅
- ✅ 타입 안전성 보장
- ✅ 테스트 가능한 구조
- ✅ 명시적 메모리 관리

---

**작성일**: 2024-11-20  
**버전**: 1.0.0

