# 날짜 형식 규칙

## 개요

프로젝트 전반에서 사용하는 날짜 표기 형식에 대한 규칙을 정의합니다.

## 규칙

### 일 단위 날짜

**형식**: `연.월.일(YYYY.MM.DD)`

**예시**:
- `2024.01.15`
- `2024.12.31`

**사용 예시**:
```typescript
import { format } from 'date-fns'
import { DATE_FORMAT } from 'src/shared/constants/dateFormat'

const formattedDate = format(new Date(), DATE_FORMAT.DAY) // '2024.01.15'
```

### 월 단위 날짜

**형식**: `연.월(YYYY.MM)`

**예시**:
- `2024.01`
- `2024.12`

**사용 예시**:
```typescript
import { format } from 'date-fns'
import { DATE_FORMAT } from 'src/shared/constants/dateFormat'

const formattedDate = format(new Date(), DATE_FORMAT.MONTH) // '2024.01'
```

### 날짜 범위 (기간)

**형식**: `시작날짜 ~ 종료날짜`

**예시**:
- 일 단위: `2024.01.01 ~ 2024.01.31`
- 월 단위: `2024.01 ~ 2024.12`

**사용 예시**:
```typescript
import { formatDateRange } from 'src/shared/constants/dateFormat'

// 일 단위 기간
formatDateRange(new Date('2024-01-01'), new Date('2024-01-31'))
// '2024.01.01 ~ 2024.01.31'

// 월 단위 기간
formatDateRange(new Date('2024-01-01'), new Date('2024-12-31'), 'month')
// '2024.01 ~ 2024.12'
```

## 입력 방법

날짜는 다음 방법 중 하나로 입력합니다:

1. **직접 입력**: 사용자가 텍스트 필드에 직접 날짜를 입력
2. **데이터 피커(Date Picker)**: 캘린더 UI를 통해 날짜를 선택

## 상수 사용

프로젝트에서는 `src/shared/constants/dateFormat.ts`에 정의된 상수를 사용합니다:

```typescript
import { DATE_FORMAT, getDateFormatByUnit } from 'src/shared/constants/dateFormat'

// 일 단위 형식
const dayFormat = DATE_FORMAT.DAY // 'yyyy.MM.dd'

// 월 단위 형식
const monthFormat = DATE_FORMAT.MONTH // 'yyyy.MM'

// 단위에 따라 자동 선택
const format = getDateFormatByUnit('day') // 'yyyy.MM.dd'
const format = getDateFormatByUnit('month') // 'yyyy.MM'

// 날짜 범위 포맷팅
const dateRange = formatDateRange(startDate, endDate) // '2024.01.01 ~ 2024.01.31'
const monthRange = formatDateRange(startDate, endDate, 'month') // '2024.01 ~ 2024.12'
```

## 주의사항

- 날짜 형식은 일관되게 유지해야 합니다.
- `date-fns`의 `format` 함수를 사용하여 날짜를 포맷팅합니다.
- 형식 문자열은 `yyyy.MM.dd` 또는 `yyyy.MM` 형식을 사용합니다.
- 공백이 포함된 형식(`yyyy. MM. dd`)은 특수한 경우에만 사용합니다.

## 관련 파일

- `src/shared/constants/dateFormat.ts`: 날짜 형식 상수 정의
- `src/features/orders/constants/orderConstants.ts`: 주문 관련 날짜 형식 (레거시)

