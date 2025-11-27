# 사용 가이드

## 📋 목차
1. [sampleReducer 정의하기](#samplereducer-정의하기)
2. [컴포넌트에서 사용하기](#컴포넌트에서-사용하기)
3. [생성되는 상태 구조](#생성되는-상태-구조)
4. [액션 흐름 이해하기](#액션-흐름-이해하기)
5. [고급 사용 패턴](#고급-사용-패턴)

---

## sampleReducer 정의하기

### 1. 기본 구조

```typescript
// features/sample/sampleReducer.ts
import { reduxMaker, AsyncRequest } from 'src/global/store/redux/reduxUtils.ts'
import { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const prefix = 'sample'
```

### 2. API 요청 정의

```typescript
// 비동기 요청 목록 정의
const asyncRequests = [
    {
        action: 'getPokemon',
        state: 'pokemon',
        initialState: { name: 'pokemon', id: 1 },
        api: () => axios.get('https://pokeapi.co/api/v2/pokemon/ditto'),
    } as const satisfies AsyncRequest<{ name: string; id: number }, void>,
    
    {
        action: 'getTest',
        state: 'test',
        initialState: [{ success: true, message: 'asd' }],
        api: (param) => axios.post('https://test.com', param),
    } as const satisfies AsyncRequest<
        { success: boolean; message: string }[],
        { param1: string; param2: number }
    >,
] as const
```

**AsyncRequest 타입 파라미터:**
- 첫 번째: 응답 데이터 타입
- 두 번째: 요청 파라미터 타입 (없으면 `void`)

### 3. 로컬 상태 정의

```typescript
// 로컬 상태 (비동기가 아닌 일반 상태)
const localState = {
    value: 0,
    isModalOpen: false,
    selectedId: null as number | null,
}
```

### 4. 로컬 리듀서 정의

```typescript
// 로컬 상태를 변경하는 리듀서
const localReducers = {
    decrement: (state) => {
        state.value -= 1
    },
    setValue: (state, action: PayloadAction<number>) => {
        state.value = action.payload
    },
    openModal: (state) => {
        state.isModalOpen = true
    },
    closeModal: (state) => {
        state.isModalOpen = false
    },
    selectItem: (state, action: PayloadAction<number>) => {
        state.selectedId = action.payload
    },
}
```

### 5. reduxMaker로 모듈 생성

```typescript
// reduxMaker를 사용하여 자동으로 Slice + Saga 생성
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const {
    slice: sampleSlice,
    actions: sampleAction,
    saga: sampleSaga,
} = module
```

### 6. Store에 등록하기

```typescript
// global/store/redux/reduxStore.tsx
import { sampleSlice, sampleSaga } from 'src/features/sample/sampleReducer'

const reducers = {
    // ... 기존 reducers
    sampleReducer: sampleSlice.reducer,
}

export function* rootSaga() {
    yield all([
        // ... 기존 sagas
        sampleSaga(),
    ])
}
```

---

## 컴포넌트에서 사용하기

### 1. 기본 사용 예시

```typescript
// Sample.tsx
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/global/store/redux/reduxHooks'
import { sampleAction } from 'src/features/sample/sampleReducer'

const Sample = () => {
    const dispatch = useAppDispatch()
    
    // 1. 상태 조회
    const pokemon = useAppSelector(state => state.sampleReducer.pokemon)
    const test = useAppSelector(state => state.sampleReducer.test)
    const value = useAppSelector(state => state.sampleReducer.value)
    
    // 2. API 요청 (파라미터 없음)
    const handleFetchPokemon = () => {
        dispatch(sampleAction.getPokemon())
    }
    
    // 3. API 요청 (파라미터 있음)
    const handleFetchTest = () => {
        dispatch(sampleAction.getTest({
            param1: 'hello',
            param2: 123,
        }))
    }
    
    // 4. 로컬 상태 변경
    const handleDecrement = () => {
        dispatch(sampleAction.decrement())
    }
    
    const handleSetValue = (newValue: number) => {
        dispatch(sampleAction.setValue(newValue))
    }
    
    return (
        <div>
            {/* 로딩 상태 처리 */}
            {pokemon.loading && <Spinner />}
            
            {/* 에러 상태 처리 */}
            {pokemon.error && <ErrorMessage message={pokemon.errorMsg} />}
            
            {/* 데이터 표시 */}
            {pokemon.data && (
                <div>
                    <h2>{pokemon.data.name}</h2>
                    <p>ID: {pokemon.data.id}</p>
                </div>
            )}
            
            <button onClick={handleFetchPokemon}>
                포켓몬 정보 가져오기
            </button>
            
            <div>
                <p>Value: {value}</p>
                <button onClick={handleDecrement}>감소</button>
                <button onClick={() => handleSetValue(100)}>100으로 설정</button>
            </div>
        </div>
    )
}
```

### 2. 초기화 패턴

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        // 컴포넌트 마운트 시 데이터 fetch
        dispatch(sampleAction.getPokemon())
        
        return () => {
            // 언마운트 시 특정 상태만 초기화
            dispatch(sampleAction.initialize('pokemon'))
            
            // 또는 여러 상태 초기화
            // dispatch(sampleAction.initialize('pokemon'))
            // dispatch(sampleAction.initialize('test'))
            
            // 또는 모든 비동기 상태 초기화
            // dispatch(sampleAction.initializeAll())
        }
    }, [])
    
    return <div>...</div>
}
```

### 3. 조건부 로딩

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(
        state => state.sampleReducer.pokemon
    )
    
    useEffect(() => {
        // 데이터가 없을 때만 fetch
        if (!data && !loading) {
            dispatch(sampleAction.getPokemon())
        }
    }, [data, loading])
    
    return <div>...</div>
}
```

### 4. 재시도 패턴

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    const { data, loading, error, errorMsg } = useAppSelector(
        state => state.sampleReducer.pokemon
    )
    
    const handleRetry = () => {
        dispatch(sampleAction.getPokemon())
    }
    
    if (loading) return <Spinner />
    
    if (error) {
        return (
            <div>
                <ErrorMessage message={errorMsg} />
                <button onClick={handleRetry}>다시 시도</button>
            </div>
        )
    }
    
    return <PokemonCard data={data} />
}
```

---

## 생성되는 상태 구조

### Redux Store의 실제 상태

```typescript
{
    sampleReducer: {
        // 로컬 상태
        value: 0,
        isModalOpen: false,
        selectedId: null,
        
        // 비동기 상태 1
        pokemon: {
            data: { name: 'ditto', id: 132 } | null,
            loading: false,
            error: false,
            errorMsg: '',
        },
        
        // 비동기 상태 2
        test: {
            data: [{ success: true, message: 'Hello' }] | null,
            loading: false,
            error: false,
            errorMsg: '',
        },
    }
}
```

### 자동으로 생성되는 액션들

```typescript
// API 요청 액션 (직접 사용)
sampleAction.getPokemon()          // { type: 'sample/getPokemon' }
sampleAction.getTest(params)       // { type: 'sample/getTest', payload: params }

// 성공/실패 액션 (Saga에서 자동 dispatch)
// sample/getPokemonSuccess
// sample/getPokemonFail
// sample/getTestSuccess
// sample/getTestFail

// 로컬 액션
sampleAction.decrement()           // { type: 'sample/decrement' }
sampleAction.setValue(100)         // { type: 'sample/setValue', payload: 100 }

// 초기화 액션
sampleAction.initialize('pokemon') // { type: 'sample/initialize', payload: 'pokemon' }
sampleAction.initializeAll()       // { type: 'sample/initializeAll' }
```

---

## 액션 흐름 이해하기

### 전체 흐름 도식화

```typescript
// 1. 컴포넌트에서 디스패치
dispatch(sampleAction.getPokemon())
// 액션: { type: 'sample/getPokemon' }

// 2. Saga가 액션을 가로채서 처리
function* () {
    yield takeLatest('sample/getPokemon', createRequestSaga(...))
}

// 3. API 호출
const response = yield call(api)

// 4-a. 성공 시
yield put({ 
    type: 'sample/getPokemonSuccess', 
    payload: { name: 'ditto', id: 132 }
})

// 4-b. 실패 시
yield put({ 
    type: 'sample/getPokemonFail', 
    payload: '서버 오류가 발생했습니다.'
})

// 5. Reducer가 상태 업데이트
// pokemon.loading: true → false
// pokemon.data: null → { name: 'ditto', id: 132 }
// pokemon.error: false

// 6. 컴포넌트 리렌더링
```

### Redux DevTools에서 확인하기

```
┌─────────────────────────────────────┐
│ Action: sample/getPokemon           │
│ Payload: undefined                  │
│ State Before:                       │
│   pokemon: { data: null, loading: false }
│ State After:                        │
│   pokemon: { data: null, loading: true }
└─────────────────────────────────────┘
        ↓
┌─────────────────────────────────────┐
│ Action: sample/getPokemonSuccess    │
│ Payload: { name: 'ditto', id: 132 } │
│ State Before:                       │
│   pokemon: { data: null, loading: true }
│ State After:                        │
│   pokemon: { data: {...}, loading: false }
└─────────────────────────────────────┘
```

---

## 고급 사용 패턴

### 1. Selector 최적화

```typescript
import { createSelector } from '@reduxjs/toolkit'

// Memoized Selector
const selectPokemon = (state: RootState) => state.sampleReducer.pokemon
const selectPokemonName = createSelector(
    [selectPokemon],
    (pokemon) => pokemon.data?.name.toUpperCase()
)

const Sample = () => {
    // pokemon.data가 변경될 때만 재계산
    const name = useAppSelector(selectPokemonName)
}
```

### 2. 여러 상태 조합

```typescript
const selectPokemonInfo = createSelector(
    [
        (state: RootState) => state.sampleReducer.pokemon,
        (state: RootState) => state.sampleReducer.value,
    ],
    (pokemon, value) => ({
        name: pokemon.data?.name,
        id: pokemon.data?.id,
        multiplier: value,
        totalPower: (pokemon.data?.id || 0) * value,
    })
)

const Sample = () => {
    const info = useAppSelector(selectPokemonInfo)
    return <div>Total Power: {info.totalPower}</div>
}
```

### 3. shallowEqual 사용

```typescript
import { shallowEqual } from 'react-redux'

const Sample = () => {
    // 객체의 속성이 변경되지 않으면 리렌더링하지 않음
    const { pokemon, test } = useAppSelector(
        state => ({
            pokemon: state.sampleReducer.pokemon,
            test: state.sampleReducer.test,
        }),
        shallowEqual
    )
}
```

### 4. 조건부 API 호출

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    const [shouldFetch, setShouldFetch] = useState(false)
    
    useEffect(() => {
        if (shouldFetch) {
            dispatch(sampleAction.getPokemon())
        }
    }, [shouldFetch])
    
    return (
        <button onClick={() => setShouldFetch(true)}>
            데이터 가져오기
        </button>
    )
}
```

### 5. 폴링 패턴

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        // 초기 데이터 로드
        dispatch(sampleAction.getPokemon())
        
        // 5초마다 데이터 갱신
        const interval = setInterval(() => {
            dispatch(sampleAction.getPokemon())
        }, 5000)
        
        return () => {
            clearInterval(interval)
            dispatch(sampleAction.initialize('pokemon'))
        }
    }, [])
}
```

### 6. 의존성 있는 API 호출

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.userReducer.user.data?.id)
    
    useEffect(() => {
        // userId가 있을 때만 포스트 가져오기
        if (userId) {
            dispatch(postAction.getUserPosts({ userId }))
        }
    }, [userId])
}
```

### 7. 에러 처리와 토스트 메시지

```typescript
const Sample = () => {
    const dispatch = useAppDispatch()
    const { error, errorMsg } = useAppSelector(
        state => state.sampleReducer.pokemon
    )
    
    useEffect(() => {
        if (error) {
            // 토스트 메시지 표시
            toast.error(errorMsg)
            
            // 에러 상태 초기화
            dispatch(sampleAction.initialize('pokemon'))
        }
    }, [error, errorMsg])
}
```

### 8. 낙관적 업데이트

```typescript
const TodoList = () => {
    const dispatch = useAppDispatch()
    const todos = useAppSelector(state => state.todoReducer.todos)
    
    const handleAddTodo = (text: string) => {
        // 즉시 UI 업데이트
        const tempId = Date.now()
        dispatch(todoAction.addOptimistic({ id: tempId, text }))
        
        // API 호출
        dispatch(todoAction.addTodo({ text }))
            .then((result) => {
                // 성공 시 임시 ID를 실제 ID로 교체
                dispatch(todoAction.updateId({ tempId, realId: result.id }))
            })
            .catch(() => {
                // 실패 시 롤백
                dispatch(todoAction.removeTodo(tempId))
            })
    }
}
```

---

## 실전 예시: CRUD 구현

### 1. Reducer 정의

```typescript
// features/todo/todoReducer.ts
const prefix = 'todo'

const asyncRequests = [
    {
        action: 'getTodos',
        state: 'todos',
        initialState: [],
        api: () => axios.get('/api/todos'),
    } as const satisfies AsyncRequest<Todo[], void>,
    
    {
        action: 'addTodo',
        state: 'addResult',
        initialState: null,
        api: (params: { text: string }) => axios.post('/api/todos', params),
    } as const satisfies AsyncRequest<Todo, { text: string }>,
    
    {
        action: 'updateTodo',
        state: 'updateResult',
        initialState: null,
        api: (params: { id: number; text: string }) => 
            axios.put(`/api/todos/${params.id}`, { text: params.text }),
    } as const satisfies AsyncRequest<Todo, { id: number; text: string }>,
    
    {
        action: 'deleteTodo',
        state: 'deleteResult',
        initialState: null,
        api: (params: { id: number }) => axios.delete(`/api/todos/${params.id}`),
    } as const satisfies AsyncRequest<void, { id: number }>,
] as const

const localState = {
    filter: 'all' as 'all' | 'active' | 'completed',
}

const localReducers = {
    setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
        state.filter = action.payload
    },
}

const module = reduxMaker(prefix, asyncRequests, localState, localReducers)

export const { slice: todoSlice, actions: todoAction, saga: todoSaga } = module
```

### 2. 컴포넌트에서 사용

```typescript
// TodoList.tsx
const TodoList = () => {
    const dispatch = useAppDispatch()
    const { data: todos, loading } = useAppSelector(state => state.todoReducer.todos)
    const filter = useAppSelector(state => state.todoReducer.filter)
    
    useEffect(() => {
        dispatch(todoAction.getTodos())
    }, [])
    
    const handleAdd = (text: string) => {
        dispatch(todoAction.addTodo({ text }))
            .then(() => {
                // 성공 시 목록 갱신
                dispatch(todoAction.getTodos())
            })
    }
    
    const handleUpdate = (id: number, text: string) => {
        dispatch(todoAction.updateTodo({ id, text }))
            .then(() => {
                dispatch(todoAction.getTodos())
            })
    }
    
    const handleDelete = (id: number) => {
        dispatch(todoAction.deleteTodo({ id }))
            .then(() => {
                dispatch(todoAction.getTodos())
            })
    }
    
    const filteredTodos = todos?.filter(todo => {
        if (filter === 'active') return !todo.completed
        if (filter === 'completed') return todo.completed
        return true
    })
    
    return (
        <div>
            <TodoInput onAdd={handleAdd} />
            
            <FilterButtons 
                current={filter}
                onChange={(f) => dispatch(todoAction.setFilter(f))}
            />
            
            {loading ? (
                <Spinner />
            ) : (
                <ul>
                    {filteredTodos?.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
```

---

**다음 문서**: [성능 최적화](./performance-optimization.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0

