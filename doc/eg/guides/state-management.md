# State Management Structure

- Uses **Redux Toolkit** for global state management.
- Store, hooks, and utils are located in `src/app/store/redux/`.
- Each feature has its own slice (reducer).
- Async operations are handled with createAsyncThunk or redux-saga (if needed).

## Example

```ts
// src/app/store/redux/reduxStore.tsx
import { configureStore } from '@reduxjs/toolkit'
import sampleReducer from 'src/features/sample/sampleReducer'

export const store = configureStore({
    reducer: {
        sample: sampleReducer,
        // ...other reducers
    },
})
```

