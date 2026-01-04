/**
 * 연락처 및 이메일 형식 규칙 및 상수
 *
 * @description
 * 프로젝트 전반에서 사용하는 연락처 및 이메일 표기 형식을 정의합니다.
 *
 * 규칙:
 * - 연락처: 하이픈(-)으로 구분하여 표기
 * - 이메일: 표준 이메일 형식 (local@domain)
 */

/**
 * 전화번호 형식 타입
 */
export type PhoneNumberType = 'mobile' | 'landline' | 'international'

/**
 * 전화번호를 하이픈 형식으로 포맷팅합니다.
 *
 * @param phoneNumber - 포맷팅할 전화번호 (숫자만 포함된 문자열)
 * @param type - 전화번호 타입 (기본값: 'mobile')
 * @returns 하이픈이 포함된 전화번호 문자열
 *
 * @example
 * ```ts
 * formatPhoneNumber('01012345678') // '010-1234-5678'
 * formatPhoneNumber('0212345678', 'landline') // '02-1234-5678'
 * formatPhoneNumber('15881234', 'landline') // '1588-1234'
 * ```
 */
export const formatPhoneNumber = (
    phoneNumber: string,
    type: PhoneNumberType = 'mobile',
): string => {
    // 숫자만 추출
    const digits = phoneNumber.replace(/\D/g, '')

    if (!digits) {
        return phoneNumber
    }

    switch (type) {
        case 'mobile': {
            // 휴대전화: 010-1234-5678
            if (digits.length === 11 && digits.startsWith('010')) {
                return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
            }
            // 010이 아닌 경우도 동일한 형식 적용
            if (digits.length === 11) {
                return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
            }
            // 10자리 휴대전화 (구형)
            if (digits.length === 10) {
                return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
            }
            break
        }
        case 'landline': {
            // 서울 지역번호 (02): 02-1234-5678
            if (digits.startsWith('02') && digits.length === 9) {
                return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`
            }
            if (digits.startsWith('02') && digits.length === 10) {
                return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6)}`
            }
            // 기타 지역번호 (031, 032 등): 031-123-4567
            if (digits.length === 10) {
                return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
            }
            // 1588, 1544 등: 1588-1234
            if (digits.length === 8) {
                return `${digits.slice(0, 4)}-${digits.slice(4)}`
            }
            break
        }
        case 'international': {
            // 국제번호는 그대로 반환 (복잡한 규칙이므로)
            return phoneNumber
        }
    }

    // 기본 포맷팅: 3-4-4 형식
    if (digits.length === 11) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
    }
    if (digits.length === 10) {
        return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
    }

    // 포맷팅할 수 없는 경우 원본 반환
    return phoneNumber
}

/**
 * 이메일 주소 유효성 검증
 *
 * @param email - 검증할 이메일 주소
 * @returns 유효한 이메일인지 여부
 *
 * @example
 * ```ts
 * isValidEmail('user@example.com') // true
 * isValidEmail('invalid-email') // false
 * ```
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * 이메일 주소를 포맷팅합니다 (소문자 변환 및 공백 제거).
 *
 * @param email - 포맷팅할 이메일 주소
 * @returns 포맷팅된 이메일 주소
 *
 * @example
 * ```ts
 * formatEmail('  User@Example.COM  ') // 'user@example.com'
 * ```
 */
export const formatEmail = (email: string): string => {
    return email.trim().toLowerCase()
}

