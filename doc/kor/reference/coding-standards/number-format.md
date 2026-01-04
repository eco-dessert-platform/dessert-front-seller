# 숫자 형식 규칙

## 개요

프로젝트 전반에서 사용하는 숫자 표기 형식에 대한 규칙을 정의합니다.

## 규칙

### 천 단위 콤마 구분

**규칙**: 천 단위마다 콤마(,)로 구분하여 표기

**예시**:
- `1,000`
- `12,345`
- `1,234,567`
- `123,456,789`

## 사용 방법

### 기본 숫자 포맷팅

```typescript
import { formatNumber } from 'src/shared/constants/numberFormat'

// 정수 포맷팅
formatNumber(1000) // '1,000'
formatNumber(1234567) // '1,234,567'

// 문자열도 변환 가능
formatNumber('1000') // '1,000'
```

### 소수점 포함 숫자 포맷팅

```typescript
import { formatNumberWithDecimal } from 'src/shared/constants/numberFormat'

// 기본 (소수점 제거)
formatNumberWithDecimal(1000.5) // '1,001' (반올림)

// 소수점 유지
formatNumberWithDecimal(1000.5, { 
    maximumFractionDigits: 2 
}) // '1,000.50'

// 최소 소수점 자릿수 지정
formatNumberWithDecimal(1000, { 
    minimumFractionDigits: 2 
}) // '1,000.00'
```

### 금액 포맷팅

```typescript
import { formatCurrency, formatCurrencyRange } from 'src/shared/constants/numberFormat'

// 단일 금액
formatCurrency(1000) // '1,000원'
formatCurrency(1234567) // '1,234,567원'

// 금액 범위
formatCurrencyRange(1000, 10000) // '1,000원 ~ 10,000원'
```

## Intl.NumberFormat 사용

프로젝트에서는 `Intl.NumberFormat` API를 사용하여 숫자를 포맷팅합니다. 이는 브라우저 내장 API로, 로케일에 따라 자동으로 적절한 형식을 적용합니다.

### 직접 사용 예시

```typescript
// 한국 로케일 (기본)
new Intl.NumberFormat('ko-KR').format(1000) // '1,000'

// 다른 로케일
new Intl.NumberFormat('en-US').format(1000) // '1,000'
new Intl.NumberFormat('ja-JP').format(1000) // '1,000'
```

## 주의사항

- 숫자 형식은 일관되게 유지해야 합니다.
- 모든 숫자 표시에는 천 단위 콤마를 사용합니다.
- `Intl.NumberFormat` API를 사용하여 로케일별 형식을 지원합니다.
- 문자열로 된 숫자도 자동으로 변환하여 포맷팅합니다.
- `NaN` 값이 입력된 경우 원본 값을 문자열로 반환합니다.

## 관련 파일

- `src/shared/constants/numberFormat.ts`: 숫자 형식 유틸리티 함수
- `src/shared/components/table/options/cellFormatter.tsx`: 테이블 셀 포맷터 (통화 형식 포함)
- `src/features/orders/utils/orderUtils.ts`: 주문 관련 유틸리티 (금액 포맷팅)

