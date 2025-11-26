# 프로젝트 소개

## 📌 프로젝트 개요

**dessert-front-seller**는 React + TypeScript 기반의 디저트 셀러를 위한 프론트엔드 애플리케이션입니다.

현대적인 프론트엔드 개발 환경을 제공하며, 빠른 개발, 확장성, 유지보수를 최우선으로 고려하여 설계되었습니다.

## 🎯 프로젝트 목적

이 프로젝트는 다음과 같은 목표를 가지고 있습니다:

- **빠른 프로젝트 시작**: 모든 필수 설정이 완료된 상태로 즉시 개발 시작 가능
- **확장 가능한 아키텍처**: Feature-Sliced Design(FSD) 패턴을 통한 체계적인 구조
- **타입 안정성**: TypeScript를 활용한 강력한 타입 시스템
- **현대적 개발 환경**: 최신 기술 스택과 개발 도구 통합
- **테스트 가능성**: 다양한 테스트 프레임워크 지원 (Vitest, Cypress, Playwright)

## ✨ 주요 특징

### 1. 🏗️ 견고한 아키텍처
- **Feature-Sliced Design(FSD)** 패턴 기반 폴더 구조
- 명확한 계층 분리 (app, features, pages, shared)
- 비즈니스 로직과 UI의 분리

### 2. 🔄 강력한 상태관리
- **Redux Toolkit** 기반의 현대적 상태 관리
- **Redux-Saga**를 통한 복잡한 비동기 로직 처리
- **reduxMaker** 유틸리티로 보일러플레이트 최소화

### 3. 🎨 모던한 UI/UX
- **TailwindCSS 4**로 빠른 스타일링
- **shadcn/ui** 컴포넌트 라이브러리 통합
- **Framer Motion**으로 부드러운 애니메이션
- **Lucide-react** 아이콘 시스템

### 4. 🌐 글로벌 지원
- **i18next** 기반 다국어 지원 시스템
- 언어 자동 감지 및 동적 전환

### 5. 🧪 포괄적인 테스팅
- **Vitest 3**: 빠른 단위 테스트
- **Cypress 14**: 신뢰할 수 있는 E2E 테스트
- **Playwright**: 크로스 브라우저 테스트
- **Storybook 8**: 컴포넌트 문서화 및 개발

### 6. ⚡ 최적화된 개발 환경
- **Vite 6**: 초고속 번들러 및 HMR(Hot Module Replacement)
- **ESLint** & **Prettier**: 일관된 코드 스타일
- **TypeScript 5**: 최신 타입 시스템 기능

### 7. 🛣️ 동적 라우팅
- **React Router v7** 기반
- 파일 시스템 기반 동적 라우팅 지원
- 레이지 로딩 및 코드 스플리팅

## 💡 프로젝트 철학

이 프로젝트는 다음과 같은 원칙을 따릅니다:

1. **타입 안정성 우선**: 런타임 에러를 컴파일 타임에 잡기
2. **명확한 구조**: 코드의 위치가 명확하고 예측 가능하게
3. **재사용성**: DRY(Don't Repeat Yourself) 원칙 준수
4. **테스트 가능성**: 모든 코드가 테스트 가능하도록 설계
5. **개발자 경험**: 빠른 개발과 즐거운 경험 제공

## 🎓 학습 곡선

### 선행 지식
- React 기본 개념 (컴포넌트, Hooks 등)
- TypeScript 기본 문법
- Redux 상태 관리 개념

### 권장 학습 순서
1. [빠른 시작](../quickstarts/README.md) - 프로젝트 설치 및 실행
2. [프로젝트 구조](../concepts/project-structure.md) - 폴더 구조 파악
3. [상태 관리](../concepts/state-management.md) - Redux 구조 이해
4. [How-to 가이드](../how-to-guides/README.md) - 실전 개발 시작

## 📞 문의 및 기여

프로젝트에 대한 문의사항이나 개선 제안이 있으시면 GitHub Issues를 이용해주세요.

---

**다음 단계**: [아키텍처 개요](./architecture.md) | [기술 스택](./tech-stack.md)

[← Overview 목차로 돌아가기](./README.md)

