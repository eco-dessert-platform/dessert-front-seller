# 상태관리 (Redux)

이 프로젝트는 전역 상태 관리를 위해 **Redux Toolkit**과 **Redux Saga**를 사용합니다.

## 설치된 Redux 관련 패키지

프로젝트에 이미 설치되어 있는 Redux 관련 패키지들:

- `@reduxjs/toolkit` (v2.6.1) - Redux 공식 툴킷
- `react-redux` (v9.2.0) - React 바인딩
- `redux` (v5.0.1) - Redux 코어
- `redux-saga` (v1.3.0) - 비동기 처리를 위한 사이드 이펙트 라이브러리
- `typesafe-actions` (v5.1.0) - TypeScript 안전성을 위한 액션 헬퍼
- `@types/react-redux` (v7.1.34) - TypeScript 타입 정의

## 프로젝트 Redux 구조

Redux 관련 파일들은 다음과 같이 구성되어 있습니다:

```
src/
  app/
    store/
      redux/
        ├── store.ts          # Redux 스토어 설정
        ├── hooks.ts          # 타입이 지정된 useDispatch, useSelector
        ├── rootReducer.ts    # 루트 리듀서 (combineReducers)
        ├── rootSaga.ts       # 루트 사가
        └── modules/          # 기능별 슬라이스/모듈
            ├── user/
            ├── auth/
            └── ...
```

## 기본 사용법

### 1. 스토어 접근

`src/app/store/redux/hooks.ts`에서 제공하는 타입이 지정된 훅을 사용합니다:

```typescript
import { useAppDispatch, useAppSelector } from '@/app/store/redux/hooks';

function MyComponent() {
  // 타입 안전한 dispatch
  const dispatch = useAppDispatch();
  
  // 타입 안전한 selector
  const user = useAppSelector((state) => state.user);
  
  return <div>{user.name}</div>;
}
```

### 2. 슬라이스 생성 (동기 액션)

Redux Toolkit의 `createSlice`를 사용하여 슬라이스를 생성합니다:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
}

const initialState: UserState = {
  name: '',
  email: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
```

### 3. 비동기 처리

#### 방법 1: createAsyncThunk 사용

간단한 비동기 로직은 `createAsyncThunk`를 사용합니다:

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

#### 방법 2: Redux Saga 사용

복잡한 비동기 로직이나 사이드 이펙트는 Redux Saga를 사용합니다:

```typescript
// userSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchUserSaga(action: { type: string; payload: string }) {
  try {
    const response = yield call(fetch, `/api/users/${action.payload}`);
    const data = yield call([response, 'json']);
    yield put({ type: 'user/fetchUserSuccess', payload: data });
  } catch (error) {
    yield put({ type: 'user/fetchUserFailure', payload: error.message });
  }
}

export function* userSaga() {
  yield takeLatest('user/fetchUserRequest', fetchUserSaga);
}
```

## 모범 사례

1. **타입 안전성**: 항상 `useAppDispatch`와 `useAppSelector` 훅을 사용하세요
2. **슬라이스 분리**: 기능별로 슬라이스를 분리하여 관리하세요
3. **비동기 처리 선택**:
   - 간단한 API 호출 → `createAsyncThunk`
   - 복잡한 로직, 여러 액션 조합 → `redux-saga`
4. **불변성**: Redux Toolkit의 Immer를 활용하여 직접 상태를 수정하세요

## 추가 리소스

- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [Redux Saga 공식 문서](https://redux-saga.js.org/)
- [리듀서 사용법 가이드](./reducer-usage.md)

