# 코드 스타일(Prettier) 적용법

## 전체 코드 포맷팅

```bash
yarn exec prettier . --write
```

## 자동 정렬 설정

### WebStorm

파일 | 설정 | 언어 및 프레임워크 | JavaScript | Prettier  
jetbrains://WebStorm/settings?name=%EC%96%B8%EC%96%B4+%EB%B0%8F+%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC--JavaScript--Prettier  
에서 자동 활성화 또는 저장 시 적용 활성화

## TODO

- 커밋 시 자동 적용 (ex. husky 등 도입 필요)

## TailwindCSS

- prettier-plugin-tailwindcss로 자동 정렬

