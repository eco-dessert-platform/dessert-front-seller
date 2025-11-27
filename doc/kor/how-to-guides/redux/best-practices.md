# Best Practices

## 📋 목차

1. [설계의 장단점](#설계의-장단점)
2. [언제 이 패턴을 사용해야 하는가?](#언제-이-패턴을-사용해야-하는가)
3. [프로젝트 규모별 가이드](#프로젝트-규모별-가이드)
4. [다른 솔루션과의 비교](#다른-솔루션과의-비교)
5. [마이그레이션 가이드](#마이그레이션-가이드)
6. [권장사항 및 안티패턴](#권장사항-및-안티패턴)

---

## 설계의 장단점

### ✅ 장점

#### 1. 일관성

- 모든 API 요청이 동일한 패턴으로 처리
- 팀원 누구나 쉽게 이해하고 추가 가능
- 코드 리뷰가 용이

```typescript
// 항상 동일한 패턴
const asyncRequests = [
    { action: 'getData', state: 'data', initialState: null, api: fetchData },
]
const module = reduxMaker(prefix, asyncRequests, localState, localReducers)
```

#### 2. 보일러플레이트 최소화

- `reduxMaker`로 Slice + Saga를 한 번에 생성
- 3줄이면 새로운 API 요청 추가 가능

**비교:**

```typescript
// ❌ 전통적인 Redux: 100+ 줄
// - actionTypes.ts
// - actions.ts
// - reducer.ts
// - saga.ts

// ✅ 현재 아키텍처: 3줄
{
    action: 'getData',
    state: 'data',
    initialState: null,
    api: () => axios.get('/api/data'),
}
```

#### 3. 타입 안전성

- TypeScript로 완벽한 타입 추론
- 컴파일 타임에 에러 검출

```typescript
// 자동 타입 추론
const pokemon = useAppSelector((state) => state.sampleReducer.pokemon)
// pokemon.data는 { name: string; id: number } | null 타입

dispatch(sampleAction.getPokemon()) // ✅ OK
dispatch(sampleAction.getPokemon(123)) // ❌ 타입 에러
```

#### 4. 디버깅 용이성

- Redux DevTools로 모든 상태 변화 추적
- Time-travel debugging 가능
- 액션 히스토리 확인

#### 5. 테스트 가능성

- Saga는 제너레이터로 테스트가 쉬움
- 순수 함수로 구성
- Mock API 없이 테스트 가능

```typescript
test('should handle API success', () => {
    const gen = fetchDataSaga({ payload: {} })
    expect(gen.next().value).toEqual(call(api, {}))
    expect(gen.next(response).value).toEqual(put(successAction))
})
```

#### 6. 중앙 집중식 관리

- 모든 부수 효과가 Saga에서 관리됨
- 컴포넌트는 순수하게 유지
- 비즈니스 로직과 UI 로직 분리

---

### ⚠️ 단점 및 고려사항

#### 1. 학습 곡선

- Redux Saga의 제너레이터 문법 학습 필요
- Redux 생태계 전반에 대한 이해 필요
- 초기 설정이 복잡

**해결책:**

- 팀 내 교육 세션 진행
- 이 문서와 예제 코드 참고
- 페어 프로그래밍으로 학습

#### 2. 번들 크기

- Redux + Redux Saga 라이브러리 추가 (~30KB)
- 작은 프로젝트에는 오버엔지니어링일 수 있음

**언제 괜찮은가:**

- 중대형 프로젝트 (10+ 페이지)
- 복잡한 상태 관리가 필요한 경우

#### 3. 캐싱 전략

- React Query처럼 자동 캐싱 기능 없음
- 필요시 직접 구현해야 함

**해결책:**

```typescript
// 커스텀 캐싱 로직
function* fetchWithCache() {
    const cached = yield select((state) => state.cache.data)
    const cacheTime = yield select((state) => state.cache.timestamp)

    // 5분 이내면 캐시 사용
    if (cached && Date.now() - cacheTime < 5 * 60 * 1000) {
        return
    }

    // 새로 가져오기
    const data = yield call(fetchAPI)
    yield put(cacheAction.set({ data, timestamp: Date.now() }))
}
```

#### 4. 낙관적 업데이트

- React Query만큼 간편하지 않음
- Saga에서 수동으로 처리해야 함

**해결책:**

```typescript
function* optimisticUpdate(action) {
    yield put(updateOptimistic(action.payload))
    try {
        const result = yield call(api, action.payload)
        yield put(updateSuccess(result))
    } catch (error) {
        yield put(rollback(action.payload))
    }
}
```

---

## 언제 이 패턴을 사용해야 하는가?

### ✅ 적합한 경우

#### 1. 중대형 프로젝트

```
페이지 수: 10개 이상
개발자: 3명 이상
개발 기간: 3개월 이상
```

**이유:**

- 일관된 패턴으로 협업이 쉬움
- 장기적으로 유지보수가 용이
- 복잡한 상태 관리 필요

**예시:**

- 어드민 대시보드
- 전자상거래 플랫폼
- SaaS 애플리케이션

#### 2. 예측 가능한 상태 흐름이 중요한 경우

**적용 도메인:**

- 금융 서비스 (거래, 결제)
- 의료 시스템 (환자 기록)
- 예약 시스템 (좌석, 일정)

**이유:**

- 모든 상태 변화를 추적 가능
- 감사 로그 필요
- 데이터 정합성이 중요

#### 3. 복잡한 비동기 로직

**시나리오:**

- API 요청 간 의존성이 있는 경우
- 취소, 재시도, 폴링이 필요한 경우
- 여러 API를 조합해야 하는 경우

**예시:**

```typescript
function* complexFlow() {
    // 1. 사용자 정보 가져오기
    const user = yield call(fetchUser)

    // 2. 사용자의 주문 목록 가져오기
    const orders = yield call(fetchOrders, user.id)

    // 3. 각 주문의 상세 정보를 병렬로 가져오기
    const orderDetails = yield all(
        orders.map((order) => call(fetchOrderDetail, order.id)),
    )

    // 4. 데이터 조합
    yield put(dashboardAction.setData({ user, orders, orderDetails }))
}
```

#### 4. 팀 협업

- 일관된 코드 스타일이 중요
- 코드 리뷰 효율성
- 신입 개발자 온보딩

---

### ❌ 부적합한 경우

#### 1. 작은 프로젝트

```
페이지 수: 5개 이하
개발자: 1-2명
개발 기간: 1개월 이하
```

**대안:**

- React Query + useState
- Zustand
- Jotai

**예시:**

- 랜딩 페이지
- 간단한 포트폴리오 사이트
- MVP 프로토타입

#### 2. 프로토타입/MVP

- 빠른 개발 속도가 중요
- 요구사항이 자주 변경됨
- 빠른 검증이 필요

**대안:**

```typescript
// React Query 사용
const { data, isLoading } = useQuery('key', fetchData)

// 3줄로 API 호출 완료
```

#### 3. 서버 상태 캐싱이 중요한 경우

- 자동 리페칭 필요
- Stale-While-Revalidate 패턴
- 백그라운드 동기화

**대안:**

- React Query
- SWR

---

## 프로젝트 규모별 가이드

### 소규모 프로젝트 (1-5페이지)

**권장 솔루션:**

```typescript
// React Query + useState
const App = () => {
    const [count, setCount] = useState(0)
    const { data } = useQuery('data', fetchData)

    return <div>...</div>
}
```

**이유:**

- 빠른 개발
- 간단한 설정
- 충분한 기능

---

### 중규모 프로젝트 (5-20페이지)

**권장 솔루션 (선택):**

#### 옵션 1: React Query + Zustand

```typescript
// 서버 상태: React Query
const { data } = useQuery('user', fetchUser)

// 클라이언트 상태: Zustand
const count = useStore((state) => state.count)
```

#### 옵션 2: Redux Toolkit + Redux Saga (현재 아키텍처)

```typescript
// 모든 상태를 Redux로 관리
const data = useAppSelector((state) => state.userReducer.user)
```

**선택 기준:**

- 복잡한 비동기 로직이 많으면 → Redux Saga
- 간단한 API 호출이 대부분이면 → React Query

---

### 대규모 프로젝트 (20+ 페이지)

**권장 솔루션:**
Redux Toolkit + Redux Saga (현재 아키텍처)

**이유:**

- 일관된 패턴 필수
- 복잡한 상태 관리
- 팀 협업 효율성

**추가 고려사항:**

- 코드 스플리팅
- 모듈 분리
- 성능 최적화

---

## 다른 솔루션과의 비교

### Redux Saga vs React Query

| 기능               | Redux Saga     | React Query          |
| ------------------ | -------------- | -------------------- |
| **서버 상태 캐싱** | 수동           | 자동                 |
| **리페칭**         | 수동           | 자동                 |
| **복잡한 비동기**  | ✅ 우수        | ⚠️ 제한적            |
| **디버깅**         | Redux DevTools | React Query DevTools |
| **학습 곡선**      | 높음           | 낮음                 |
| **번들 크기**      | 큰 편 (~30KB)  | 작은 편 (~13KB)      |
| **상태 추적**      | ✅ 완벽        | ⚠️ 제한적            |
| **전역 상태 관리** | ✅ 우수        | ❌ 불가              |

### 선택 가이드

```typescript
// ✅ Redux Saga를 선택하세요
if (복잡한_비동기_로직 && 상태_추적이_중요함 && 팀_규모가_큼) {
    return 'Redux Saga'
}

// ✅ React Query를 선택하세요
if (간단한_API_호출 && 빠른_개발이_중요함 && 프로토타입_단계) {
    return 'React Query'
}
```

---

## 마이그레이션 가이드

### React Query → Redux Saga

#### Before (React Query)

```typescript
const UserProfile = () => {
    const { data, isLoading, error } = useQuery('user', fetchUser)

    if (isLoading) return <Spinner />
    if (error) return <Error />
    return <div>{data.name}</div>
}
```

#### After (Redux Saga)

```typescript
// 1. Reducer 정의
const asyncRequests = [
    {
        action: 'getUser',
        state: 'user',
        initialState: null,
        api: () => axios.get('/api/user'),
    },
]
const module = reduxMaker('user', asyncRequests, {}, {})

// 2. 컴포넌트
const UserProfile = () => {
    const dispatch = useAppDispatch()
    const { data, loading, error } = useAppSelector(state => state.userReducer.user)

    useEffect(() => {
        dispatch(userAction.getUser())
    }, [])

    if (loading) return <Spinner />
    if (error) return <Error />
    return <div>{data.name}</div>
}
```

### useState → Redux

#### Before

```typescript
const [count, setCount] = useState(0)
```

#### After

```typescript
// Reducer
const localState = { count: 0 }
const localReducers = {
    increment: (state) => {
        state.count += 1
    },
}

// Component
const count = useAppSelector((state) => state.counterReducer.count)
dispatch(counterAction.increment())
```

---

## 권장사항 및 안티패턴

### ✅ 권장사항

#### 1. 컴포넌트 언마운트 시 cleanup

```typescript
// ✅ 좋은 예
useEffect(() => {
    dispatch(action.getData())
    return () => {
        dispatch(action.initialize('data'))
    }
}, [])
```

#### 2. 필요한 상태만 구독

```typescript
// ✅ 좋은 예
const name = useAppSelector((state) => state.user.data?.name)

// ❌ 나쁜 예
const user = useAppSelector((state) => state.user)
```

#### 3. Memoized Selector 사용

```typescript
// ✅ 좋은 예
const selectUserName = createSelector([(state) => state.user], (user) =>
    user.data?.name.toUpperCase(),
)
```

#### 4. 에러 처리

```typescript
// ✅ 좋은 예
if (error) {
    return <ErrorBoundary error={errorMsg} onRetry={handleRetry} />
}
```

---

### ❌ 안티패턴

#### 1. cleanup 없이 데이터 로드

```typescript
// ❌ 나쁜 예
useEffect(() => {
    dispatch(action.getData())
    // return 문 없음 - 메모리 누수!
}, [])
```

#### 2. 전체 reducer 구독

```typescript
// ❌ 나쁜 예
const allState = useAppSelector((state) => state.userReducer)
// 모든 변경에 리렌더링
```

#### 3. 로딩 상태 무시

```typescript
// ❌ 나쁜 예
const data = useAppSelector(state => state.user.data)
return <div>{data.name}</div> // data가 null일 수 있음
```

#### 4. 직접 API 호출

```typescript
// ❌ 나쁜 예
const handleClick = async () => {
    const data = await axios.get('/api/data')
    // Redux를 우회함
}
```

---

## 체크리스트

### 새로운 Feature 추가 시

- [ ] `reduxMaker`로 reducer 정의
- [ ] Store에 등록 (reducers, rootSaga)
- [ ] 컴포넌트에서 useEffect로 데이터 로드
- [ ] cleanup 함수에서 initialize 호출
- [ ] 로딩/에러 상태 처리
- [ ] Redux DevTools로 동작 확인

### 성능 최적화 시

- [ ] useSelector로 필요한 것만 구독
- [ ] createSelector로 복잡한 계산 메모이제이션
- [ ] React.memo로 불필요한 리렌더링 방지
- [ ] 대용량 데이터는 페이지네이션
- [ ] 가상화 라이브러리 적용 (react-virtual)

### 프로덕션 배포 전

- [ ] Redux DevTools 프로덕션 비활성화
- [ ] 메모리 프로파일링 확인
- [ ] 번들 크기 최적화
- [ ] 에러 처리 완료
- [ ] 테스트 작성 완료

---

## 결론

### 이 아키텍처의 핵심 가치

1. **일관성**: 모든 개발자가 동일한 패턴을 따름
2. **예측 가능성**: 모든 상태 변화를 추적 가능
3. **확장성**: 프로젝트가 커져도 유지보수 용이
4. **타입 안전성**: 컴파일 타임에 에러 검출

### 최종 권장사항

```typescript
// 프로젝트 규모별 권장
if (pages <= 5) {
    use('React Query + useState')
} else if (pages <= 20) {
    if (complexAsyncLogic) {
        use('Redux Saga') // ← 현재 아키텍처
    } else {
        use('React Query + Zustand')
    }
} else {
    use('Redux Saga') // ← 현재 아키텍처
}
```

### 핵심 메시지

> "초기 설정 비용은 있지만, 장기적으로 유지보수가 용이하고 확장 가능한 아키텍처를 제공합니다."

---

**관련 문서:**

- [아키텍처 구조](./architecture.md)
- [사용 가이드](./usage-guide.md)
- [성능 최적화](./performance-optimization.md)

**작성일**: 2024-11-20  
**버전**: 1.0.0
