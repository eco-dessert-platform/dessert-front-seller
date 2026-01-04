# Redux Selector 패턴 가이드

이 문서는 Redux에서 `useAppSelector`를 사용할 때의 타입 안전성과 일관된 패턴을 설명합니다.

## 📋 개요

### 권장 패턴

```typescript
import { shallowEqual } from 'react-redux'
import { useAppSelector } from 'src/global/store/redux/reduxHooks'

// ✅ 권장: 구조 분해 할당 + shallowEqual
const { orderList } = useAppSelector(
    ({ ordersReducer }) => ({
        orderList: ordersReducer.orderList,
    }),
    shallowEqual,
)
```

### 비권장 패턴

```typescript
import { RootState } from 'src/global/store/redux/reduxStore'

// ❌ 비권장: 명시적 타입 지정 + 단일 값 반환
const searchKeyword = useAppSelector(
    (state: RootState) => state.storeReducer.searchKeyword,
)
```

## 🎯 각 리듀서별 타입 정의

### 1. RootState에서 타입 추출

`src/global/store/redux/reduxStore.tsx`에서 각 리듀서의 타입을 추출할 수 있습니다:

```typescript
export type RootState = ReturnType<AppStore['getState']>

// 각 리듀서별 타입 추출 헬퍼
export type StoreReducerState = RootState['storeReducer']
export type OrdersReducerState = RootState['ordersReducer']
export type ProductsReducerState = RootState['productsReducer']
export type SettlementsReducerState = RootState['settlementsReducer']
export type StatisticsReducerState = RootState['statisticsReducer']
export type SellerReducerState = RootState['sellerReducer']
export type AuthReducerState = RootState['auth']
export type AdminProductsReducerState = RootState['adminProductsReducer']
export type SampleReducerState = RootState['sampleReducer']
export type RouterReducerState = RootState['routerReducer']
export type ThemeReducerState = RootState['themeReducer']
```

### 2. 리듀서 파일에서 타입 Export (선택사항)

각 리듀서 파일에서 타입을 명시적으로 export할 수도 있습니다:

```typescript
// src/features/orders/ordersReducer.ts
import { reduxMaker } from 'src/global/store/redux/reduxUtils.ts'
import { RootState } from 'src/global/store/redux/reduxStore'

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: ordersSlice,
    actions: ordersAction,
    saga: ordersSaga,
} = module

// 타입 export (선택사항)
export type OrdersState = RootState['ordersReducer']
```

## 📝 사용 패턴

### 패턴 1: 단일 값 선택 (권장)

```typescript
import { shallowEqual } from 'react-redux'
import { useAppSelector } from 'src/global/store/redux/reduxHooks'

const Component = () => {
    // ✅ 구조 분해 할당 + shallowEqual
    const { searchKeyword } = useAppSelector(
        ({ storeReducer }) => ({
            searchKeyword: storeReducer.searchKeyword,
        }),
        shallowEqual,
    )

    return <div>{searchKeyword}</div>
}
```

### 패턴 2: 여러 값 선택 (권장)

```typescript
import { shallowEqual } from 'react-redux'
import { useAppSelector } from 'src/global/store/redux/reduxHooks'

const Component = () => {
    // ✅ 여러 값 선택 + shallowEqual
    const { salesAnalysis, salesSummary } = useAppSelector(
        ({ statisticsReducer }) => ({
            salesAnalysis: statisticsReducer.salesAnalysis,
            salesSummary: statisticsReducer.salesSummary,
        }),
        shallowEqual,
    )

    return (
        <div>
            {salesAnalysis?.data && <div>{salesAnalysis.data}</div>}
            {salesSummary?.data && <div>{salesSummary.data}</div>}
        </div>
    )
}
```

### 패턴 3: 중첩된 값 선택

```typescript
import { shallowEqual } from 'react-redux'
import { useAppSelector } from 'src/global/store/redux/reduxHooks'

const Component = () => {
    // ✅ 중첩된 값도 구조 분해 할당으로 선택
    const { orderList } = useAppSelector(
        ({ ordersReducer }) => ({
            orderList: ordersReducer.orderList,
        }),
        shallowEqual,
    )

    const orders = orderList?.data?.content || []

    return (
        <div>
            {orders.map((order) => (
                <div key={order.id}>{order.orderNumber}</div>
            ))}
        </div>
    )
}
```

### 패턴 4: 타입 안전성을 위한 명시적 타입 지정 (고급)

```typescript
import { shallowEqual } from 'react-redux'
import { useAppSelector } from 'src/global/store/redux/reduxHooks'
import type { OrdersReducerState } from 'src/global/store/redux/reduxStore'

const Component = () => {
    // ✅ 타입을 명시적으로 지정하여 더 안전하게
    const { orderList } = useAppSelector(
        ({ ordersReducer }: { ordersReducer: OrdersReducerState }) => ({
            orderList: ordersReducer.orderList,
        }),
        shallowEqual,
    )

    return <div>{orderList?.data?.content.length}</div>
}
```

## 🔍 shallowEqual의 역할

`shallowEqual`은 객체의 얕은 비교를 수행하여 불필요한 리렌더링을 방지합니다.

```typescript
// shallowEqual 없이
const { data } = useAppSelector(({ reducer }) => ({
    data: reducer.data,
}))
// 매번 새로운 객체가 생성되므로 항상 리렌더링 발생

// shallowEqual 사용
const { data } = useAppSelector(
    ({ reducer }) => ({
        data: reducer.data,
    }),
    shallowEqual,
)
// 객체의 속성이 실제로 변경되었을 때만 리렌더링 발생
```

## 📌 Best Practices

### ✅ DO

1. **구조 분해 할당 사용**
   ```typescript
   const { value } = useAppSelector(({ reducer }) => ({ value: reducer.value }), shallowEqual)
   ```

2. **shallowEqual 사용** (객체 반환 시)
   ```typescript
   useAppSelector(selector, shallowEqual)
   ```

3. **필요한 값만 선택**
   ```typescript
   // ✅ 필요한 값만 선택
   const { orderList } = useAppSelector(({ ordersReducer }) => ({
       orderList: ordersReducer.orderList,
   }), shallowEqual)
   ```

### ❌ DON'T

1. **명시적 RootState 타입 지정** (불필요)
   ```typescript
   // ❌ 불필요한 타입 지정
   const value = useAppSelector((state: RootState) => state.reducer.value)
   ```

2. **전체 리듀서 구독**
   ```typescript
   // ❌ 전체 리듀서를 구독하면 불필요한 리렌더링 발생
   const reducer = useAppSelector(({ ordersReducer }) => ordersReducer)
   ```

3. **shallowEqual 누락** (객체 반환 시)
   ```typescript
   // ❌ shallowEqual 없으면 매번 리렌더링 발생
   const { data } = useAppSelector(({ reducer }) => ({ data: reducer.data }))
   ```

## 🎨 실제 사용 예시

### 예시 1: Store Reducer

```typescript
// Before
const searchKeyword = useAppSelector(
    (state: RootState) => state.storeReducer.searchKeyword,
)

// After
const { searchKeyword } = useAppSelector(
    ({ storeReducer }) => ({
        searchKeyword: storeReducer.searchKeyword,
    }),
    shallowEqual,
)
```

### 예시 2: Orders Reducer

```typescript
// ✅ 이미 올바른 패턴 사용 중
const { orderList } = useAppSelector(
    ({ ordersReducer }) => ({
        orderList: ordersReducer.orderList,
    }),
    shallowEqual,
)
```

### 예시 3: Statistics Reducer

```typescript
// ✅ 이미 올바른 패턴 사용 중
const { salesAnalysis, salesSummary } = useAppSelector(
    ({ statisticsReducer }) => ({
        salesAnalysis: statisticsReducer.salesAnalysis,
        salesSummary: statisticsReducer.salesSummary,
    }),
    shallowEqual,
)
```

## 🔧 타입 에러 해결

TypeScript가 리듀서 타입을 인식하지 못하는 경우:

1. **TypeScript 서버 재시작**
   - VS Code: `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

2. **개발 서버 재시작**
   - 터미널에서 개발 서버 중지 후 재시작

3. **타입 명시적 지정** (임시 해결책)
   ```typescript
   import type { StoreReducerState } from 'src/global/store/redux/reduxStore'
   
   const { searchKeyword } = useAppSelector(
       ({ storeReducer }: { storeReducer: StoreReducerState }) => ({
           searchKeyword: storeReducer.searchKeyword,
       }),
       shallowEqual,
   )
   ```

## 🚀 고급 패턴: Selector 함수 사용

### Selector 함수를 통한 타입 안전성

각 리듀서별로 selector 함수를 미리 정의하여 재사용성과 타입 안전성을 높일 수 있습니다.

```typescript
// src/global/store/redux/selectorUtils.ts
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from './reduxStore'

// 기본 selector
export const selectOrdersReducer = (state: RootState) => state.ordersReducer

// 메모이제이션된 selector
export const selectOrderList = createSelector(
    [selectOrdersReducer],
    (ordersReducer) => ordersReducer.orderList,
)
```

### 컴포넌트에서 사용

```typescript
import { useAppSelector } from 'src/global/store/redux/reduxHooks'
import { selectOrderList } from 'src/global/store/redux/selectorUtils'

const Component = () => {
    // ✅ 간단하고 타입 안전함
    const orderList = useAppSelector(selectOrderList)
    
    return <div>{orderList?.data?.content.length}</div>
}
```

### 장점

1. **타입 안전성**: TypeScript가 자동으로 타입을 추론
2. **재사용성**: 여러 컴포넌트에서 동일한 selector 사용 가능
3. **성능 최적화**: `createSelector`로 자동 메모이제이션
4. **코드 간결성**: `shallowEqual` 불필요, 코드가 더 간단해짐

### 패턴 비교

```typescript
// ❌ 이전 방식 (여전히 유효하지만 더 장황함)
const { orderList } = useAppSelector(
    ({ ordersReducer }) => ({
        orderList: ordersReducer.orderList,
    }),
    shallowEqual,
)

// ✅ Selector 함수 사용 (더 간결하고 타입 안전)
const orderList = useAppSelector(selectOrderList)
```

---

**마지막 업데이트**: 2024년

