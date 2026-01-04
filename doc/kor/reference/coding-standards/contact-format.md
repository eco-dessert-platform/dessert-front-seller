# 연락처 및 이메일 형식 규칙

## 개요

프로젝트 전반에서 사용하는 연락처 및 이메일 표기 형식에 대한 규칙을 정의합니다.

## 규칙

### 연락처 (전화번호)

**규칙**: 하이픈(-)으로 구분하여 표기

**형식**:
- 휴대전화: `010-1234-5678` (11자리)
- 서울 지역번호: `02-1234-5678` (9-10자리)
- 기타 지역번호: `031-123-4567` (10자리)
- 특수번호: `1588-1234` (8자리)

**예시**:
- `010-1234-5678`
- `02-1234-5678`
- `031-123-4567`
- `1588-1234`

**사용 예시**:
```typescript
import { formatPhoneNumber } from 'src/shared/constants/contactFormat'

// 휴대전화
formatPhoneNumber('01012345678') // '010-1234-5678'
formatPhoneNumber('01012345678', 'mobile') // '010-1234-5678'

// 일반전화
formatPhoneNumber('0212345678', 'landline') // '02-1234-5678'
formatPhoneNumber('15881234', 'landline') // '1588-1234'
```

**주의사항**:
- 입력 시에는 하이픈 없이 숫자만 입력받습니다.
- 표시 시에는 자동으로 하이픈을 추가하여 포맷팅합니다.

### 이메일

**규칙**: 표준 이메일 형식 사용 (`local@domain`)

**형식**: `사용자명@도메인명`

**예시**:
- `user@example.com`
- `test.user@example.co.kr`

**사용 예시**:
```typescript
import { formatEmail, isValidEmail } from 'src/shared/constants/contactFormat'

// 이메일 포맷팅 (소문자 변환 및 공백 제거)
formatEmail('  User@Example.COM  ') // 'user@example.com'

// 이메일 유효성 검증
isValidEmail('user@example.com') // true
isValidEmail('invalid-email') // false
```

**주의사항**:
- 이메일은 소문자로 변환하여 저장 및 표시합니다.
- 이메일 입력 시 유효성 검증을 수행합니다.
- 이메일 형식: `local@domain` (local과 domain은 필수, 최소 하나의 점 포함)

## 상수 사용

프로젝트에서는 `src/shared/constants/contactFormat.ts`에 정의된 함수를 사용합니다:

```typescript
import { 
    formatPhoneNumber, 
    formatEmail, 
    isValidEmail 
} from 'src/shared/constants/contactFormat'

// 전화번호 포맷팅
const phone = formatPhoneNumber('01012345678') // '010-1234-5678'

// 이메일 포맷팅
const email = formatEmail('User@Example.COM') // 'user@example.com'

// 이메일 검증
const isValid = isValidEmail('user@example.com') // true
```

## 주의사항

- 연락처는 입력 시 하이픈 없이 받고, 표시 시 하이픈을 자동으로 추가합니다.
- 이메일은 소문자로 통일하여 저장 및 표시합니다.
- 이메일 입력 시 유효성 검증을 필수로 수행합니다.
- 전화번호 타입에 따라 포맷팅 규칙이 다를 수 있습니다.

## 관련 파일

- `src/shared/constants/contactFormat.ts`: 연락처 및 이메일 포맷팅 유틸리티
- `src/shared/components/input/EmailInput.tsx`: 이메일 입력 컴포넌트
- `src/shared/components/input/BgrInput.tsx`: 일반 입력 컴포넌트 (연락처 입력 포함)

