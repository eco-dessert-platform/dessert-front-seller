# URL 구조 정리

이 문서는 Dessert Front Seller 프로젝트의 모든 URL 경로를 정리한 문서입니다.

## 📋 목차

- [인증 관련](#인증-관련)
- [상품관리](#상품관리)
- [주문관리](#주문관리)
- [정산관리](#정산관리)
- [통계](#통계)
- [판매자 정보](#판매자-정보)
- [기타](#기타)

---

## 인증 관련

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/login` | `src/pages/url/login/LoginPage.tsx` | 로그인 페이지 | 없음 |
| `/register` | `src/pages/url/register/RegisterPage.tsx` | 회원가입 페이지 | 없음 |
| `/register/store` | `src/pages/url/register/store/StoreVerificationPage.tsx` | 매장 인증 페이지 | 없음 |
| `/register/success` | `src/pages/url/register/success/RegisterSuccessPage.tsx` | 회원가입 완료 페이지 | 없음 |
| `/callback/:provider` | `src/pages/url/callback/CallbackPage.tsx` | 소셜 로그인 콜백 페이지 | 없음 |

---

## 상품관리

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/products` | `src/pages/url/products/ProductsPage.tsx` | 상품 조회 / 수정 페이지 | 있음 |
| `/products/register` | `src/pages/url/products/register/ProductRegisterPage.tsx` | 상품등록 페이지 | 있음 |
| `/products/:id/edit` | `src/pages/url/products/[id]/edit/ProductEditPage.tsx` | 상품 수정 페이지 (동적 라우트) | 있음 |
| `/admin/products` | `src/pages/url/admin/products/ProductsPage.tsx` | 관리자 상품 페이지 (기존) | 있음 |

---

## 주문관리

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/orders` | `src/pages/url/orders/OrdersPage.tsx` | 주문내역 페이지 | 있음 |
| `/orders/completed` | `src/pages/url/orders/completed/OrderCompletePage.tsx` | 완료 주문내역 페이지 | 있음 |

---

## 정산관리

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/settlements` | `src/pages/url/settlements/SettlementsPage.tsx` | 정산내역 페이지 | 있음 |
| `/settlements/charge` | `src/pages/url/settlements/charge/ChargeStatusPage.tsx` | 충전금 현황 페이지 | 있음 |
| `/settlements/pending` | `src/pages/url/settlements/pending/PendingPaymentsPage.tsx` | 지급 보류 내역 페이지 | 있음 |
| `/settlements/vat-report` | `src/pages/url/settlements/vat-report/VatReportPage.tsx` | 부가세 신고내역 페이지 | 있음 |
| `/settlements/tax-invoice` | `src/pages/url/settlements/tax-invoice/TaxInvoicePage.tsx` | 세금계산서 조회 페이지 | 있음 |

---

## 통계

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/statistics/sales` | `src/pages/url/statistics/sales/SalesAnalysisPage.tsx` | 판매분석 페이지 | 있음 |

---

## 판매자 정보

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/seller/profile` | `src/pages/url/seller/profile/SellerProfilePage.tsx` | 판매자 정보 변경 페이지 | 있음 |

---

## 기타

| URL | 파일 경로 | 설명 | 레이아웃 |
|-----|-----------|------|----------|
| `/` | `src/pages/HomePage.tsx` | 홈 페이지 | 있음 |
| `/test` | `src/pages/test.tsx` | 테스트 페이지 | 없음 |
| `/sample` | `src/pages/url/sample/SamplePage.tsx` | 샘플 페이지 | 있음 |
| `/sample/:id` | `src/pages/url/sample/[id]/SampleIdPage.tsx` | 샘플 상세 페이지 (동적 라우트) | 있음 |

---

## 📝 메뉴 구조별 URL 매핑

### 상품관리
- **상품등록**: `/products/register`
- **상품 조회 / 수정**: `/products` (조회), `/products/:id/edit` (수정)

### 주문관리
- **주문내역**: `/orders`
- **완료 주문내역**: `/orders/completed`

### 정산관리
- **정산내역**: `/settlements`
- **충전금 현황**: `/settlements/charge`
- **지급 보류 내역**: `/settlements/pending`
- **부가세 신고내역**: `/settlements/vat-report`
- **세금계산서 조회**: `/settlements/tax-invoice`

### 통계
- **판매분석**: `/statistics/sales`

### 판매자 정보
- **판매자 정보 변경**: `/seller/profile`

---

## 🔧 라우팅 규칙

### 파일 시스템 기반 라우팅

이 프로젝트는 **파일 시스템 기반 동적 라우팅**을 사용합니다.

- `src/pages/url/` 폴더 내의 모든 `**/*.tsx` 파일이 자동으로 라우트로 등록됩니다.
- 폴더 구조가 URL 구조를 반영합니다.
- `[param]` 형식의 폴더는 동적 라우트(`:param`)로 변환됩니다.

### 레이아웃 적용 규칙

- 기본적으로 모든 페이지는 `BgrLayout`이 적용됩니다.
- 다음 페이지들은 레이아웃이 적용되지 않습니다:
  - `/login`
  - `/register`
  - `/register/store`
  - `/register/success`

### 동적 라우트 사용 예시

```typescript
// /products/:id/edit 페이지에서
import { useParams } from 'react-router'

const ProductEditPage = () => {
    const { id } = useParams<{ id: string }>()
    // id 값 사용
}
```

---

## 📌 참고사항

- 모든 페이지 컴포넌트는 `default export`를 사용해야 합니다.
- 페이지 컴포넌트 파일명은 `Page` 접미사를 권장합니다 (예: `ProductsPage.tsx`).
- URL은 RESTful 규칙을 따르며, 소문자와 하이픈(`-`)을 사용합니다.
- 동적 라우트는 대괄호(`[param]`) 형식의 폴더명을 사용합니다.

---

**마지막 업데이트**: 2024년

