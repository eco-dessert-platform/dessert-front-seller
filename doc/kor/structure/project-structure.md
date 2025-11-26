# 프로젝트 구조(FSD 관점)

이 프로젝트는 **Feature-Sliced Design(FSD)** 패턴을 참고하여 폴더 구조를 설계하였습니다.  
각 폴더는 역할별로 분리되어 있으며, 유지보수성과 확장성을 높이기 위해 다음과 같이 구성되어 있습니다.

```
src/
  app/                # 앱의 엔트리포인트, 글로벌 설정, 스토어, 라우터 등
    api/              # API 클라이언트 및 글로벌 API 설정
    router/           # 라우터 및 라우터 관련 유틸, 타입
    store/            # 전역 상태관리(redux 등)
  assets/             # 폰트, 이미지, 로케일 등 정적 자원
  features/           # 도메인/비즈니스 단위의 feature(기능)별 폴더
    [feature]/        # 예: sample, user 등
      [Feature].tsx   # 해당 feature의 UI/로직
      [feature]Reducer.ts # 해당 feature의 리듀서
  pages/              # 라우트 단위의 페이지 컴포넌트(동적 라우팅 포함)
    [route]/          # 예: url, extra 등
      [Page].tsx      # 실제 라우트에 대응하는 페이지 컴포넌트
  shared/             # 여러 feature/page에서 공통으로 사용하는 컴포넌트, 유틸, 레이아웃 등
    components/       # 공통 UI 컴포넌트(버튼, 토스트, 테마 등)
    lib/              # 외부 라이브러리 래퍼, 공통 훅, 스타일 등
    utils/            # 공통 유틸 함수
    layouts/          # 공통 레이아웃 컴포넌트(헤더, 푸터 등)
  stories/            # 스토리북 등 문서/테스트용 컴포넌트
  styles/             # 전역 스타일, 변수, 리셋 등
  main.tsx            # 앱 진입점
  App.tsx             # 루트 컴포넌트
```

## 각 폴더의 역할 요약

- **app/**: 앱 전체에 영향을 주는 설정, 스토어, 라우터 등 글로벌 레이어
- **assets/**: 폰트, 이미지, 다국어 등 정적 리소스
- **features/**: 비즈니스 도메인별로 분리된 기능 단위(각 feature는 자체 UI, 상태, 비즈니스 로직을 가질 수 있음)
- **pages/**: 라우트 단위의 페이지 컴포넌트, 동적 라우팅 지원
- **shared/**: 여러 feature/page에서 재사용되는 공통 요소(컴포넌트, 유틸, 레이아웃 등)
- **stories/**: 스토리북, 문서화, 테스트용 컴포넌트
- **styles/**: 전역 스타일, CSS 변수, 리셋 등

