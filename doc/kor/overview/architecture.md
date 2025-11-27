# 아키텍처 개요

## 📐 전체 아키텍처

이 프로젝트는 **Feature-Sliced Design (FSD)** 패턴을 기반으로 설계되었습니다.

```
┌────────────────────────────────────────┐
│           Application Layer            │
│  (app/ - 전역 설정, 스토어, 라우터)     │
└────────────────────────────────────────┘
                  ↓
┌────────────────────────────────────────┐
│            Pages Layer                 │
│  (pages/ - 라우트 기반 페이지)         │
└────────────────────────────────────────┘
                  ↓
┌────────────────────────────────────────┐
│           Features Layer               │
│  (features/ - 비즈니스 기능 단위)      │
└────────────────────────────────────────┘
                  ↓
┌────────────────────────────────────────┐
│            Shared Layer                │
│  (shared/ - 공통 컴포넌트, 유틸)       │
└────────────────────────────────────────┘
```

## 🏗️ Feature-Sliced Design (FSD)

### FSD란?

Feature-Sliced Design은 프론트엔드 애플리케이션을 **계층(Layer)**과 **슬라이스(Slice)**로 구조화하는 아키텍처 방법론입니다.

### 핵심 원칙

1. **계층적 구조**: 각 계층은 자신보다 하위 계층만 의존
2. **기능별 분리**: 비즈니스 기능 단위로 코드 분리
3. **명확한 책임**: 각 폴더의 역할이 명확하게 정의됨
4. **높은 응집도**: 관련된 코드를 한 곳에 모음
5. **낮은 결합도**: 다른 기능과의 의존성 최소화

## 📁 프로젝트 폴더 구조

```
src/
├── app/                    # 애플리케이션 레이어
│   ├── api/                # 글로벌 API 클라이언트
│   ├── router/             # 라우터 설정 및 유틸
│   └── store/              # Redux 스토어 설정
│       └── redux/          # Redux 유틸리티
├── assets/                 # 정적 리소스
│   ├── fonts/              # 폰트 파일
│   ├── icons/              # 아이콘
│   ├── images/             # 이미지
│   └── locales/            # 다국어 파일
├── features/               # 기능 레이어
│   └── [feature]/          # 기능별 폴더
│       ├── components/     # 기능 전용 컴포넌트
│       ├── [Feature].tsx   # 메인 컴포넌트
│       ├── [feature]Reducer.ts  # Redux reducer
│       ├── [feature]API.tsx     # API 함수
│       └── [feature]Type.ts     # 타입 정의
├── pages/                  # 페이지 레이어
│   └── url/                # 라우트 기반 페이지
│       └── [route]/        # 동적 라우트 폴더
├── shared/                 # 공유 레이어
│   ├── components/         # 공통 UI 컴포넌트
│   ├── layout/             # 레이아웃 컴포넌트
│   ├── lib/                # 외부 라이브러리 래퍼
│   └── utils/              # 유틸리티 함수
├── stories/                # Storybook 문서
└── styles/                 # 전역 스타일
```

## 🔄 데이터 흐름

### Redux 기반 상태 관리 흐름

```
┌─────────────┐
│  Component  │ ← useAppSelector로 상태 구독
└──────┬──────┘
       │ dispatch(action)
       ↓
┌─────────────┐
│   Action    │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│    Saga     │ ← 비동기 액션 감지
└──────┬──────┘
       │ call(api)
       ↓
┌─────────────┐
│  API Server │
└──────┬──────┘
       │ response
       ↓
┌─────────────┐
│    Saga     │ ← Success/Fail 액션 발행
└──────┬──────┘
       │ put(action)
       ↓
┌─────────────┐
│   Reducer   │ ← 상태 업데이트
└──────┬──────┘
       │ state change
       ↓
┌─────────────┐
│  Component  │ ← 자동 리렌더링
└─────────────┘
```

### 핵심 요소

1. **Action**: 순수한 객체, 의도만 표현
2. **Saga**: 비동기 로직 및 부수 효과 처리
3. **Reducer**: 순수 함수, 상태 업데이트만 담당
4. **Component**: UI 렌더링만 담당

## 🎯 설계 원칙

### 1. 관심사의 분리 (Separation of Concerns)

각 레이어와 모듈은 명확한 책임을 가집니다:

- **app/**: 앱 전체 설정 및 초기화
- **features/**: 비즈니스 로직
- **pages/**: 라우팅 및 페이지 조합
- **shared/**: 재사용 가능한 요소

### 2. 단방향 데이터 흐름 (Unidirectional Data Flow)

```
User Interaction → Action → Saga → API → Reducer → State → UI
```

모든 상태 변화는 예측 가능한 단방향 흐름을 따릅니다.

### 3. 타입 안전성 (Type Safety)

TypeScript를 활용하여 컴파일 타임에 에러를 방지합니다:

```typescript
// 타입이 자동으로 추론됨
const data = useAppSelector((state) => state.sampleReducer.pokemon)
// data의 타입: AsyncState<{ name: string; id: number }>
```

### 4. 테스트 가능성 (Testability)

각 계층이 독립적으로 테스트 가능합니다:

- **Reducer**: 순수 함수로 쉽게 테스트
- **Saga**: 제너레이터로 단계별 테스트
- **Component**: React Testing Library로 단위 테스트

## 🔌 확장성

### 새로운 기능 추가

1. `features/` 폴더에 새 기능 폴더 생성
2. Reducer, API, 컴포넌트 작성
3. Store에 등록
4. 페이지에서 사용

각 기능이 독립적이므로 다른 기능에 영향을 주지 않고 확장 가능합니다.

### 코드 분할 (Code Splitting)

React Router의 레이지 로딩을 통해 필요한 코드만 로드:

```typescript
const SamplePage = lazy(() => import('./pages/url/sample/SamplePage'))
```

## 📊 아키텍처 장점

### ✅ 명확한 구조

- 새로운 팀원이 빠르게 코드베이스 파악 가능
- 파일 위치가 예측 가능

### ✅ 높은 유지보수성

- 기능별로 코드가 분리되어 수정이 용이
- 의존성이 명확하여 영향 범위 파악 가능

### ✅ 확장 가능성

- 새로운 기능 추가 시 기존 코드 영향 최소화
- 모듈별 독립적 개발 가능

### ✅ 테스트 용이성

- 각 레이어를 독립적으로 테스트
- Mock 객체 생성이 간단

## 🚀 다음 단계

아키텍처를 이해하셨다면:

- **[기술 스택](./tech-stack.md)** - 사용된 기술 자세히 알아보기
- **[프로젝트 구조](../concepts/project-structure.md)** - 폴더 구조 상세 가이드
- **[상태 관리](../concepts/state-management.md)** - Redux 아키텍처 이해하기

---

[← Overview 목차로 돌아가기](./README.md)
