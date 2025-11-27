# 첫 번째 기능 만들기

간단한 카운터 기능을 만들어보면서 프로젝트 구조를 익혀봅시다.

**소요 시간**: 약 15분

## 🎯 목표

이 튜토리얼을 완료하면:

- ✅ Feature 폴더 구조를 이해합니다
- ✅ reduxMaker로 Reducer를 생성할 수 있습니다
- ✅ 페이지 컴포넌트를 만들 수 있습니다
- ✅ 라우팅을 연결할 수 있습니다

## 📋 만들 기능

**간단한 카운터**:
- 숫자를 증가/감소시키는 버튼
- 현재 카운트를 표시
- Redux로 상태 관리

## 1단계: Feature 폴더 생성

`src/features/` 폴더에 새로운 기능 폴더를 만듭니다.

```bash
cd src/features
mkdir counter
cd counter
```

## 2단계: Reducer 파일 생성

`src/features/counter/counterReducer.ts` 파일을 생성합니다:

```typescript
import { PayloadAction } from '@reduxjs/toolkit'
import { reduxMaker } from 'src/global/store/redux/reduxUtils'

// 기능 이름
const prefix = 'counter'

// 비동기 요청 (현재는 없음)
const asyncRequests = [] as const

// 로컬 상태 정의
const localState = {
    count: 0,
}

// 로컬 리듀서 정의
const localReducers = {
    increment: (state) => {
        state.count += 1
    },
    decrement: (state) => {
        state.count -= 1
    },
    reset: (state) => {
        state.count = 0
    },
    setCount: (state, action: PayloadAction<number>) => {
        state.count = action.payload
    },
}

// reduxMaker로 자동 생성
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: counterSlice,
    actions: counterAction,
    saga: counterSaga,
} = module
```

## 3단계: Store에 등록

`src/app/store/redux/reduxStore.tsx` 파일을 수정합니다:

```typescript
// 상단에 import 추가
import { counterSlice, counterSaga } from 'src/features/counter/counterReducer'

// reducers 객체에 추가
const reducers = {
    routerReducer: routerSlice.reducer,
    sampleReducer: sampleSlice.reducer,
    themeReducer: themeSlice.reducer,
    counterReducer: counterSlice.reducer,  // ← 추가
}

// rootSaga에 추가
export function* rootSaga() {
    yield all([
        sampleSaga(),
        routerSaga(),
        counterSaga(),  // ← 추가
    ])
}
```

## 4단계: 컴포넌트 생성

`src/features/counter/Counter.tsx` 파일을 생성합니다:

```typescript
import { useAppDispatch, useAppSelector } from 'src/global/store/redux/reduxHooks'
import { counterAction } from './counterReducer'

export const Counter = () => {
    const dispatch = useAppDispatch()
    const count = useAppSelector(state => state.counterReducer.count)
    
    return (
        <div className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-4xl font-bold">Counter</h1>
            
            <div className="text-6xl font-bold text-primary">
                {count}
            </div>
            
            <div className="flex gap-2">
                <button
                    onClick={() => dispatch(counterAction.decrement())}
                    className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    -1
                </button>
                
                <button
                    onClick={() => dispatch(counterAction.reset())}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Reset
                </button>
                
                <button
                    onClick={() => dispatch(counterAction.increment())}
                    className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    +1
                </button>
            </div>
            
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => dispatch(counterAction.setCount(10))}
                    className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
                >
                    Set to 10
                </button>
                
                <button
                    onClick={() => dispatch(counterAction.setCount(100))}
                    className="px-4 py-1 bg-blue-500 text-white rounded text-sm"
                >
                    Set to 100
                </button>
            </div>
        </div>
    )
}
```

## 5단계: 페이지 생성

`src/pages/url/counter/CounterPage.tsx` 파일을 생성합니다:

```bash
# WSL/Linux/macOS
mkdir -p src/pages/url/counter
```

```typescript
import { Counter } from 'src/features/counter/Counter'

export default function CounterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <Counter />
        </div>
    )
}
```

## 6단계: 확인하기

1. 개발 서버가 실행 중인지 확인:
```bash
yarn dev
```

2. 브라우저에서 접속:
```
http://localhost:5173/counter
```

3. 버튼을 클릭하여 동작 확인

## 🎉 축하합니다!

첫 번째 기능을 성공적으로 만들었습니다!

### 배운 내용

1. **Feature 폴더 구조**:
   - `counterReducer.ts`: 상태 관리
   - `Counter.tsx`: UI 컴포넌트

2. **reduxMaker 사용법**:
   - `localState`: 로컬 상태 정의
   - `localReducers`: 상태 변경 함수 정의
   - 자동으로 actions와 saga 생성

3. **컴포넌트에서 Redux 사용**:
   - `useAppSelector`: 상태 읽기
   - `useAppDispatch`: 액션 dispatch

4. **동적 라우팅**:
   - `pages/url/` 폴더에 페이지 생성
   - 자동으로 라우트 등록

## 🔍 코드 분석

### Reducer 구조

```typescript
const localState = {
    count: 0,  // 초기 상태
}

const localReducers = {
    increment: (state) => {
        // Immer를 사용하므로 직접 수정 가능
        state.count += 1
    },
}
```

### 자동 생성되는 Actions

```typescript
// 사용 가능한 액션들
counterAction.increment()      // 카운트 증가
counterAction.decrement()      // 카운트 감소
counterAction.reset()          // 0으로 리셋
counterAction.setCount(100)    // 특정 값으로 설정
```

### 컴포넌트에서 사용

```typescript
// 상태 읽기
const count = useAppSelector(state => state.counterReducer.count)

// 액션 dispatch
dispatch(counterAction.increment())
```

## 🚀 다음 단계

### 기능 확장하기

1. **비동기 작업 추가하기**:
   API에서 카운트 값을 가져오기
   
2. **히스토리 기능 추가하기**:
   변경 내역을 배열로 저장
   
3. **로컬 스토리지 연동**:
   새로고침해도 카운트 유지

### 더 배우기

- **[상태 관리 개념](../concepts/state-management.md)**: Redux 아키텍처 이해하기
- **[Reducer 생성 가이드](../how-to-guides/redux/create-reducer.md)**: 더 복잡한 Reducer 만들기
- **[비동기 작업 처리](../how-to-guides/redux/async-operations.md)**: API 호출하기

---

[← Quickstarts 목차로 돌아가기](./README.md)

