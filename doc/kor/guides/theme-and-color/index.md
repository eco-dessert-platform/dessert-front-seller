# 테마 및 색상 설정

이 문서는 프로젝트의 테마 및 색상 시스템을 설명합니다.

## 📚 목차
- [개요](#개요)
- [CSS 아키텍처](#css-아키텍처)
- [Shadcn 테마 시스템](#shadcn-테마-시스템)
- [index.html 테마 초기화](#indexhtml-테마-초기화)
- [CSS 전처리 및 후처리](#css-전처리-및-후처리)
- [색상 커스터마이징](#색상-커스터마이징)

## 📖 관련 문서
- [새로고침 시 CSS 동작 순서](./css-loading-sequence.md) - 페이지 로드 시 테마 적용 프로세스 상세 설명

---

## 개요

- **다크모드/라이트모드** 지원
- **TailwindCSS v4** 기반의 유틸리티 스타일링
- **Shadcn UI** 디자인 시스템 통합
- **CSS 변수** 기반의 동적 테마 변경
- **OKLCH 색상 공간** 사용으로 더 나은 색상 인식

---

## CSS 아키텍처

### 📁 파일 구조

프로젝트의 스타일은 다음과 같은 계층 구조로 구성됩니다:

```
src/styles/index.css (메인 엔트리)
├── @import 'tailwindcss'           # TailwindCSS v4 코어
├── @import 'tw-animate-css'        # 애니메이션 라이브러리
├── typography.pcss                 # 폰트 정의 (Pretendard)
├── shadcn.pcss                     # Shadcn UI 테마 변수
├── variables.pcss                  # 커스텀 디자인 토큰
└── base.pcss                       # 기본 스타일 및 전역 설정
```

### 🎨 주요 스타일 파일 설명

#### **index.css**
모든 스타일의 진입점입니다. 빌드 시 Vite가 이 파일을 처리합니다.

```css
@import 'tailwindcss';
@import 'tw-animate-css';
@import 'src/styles/typography.pcss';
@import 'src/shared/lib/shadcn/styles/shadcn.pcss';
@import './variables.pcss';
@import './base.pcss';
```

#### **base.pcss**
전역 스타일과 테마 전환 애니메이션을 정의합니다:

- `@layer base` 레이어에서 기본 스타일 정의
- 모든 요소에 `transition-colors` 적용 (300ms)
- `body.preload` 클래스로 초기 로드 시 깜빡임 방지
- `.theme-instant` 클래스로 새로고침 시 전환 효과 제거

```css
@layer base {
    * {
        @apply border-border outline-ring/50 transition-colors duration-300;
    }
    body {
        @apply bg-background text-foreground font-pretendard min-h-[100dvh];
    }
}
```

#### **variables.pcss**
프로젝트 고유의 디자인 토큰을 정의합니다:

- 브랜드 컬러 (Primary, Gray, Kakao 등)
- 타이포그래피 크기 및 행간
- 커스텀 애니메이션 (`bell-shake`, `heart-pop` 등)

```css
@theme {
    --color-primary-500: #f04c28;
    --text-14: 14px;
    --animate-heart-pop: heart-pop 0.3s ease-in-out;
}
```

#### **typography.pcss**
Pretendard 폰트를 정의하고 로드합니다:

- WOFF2 우선, WOFF 폴백 전략
- 100~900 폰트 웨이트 지원
- `font-display: swap`으로 텍스트 렌더링 최적화

---

## Shadcn 테마 시스템

### 🎨 Shadcn 색상 변수

`src/shared/lib/shadcn/styles/shadcn.pcss` 파일에서 관리됩니다.

#### **라이트 모드 (`:root`)**
```css
:root {
    --background: oklch(1 0 0);
    --foreground: oklch(0.145 0 0);
    --primary: oklch(0.205 0 0);
    --primary-foreground: oklch(0.985 0 0);
    --border: oklch(0.922 0 0);
    /* ... 기타 변수 */
}
```

#### **다크 모드 (`.dark`)**
```css
.dark {
    --background: oklch(0.145 0 0);
    --foreground: oklch(0.985 0 0);
    --primary: oklch(0.922 0 0);
    --border: oklch(1 0 0 / 10%);
    /* ... 기타 변수 */
}
```

### 📦 Shadcn 컴포넌트 설정

`components.json` 파일에서 Shadcn CLI 설정을 관리합니다:

```json
{
    "style": "new-york",
    "tailwind": {
        "css": "src/shared/lib/shadcn/styles/shadcn.pcss",
        "baseColor": "neutral",
        "cssVariables": true
    }
}
```

### 🎯 지원하는 색상 변수 그룹

`colorConstants.tsx`에서 정의된 변수들:

- **BACKGROUND & FOREGROUND**: 배경 및 전경 색상
- **CARD**: 카드 컴포넌트 색상
- **POPOVER**: 팝오버 색상
- **PRIMARY/SECONDARY/MUTED/ACCENT**: 주요 UI 색상
- **DESTRUCTIVE/BORDER/INPUT/RING**: 상태 및 입력 요소 색상
- **CHARTS**: 차트 전용 색상 팔레트
- **SIDEBAR**: 사이드바 전용 색상
- **WARNING**: 경고 상태 색상

---

## index.html 테마 초기화

### ⚡ 즉시 테마 적용 스크립트

새로고침 시 깜빡임을 방지하기 위해 `<head>` 내부에 인라인 스크립트를 배치합니다:

```html
<html lang="en" class="theme-instant">
<head>
    <script>
        ;(() => {
            try {
                // localStorage에서 테마 설정 읽기
                const theme = localStorage.getItem('vite-ui-theme') || 'system'
                const vars = JSON.parse(
                    localStorage.getItem('vite-ui-theme-vars') || '{}',
                )
                
                // 시스템 다크모드 설정 확인
                const prefersDark = window.matchMedia(
                    '(prefers-color-scheme: dark)',
                ).matches
                
                // 최종 테마 결정
                const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
                
                // HTML 클래스 즉시 적용
                document.documentElement.classList.add(isDark ? 'dark' : 'light')
                
                // 배경색 즉시 적용 (FOUC 방지)
                const bg = (isDark ? vars.darkVars : vars.lightVars)?.['--background']
                document.documentElement.style.backgroundColor =
                    bg || (isDark ? 'oklch(0.145 0 0)' : '')
            } catch (e) {
                console.warn('Early theme apply failed', e)
            }
        })()
    </script>
</head>
<body class="preload">
    <div id="root"></div>
</body>
</html>
```

### 🔑 주요 동작

1. **동기 실행**: 렌더링 블로킹 방식으로 즉시 실행
2. **localStorage 읽기**: 사용자의 이전 테마 설정 복원
3. **system 테마 지원**: OS 설정에 따라 자동 전환
4. **FOUC 방지**: 배경색을 즉시 설정하여 플래시 현상 제거
5. **폴백 처리**: 에러 발생 시 기본값으로 처리

> 💡 **상세한 동작 순서는 [CSS 로딩 시퀀스 문서](./css-loading-sequence.md)를 참고하세요.**

---

## CSS 전처리 및 후처리

### 🛠 빌드 파이프라인

이 프로젝트는 **Vite** + **TailwindCSS v4**를 사용합니다.

```
소스 코드 (.pcss, .css)
    ↓
TailwindCSS Vite Plugin (@tailwindcss/vite)
    ↓ (CSS 처리)
Lightning CSS (내장)
    ↓ (최적화, 벤더 프리픽스, 압축)
최종 번들 (dist/assets/*.css)
```

### ⚡ TailwindCSS v4 특징

- **PostCSS 불필요**: Lightning CSS 기반으로 더 빠른 빌드
- **Native CSS**: `@import`, `@theme` 등 표준 CSS 구문 사용
- **자동 최적화**: 사용하지 않는 스타일 제거 (Tree-shaking)
- **CSS 변수 우선**: `@theme`으로 정의한 변수를 자동 생성

### 📦 관련 패키지

```json
{
    "devDependencies": {
        "@tailwindcss/vite": "^4.0.17",
        "tailwindcss": "^4.0.17",
        "tw-animate-css": "^1.3.4"
    }
}
```

### 🔧 Vite 설정 예시

```typescript
// vite.config.ts
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        tailwindcss(),
        // ... 기타 플러그인
    ]
})
```

---

## 색상 커스터마이징

### 🎨 Shadcn 테마 생성기 사용

1. [shadcn-ui-theme-generator](https://zippystarter.com/tools/shadcn-ui-theme-generator)에서 원하는 색상 선택
2. 생성된 CSS 변수를 `src/shared/lib/shadcn/styles/shadcn.pcss`에 붙여넣기
3. 라이트/다크 모드 각각 설정 가능

### 🔄 동적 테마 변경

애플리케이션 실행 중에도 `colorConstants.tsx`와 Redux를 통해 테마를 동적으로 변경할 수 있습니다.

```typescript
// 테마 색상 그룹 예시
export const colorGroups = [
    {
        label: 'BACKGROUND & FOREGROUND',
        keys: ['--background', '--foreground'],
    },
    {
        label: 'PRIMARY',
        keys: ['--primary', '--primary-foreground'],
    },
    // ...
]
```

### 💡 커스텀 색상 추가

`variables.pcss`에서 프로젝트 고유의 색상을 정의할 수 있습니다:

```css
@theme {
    --color-brand-primary: #f04c28;
    --color-kakao: #fee500;
}
```

그런 다음 TailwindCSS 클래스로 사용:

```html
<div class="bg-brand-primary text-white">
    브랜드 컬러 적용
</div>
```

---

## 📚 참고 자료

- [TailwindCSS v4 문서](https://tailwindcss.com/docs)
- [Shadcn UI 문서](https://ui.shadcn.com/)
- [OKLCH 색상 공간](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)
- [Lightning CSS](https://lightningcss.dev/)

