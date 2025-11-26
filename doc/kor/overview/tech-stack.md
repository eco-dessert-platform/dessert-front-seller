# 기술 스택

이 프로젝트에서 사용하는 기술 스택과 각 기술을 선택한 이유를 설명합니다.

## 🎯 핵심 기술

### React 19
**역할**: UI 라이브러리

**선택 이유**:
- 컴포넌트 기반 아키텍처로 재사용성 향상
- 강력한 생태계와 커뮤니티 지원
- React Server Components, Actions 등 최신 기능 지원

**버전**: `^19.0.0`

---

### TypeScript 5
**역할**: 타입 시스템

**선택 이유**:
- 컴파일 타임 타입 검증으로 런타임 에러 방지
- 자동완성과 인텔리센스로 개발 생산성 향상
- 대규모 프로젝트에서 코드 유지보수성 향상

**버전**: `^5.7.2`

---

## 🔄 상태 관리

### Redux Toolkit 2.6.1
**역할**: 상태 관리 라이브러리

**선택 이유**:
- Redux 보일러플레이트 최소화
- createSlice, createAsyncThunk 등 편리한 API
- Redux DevTools 통합으로 디버깅 용이

**대안 고려**: 
- Zustand: 작은 프로젝트에 적합
- Recoil: 아직 불안정

**선택한 이유**: 
- 복잡한 비동기 로직 처리에 유리
- 예측 가능한 상태 흐름
- Time-travel debugging 지원

---

### Redux Saga 1.3.0
**역할**: 비동기 미들웨어

**선택 이유**:
- 제너레이터 기반으로 복잡한 비동기 플로우 관리
- 취소, 재시도, 디바운스 등 고급 기능 지원
- 테스트 가능성 우수

**대안 고려**:
- Redux Thunk: 간단하지만 복잡한 로직 처리 어려움
- RTK Query: REST API에만 최적화

**선택한 이유**:
- Effect를 통한 강력한 비동기 제어
- takeLatest, debounce 등 유용한 헬퍼 제공

---

## 🎨 UI & 스타일링

### TailwindCSS 4.0.17
**역할**: 유틸리티 CSS 프레임워크

**선택 이유**:
- 유틸리티 클래스로 빠른 스타일링
- Lightning CSS 기반으로 빠른 빌드
- 사용하지 않는 스타일 자동 제거 (Tree-shaking)

**v4 주요 변경**:
- PostCSS 불필요 (Lightning CSS 기반)
- Native CSS 구문 사용 (`@import`, `@theme`)
- 더 빠른 빌드 속도

---

### shadcn/ui
**역할**: 컴포넌트 라이브러리

**선택 이유**:
- 복사 가능한 컴포넌트 (패키지 의존성 없음)
- Radix UI 기반으로 접근성 우수
- TailwindCSS와 완벽한 통합

**대안 고려**:
- MUI: 무겁고 커스터마이징 어려움
- Ant Design: 중국 스타일 기본 테마

---

### Framer Motion
**역할**: 애니메이션 라이브러리

**선택 이유**:
- 선언적 애니메이션 API
- React와 완벽한 통합
- 제스처, 레이아웃 애니메이션 지원

---

## 🛣️ 라우팅

### React Router 7
**역할**: 클라이언트 사이드 라우팅

**선택 이유**:
- React 표준 라우팅 라이브러리
- v7에서 개선된 로더, 액션 API
- 타입 안전한 라우팅

**프로젝트 적용**:
- 파일 시스템 기반 동적 라우팅
- 레이지 로딩으로 코드 스플리팅
- 라우트 기반 데이터 fetching

---

## ⚡ 빌드 도구

### Vite 6
**역할**: 빌드 도구 및 개발 서버

**선택 이유**:
- 빠른 HMR (Hot Module Replacement)
- ES 모듈 기반으로 빠른 개발 서버
- Rollup 기반 최적화된 프로덕션 빌드

**대안 고려**:
- webpack: 느린 빌드 속도
- Parcel: 플러그인 생태계 부족

---

## 🧪 테스팅

### Vitest 3
**역할**: 단위 테스트

**선택 이유**:
- Vite와 완벽한 통합
- Jest 호환 API
- 빠른 테스트 실행

---

### Cypress 14
**역할**: E2E 테스트

**선택 이유**:
- 실제 브라우저에서 테스트
- 시각적 디버깅 도구
- 타임 트래블 기능

---

### Playwright
**역할**: 크로스 브라우저 테스트

**선택 이유**:
- Chromium, Firefox, WebKit 지원
- 빠른 실행 속도
- API 자동화 가능

---

### Storybook 8
**역할**: 컴포넌트 문서화 및 개발

**선택 이유**:
- 독립된 환경에서 컴포넌트 개발
- 인터랙티브 문서 자동 생성
- 다양한 상태 시뮬레이션

---

## 🌐 다국어

### i18next
**역할**: 국제화 (i18n)

**선택 이유**:
- 가장 성숙한 React i18n 라이브러리
- 동적 언어 전환 지원
- 네임스페이스 기반 코드 스플리팅

---

## 🔧 개발 도구

### ESLint
**역할**: 정적 코드 분석

**선택 이유**:
- 코드 품질 유지
- 잠재적 버그 사전 방지
- 팀 코딩 컨벤션 통일

---

### Prettier
**역할**: 코드 포맷터

**선택 이유**:
- 일관된 코드 스타일
- IDE 통합 지원
- TailwindCSS 클래스 자동 정렬 (prettier-plugin-tailwindcss)

---

## 📦 패키지 관리

### Yarn 4
**역할**: 패키지 매니저

**선택 이유**:
- Plug'n'Play로 빠른 설치
- Workspace 지원
- Zero-install 가능

**설정**:
- `.yarnrc.yml`에 버전 명시
- Corepack으로 자동 버전 관리

---

## 📊 기술 스택 요약

| 카테고리 | 기술 | 버전 |
|---------|------|------|
| **프레임워크** | React | 19 |
| **언어** | TypeScript | 5 |
| **상태관리** | Redux Toolkit | 2.6 |
| **미들웨어** | Redux-Saga | 1.3 |
| **라우팅** | React Router | 7 |
| **스타일링** | TailwindCSS | 4 |
| **UI 라이브러리** | shadcn/ui | latest |
| **빌드 도구** | Vite | 6 |
| **테스트** | Vitest / Cypress / Playwright | 3 / 14 / latest |
| **문서화** | Storybook | 8 |
| **다국어** | i18next | latest |
| **애니메이션** | Framer Motion | latest |
| **코드 품질** | ESLint / Prettier | latest |
| **패키지 관리** | Yarn | 4 |

## 🔗 외부 문서

각 기술에 대한 자세한 내용은 공식 문서를 참고하세요:

- [React 공식 문서](https://react.dev/)
- [TypeScript 공식 문서](https://www.typescriptlang.org/)
- [Redux Toolkit 공식 문서](https://redux-toolkit.js.org/)
- [Redux Saga 공식 문서](https://redux-saga.js.org/)
- [TailwindCSS 공식 문서](https://tailwindcss.com/)
- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Vite 공식 문서](https://vitejs.dev/)
- [React Router 공식 문서](https://reactrouter.com/)

---

**다음 단계**: [빠른 시작 가이드](../quickstarts/README.md)

[← Overview 목차로 돌아가기](./README.md)

