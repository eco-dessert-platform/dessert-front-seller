# 라우팅

이 프로젝트는 **React Router v7**를 기반으로 한 **파일 시스템 기반 동적 라우팅**을 사용합니다.

## 📋 개요

### 핵심 특징

- ✅ **파일 시스템 기반 라우팅**: 폴더 구조가 URL 구조를 반영
- ✅ **자동 라우트 등록**: `pages/url/` 폴더의 파일을 자동으로 라우트로 등록
- ✅ **동적 라우트**: `[param]` 형식으로 동적 경로 생성
- ✅ **레이지 로딩**: 코드 스플리팅으로 초기 로딩 속도 향상
- ✅ **타입 안전**: TypeScript로 라우트 파라미터 타입 체크

## 🗂️ 라우팅 구조

### 기본 폴더 구조

```
src/pages/
├── url/                    # 자동 라우팅 폴더
│   ├── login/              # /login
│   │   └── LoginPage.tsx
│   ├── register/           # /register
│   │   └── RegisterPage.tsx
│   ├── orders/             # /orders
│   │   └── OrdersPage.tsx
│   └── sample/             # /sample
│       ├── [id]/           # /sample/:id (동적 라우트)
│       │   └── SampleDetailPage.tsx
│       └── SamplePage.tsx
├── extra/                  # 특수 페이지
│   ├── NotFoundPage.tsx    # 404 페이지
│   └── LazyPage.tsx        # 로딩 페이지
└── HomePage.tsx            # 홈 페이지
```

### URL 매핑

| 파일 경로 | URL | 설명 |
|----------|-----|------|
| `pages/url/login/LoginPage.tsx` | `/login` | 로그인 페이지 |
| `pages/url/orders/OrdersPage.tsx` | `/orders` | 주문 목록 |
| `pages/url/sample/[id]/DetailPage.tsx` | `/sample/123` | 동적 라우트 |
| `pages/HomePage.tsx` | `/` | 홈 페이지 |

## 🔑 핵심 개념

### 1. 자동 라우트 등록

`pages/url/` 폴더 내의 모든 `**/*.tsx` 파일이 자동으로 라우트로 등록됩니다.

**router.tsx의 동작**:
```typescript
// src/global/router/router.tsx
const modules = import.meta.glob('/src/pages/url/**/*.tsx')

// 각 파일이 자동으로 라우트로 변환됨
// /src/pages/url/login/LoginPage.tsx → /login
// /src/pages/url/orders/OrdersPage.tsx → /orders
```

### 2. 동적 라우트

`[param]` 형식의 폴더로 동적 경로를 생성합니다.

**예시**:
```
pages/url/
└── sample/
    └── [id]/
        └── SampleDetailPage.tsx
```

**URL**: `/sample/123`, `/sample/456`

**컴포넌트에서 사용**:
```typescript
import { useParams } from 'react-router-dom'

export default function SampleDetailPage() {
    const { id } = useParams()  // '123', '456' 등
    
    return <div>Sample ID: {id}</div>
}
```

### 3. 레이지 로딩

모든 페이지는 자동으로 레이지 로딩됩니다.

```typescript
// 자동으로 적용됨
const SamplePage = lazy(() => import('./pages/url/sample/SamplePage'))

// Suspense로 감싸서 로딩 처리
<Suspense fallback={<LazyPage />}>
    <SamplePage />
</Suspense>
```

**장점**:
- ✅ 초기 번들 크기 감소
- ✅ 페이지별 코드 스플리팅
- ✅ 더 빠른 초기 로딩 속도

## 📝 파일 명명 규칙

### 페이지 컴포넌트

**규칙**: Feature와 구분하기 위해 `Page` 접미사 사용 권장 (필수 아님)

**좋은 예**:
```
- LoginPage.tsx
- OrdersPage.tsx
- ProductDetailPage.tsx
```

**나쁜 예**:
```
- Login.tsx (Feature 컴포넌트와 혼동)
- page.tsx (명확하지 않음)
```

### 기본 Export 사용

페이지 컴포넌트는 **default export**를 사용해야 합니다.

```typescript
// ✅ 올바른 방법
export default function LoginPage() {
    return <div>Login</div>
}

// ❌ 잘못된 방법
export function LoginPage() {
    return <div>Login</div>
}
```

## 🛣️ 라우트 설정

### 주의사항

**`pages/url/` 폴더 사용 규칙**:

1. **공통 페이지만 추가**:
   - 로그인, 회원가입, 주문 목록 등

2. **특정 기능에 종속된 페이지는 추가하지 않음**:
   - Feature 내부에서만 사용하는 페이지

3. **자동 등록되므로 router.tsx 수정 불필요**:
   - 파일만 추가하면 자동으로 라우트 생성

## 🔄 네비게이션

### 프로그래밍 방식 네비게이션

```typescript
import { useNavigate } from 'react-router-dom'

function MyComponent() {
    const navigate = useNavigate()
    
    const handleClick = () => {
        // 페이지 이동
        navigate('/orders')
        
        // 동적 라우트로 이동
        navigate(`/sample/${id}`)
        
        // 뒤로 가기
        navigate(-1)
        
        // 히스토리 교체 (뒤로가기 불가)
        navigate('/login', { replace: true })
    }
}
```

### Link 컴포넌트 사용

```typescript
import { Link } from 'react-router-dom'

function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/sample/123">Sample 123</Link>
        </nav>
    )
}
```

## 📊 라우트 구조 예시

### 실제 프로젝트 라우트

```typescript
{
    "/": HomePage,
    "/login": LoginPage,
    "/register": RegisterPage,
    "/orders": OrdersPage,
    "/sample": SamplePage,
    "/sample/:id": SampleDetailPage,
}
```

### 중첩 라우트

```
pages/url/
└── dashboard/
    ├── DashboardPage.tsx       # /dashboard
    ├── analytics/
    │   └── AnalyticsPage.tsx   # /dashboard/analytics
    └── settings/
        └── SettingsPage.tsx    # /dashboard/settings
```

## 🎯 Best Practices

### 1. 명확한 폴더 구조

```
// ✅ 좋은 구조
pages/url/
└── products/
    ├── ProductListPage.tsx      # /products
    ├── [id]/
    │   └── ProductDetailPage.tsx  # /products/:id
    └── [id]/
        └── edit/
            └── ProductEditPage.tsx  # /products/:id/edit
```

### 2. 404 페이지 처리

```typescript
// pages/extra/NotFoundPage.tsx
export default function NotFoundPage() {
    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <Link to="/">Go Home</Link>
        </div>
    )
}
```

### 3. 라우트 가드 (Protected Routes)

```typescript
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const isAuthenticated = useAppSelector(state => state.authReducer.isLoggedIn)
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    
    return children
}

// 사용
<Route path="/orders" element={
    <ProtectedRoute>
        <OrdersPage />
    </ProtectedRoute>
} />
```

### 4. 로딩 상태 처리

```typescript
import { Suspense, lazy } from 'react'
import { LazyPage } from '../extra/LazyPage'

const SamplePage = lazy(() => import('./SamplePage'))

function App() {
    return (
        <Suspense fallback={<LazyPage />}>
            <SamplePage />
        </Suspense>
    )
}
```

## 🔧 고급 기능

### Query Parameters

```typescript
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const query = searchParams.get('q')  // ?q=hello
    const page = searchParams.get('page')  // ?page=2
    
    const handleSearch = (newQuery: string) => {
        setSearchParams({ q: newQuery, page: '1' })
    }
}
```

### Route State

```typescript
import { useLocation, useNavigate } from 'react-router-dom'

// 전송
function ProductList() {
    const navigate = useNavigate()
    
    const handleClick = (product) => {
        navigate(`/products/${product.id}`, {
            state: { from: 'list', product }
        })
    }
}

// 수신
function ProductDetail() {
    const location = useLocation()
    const state = location.state  // { from: 'list', product: {...} }
}
```

## 🚀 다음 단계

라우팅을 이해하셨다면:

- **[첫 기능 만들기](../quickstarts/your-first-feature.md)**: 실제로 페이지 만들어보기
- **[프로젝트 구조](./project-structure.md)**: 폴더 구조 다시 확인하기
- **[테마 시스템](./theming.md)**: UI 스타일링 알아보기

---

[← Concepts 목차로 돌아가기](./README.md)

