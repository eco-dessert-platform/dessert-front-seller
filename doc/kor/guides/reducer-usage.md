# 리듀서 사용법 (동기/비동기)

## 동기 리듀서

- 일반적인 slice reducer로 관리

## 비동기 리듀서

- 비동기 액션은 `createAsyncThunk`로 생성하거나,
- 복잡한 사이드이펙트는 **redux-saga**로 처리할 수 있음
- extraReducers에서 pending/fulfilled/rejected 처리

