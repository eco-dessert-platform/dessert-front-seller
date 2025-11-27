# Git Commit Convention

프론트엔드 프로젝트에서 공통적으로 사용하는 Git Commit 규칙입니다.  
가독성과 협업 효율을 높이기 위한 목적이며, 모든 커밋은 아래 규칙을 따릅니다.

---

## 1. Commit Message Format

```
<type>(scope?): <subject>
<body> (optional)
<footer> (optional)
```

---

## 2. Types

아래 8개 유형을 기본으로 사용합니다.

| type     | 설명                                        |
| -------- | ------------------------------------------- |
| feat     | 새로운 기능 추가                            |
| fix      | 버그 수정                                   |
| design   | UI/스타일 변경 (CSS, 반응형, 레이아웃 등)   |
| refactor | 리팩터링 (기능 변화 없음)                   |
| style    | 코드 스타일 변경 (포맷팅, 세미콜론 정리 등) |
| test     | 테스트 코드 추가/수정                       |
| chore    | 빌드/패키지/설정 변경                       |
| perf     | 성능 개선                                   |

---

## 3. Subject 작성 규칙

- 한 줄로 작성
- 명령형 사용
- 문장 끝에 마침표 사용 ❌
- 한국어/영어 모두 허용
- 설명이 길면 body에 작성

### 예시

```
feat: 로그인 모달 추가
design(header): 헤더 반응형 레이아웃 수정
fix(cart): 수량 업데이트 오류 수정
refactor(product): fetch 로직 분리
style: prettier 포맷 적용
chore: react-query 버전 업데이트
```

---

## 4. Body 작성 규칙 (선택)

- 변경 이유 / 상세 설명
- 줄바꿈 1줄 후 작성
- 필요할 때만 작성

### 예시

```
feat: 상품 리스트 무한스크롤 구현
Intersection Observer 기반으로 스크롤 이벤트 최적화.
기존 대비 렌더링 성능 개선.
```

---

## 5. Footer 작성 규칙 (선택)

이슈 번호나 관련 PR 연결 시 사용합니다.

```
Closes #12
Relates #33
```

---

## 6. Scope 예시

선택 사항이며 다음과 같이 자유롭게 사용합니다:

- auth / api
- header / footer
- product / cart
- common / layout

예:

```
feat(auth): 이메일 로그인 기능 추가
design(layout): 모바일 레이아웃 개선
```

---

## 7. 금지 사례

- 의미 없는 커밋 메시지
    - fix: 버그 수정
    - update: 수정
    - change: 변경
- 너무 긴 subject
- 기능 변경 + 스타일 변경을 한 커밋에 섞기 ❌

---

## 8. Commit 예시 모음

```
feat: 검색 자동완성 기능 추가
design(home): 배너 UI 개선
fix(api): 토큰 만료 시 재요청 오류 수정
refactor(utils): 날짜 포맷 함수 리팩터링
style: eslint auto-fix 적용
test: product 컴포넌트 테스트 추가
chore: yarn 패키지 업데이트
perf: 이미지 lazy-loading 적용
```
