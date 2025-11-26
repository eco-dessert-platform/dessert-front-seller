# Reducer Usage (Sync/Async)

## Synchronous Reducer

- Managed as a regular slice reducer
- Example:
    ```ts
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload
        }
    }
    ```

## Asynchronous Reducer

- Use `createAsyncThunk` for async actions
- Or use **redux-saga** for more complex side effects
- Handle pending/fulfilled/rejected in extraReducers
- Example:
    ```ts
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state) => {
                state.error = true
            })
    }
    ```

