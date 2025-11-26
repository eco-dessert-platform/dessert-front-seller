# Redux State Management

> **Introducing this project's Redux architecture**

This project uses **Redux Toolkit + Redux Saga + custom reduxMaker utility** for global state management.

Instead of the traditional Redux Toolkit pattern, we use **a custom architecture that dramatically reduces boilerplate**.

## 🎯 Key Features

- ✅ **Auto-generate Slice + Saga with `reduxMaker` utility**
- ✅ **Automatic loading/error state management**
- ✅ **Consistent code patterns for rapid development**
- ✅ **Type safety (TypeScript)**
- ✅ **Explicit memory management (initialize/initializeAll)**

## 📦 Installed Packages

```json
{
  "@reduxjs/toolkit": "^2.6.1",
  "react-redux": "^9.2.0",
  "redux": "^5.0.1",
  "redux-saga": "^1.3.0"
}
```

## 🏗️ Project Redux Structure

```
src/
├── app/store/redux/
│   ├── reduxStore.tsx      # Store setup & rootSaga
│   ├── reduxHooks.tsx      # useAppDispatch, useAppSelector
│   └── reduxUtils.ts       # reduxMaker utility (Core!)
└── features/
    └── sample/
        ├── sampleReducer.ts    # Reducer created with reduxMaker
        ├── sampleAPI.tsx       # API functions
        └── Sample.tsx          # Component
```

## 🚀 Quick Start

### Traditional Redux Toolkit (❌ Not used):
```typescript
// 100+ lines of boilerplate...
const slice = createSlice({ ... })
function* saga() { ... }
// Manual loading/error state management
```

### This Project (✅ reduxMaker):
```typescript
import { reduxMaker } from 'src/app/store/redux/reduxUtils.ts'

const asyncRequests = [{
    action: 'getData',
    state: 'data',
    api: () => axios.get('/api/data'),
}]
const localState = { count: 0 }
const localReducers = { increment: (state) => { state.count += 1 } }

// 🎉 Auto-generated!
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
```

## 📊 Auto-Generated Structure

### State
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

### Actions
```typescript
actions.getData()              // API call
actions.increment()            // Sync action
actions.initialize('data')     // State initialization
```

## 📚 Detailed Documentation

**👉 [Complete Redux Guide (redux/)](./redux/)**

- [📖 Redux Overview & Quick Start](./redux/README.md)
- [🏗️ Architecture](./redux/architecture.md)
- [❓ Why Redux Store?](./redux/why-redux-store.md)
- [⚡ Async Processing & Middleware](./redux/async-middleware.md)
- [📘 Usage Guide](./redux/usage-guide.md)
- [🚀 Performance Optimization](./redux/performance-optimization.md)
- [✨ Best Practices](./redux/best-practices.md)

## 🔗 Resources

- [Redux Toolkit Official Docs](https://redux-toolkit.js.org/)
- [Redux Saga Official Docs](https://redux-saga.js.org/)
- Actual code: `src/features/sample/sampleReducer.ts`
