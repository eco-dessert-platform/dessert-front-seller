# 문제 해결

개발 중 자주 발생하는 문제와 해결 방법을 정리했습니다.

## 🔧 설치 및 환경 설정

### Node.js 관련

**❌ `node: command not found`**

**해결 방법**:
1. Node.js가 설치되어 있는지 확인: `node --version`
2. 미설치 시 [설치 가이드](../quickstarts/installation.md#nodejs-18-설치) 참고
3. 터미널 재시작

---

**❌ Node.js 버전이 너무 낮음**

**해결 방법**:
```bash
# nvm 사용
nvm install --lts
nvm use --lts
```

### Yarn 관련

**❌ `yarn: command not found`**

**해결 방법**:
```bash
# Corepack 활성화
corepack enable

# 확인
yarn --version  # 4.11.0이어야 함
```

---

**❌ Yarn 버전이 다름**

**해결 방법**:
```bash
corepack enable
corepack prepare yarn@4.11.0 --activate
```

### WSL 관련

**❌ 파일 변경 감지 안 됨**

**원인**: Windows 파일 시스템에서 프로젝트 실행

**해결 방법**:
```bash
# 프로젝트를 WSL 파일 시스템으로 이동
cd ~
git clone <repository-url>
cd dessert-front-seller
yarn install
yarn dev
```

## ⚛️ React 및 개발 서버

### 포트 관련

**❌ `Port 5173 is already in use`**

**해결 방법**:

**Option 1**: 다른 포트 사용
```bash
yarn dev --port 3000
```

**Option 2**: 프로세스 종료
```bash
# WSL/Linux/macOS
kill -9 $(lsof -ti:5173)

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### 빌드 관련

**❌ 빌드 실패: `out of memory`**

**해결 방법**:
```bash
# Node.js 메모리 증가
NODE_OPTIONS=--max-old-space-size=4096 yarn build
```

## 🔄 Redux 관련

### 액션이 실행되지 않음

**❌ `dispatch(action)`했지만 상태가 변경되지 않음**

**확인 사항**:
1. Store에 reducer가 등록되었는지 확인
2. Saga가 rootSaga에 추가되었는지 확인
3. Redux DevTools에서 액션이 dispatch되었는지 확인

**해결 방법**:
```typescript
// 1. Store 확인 (reduxStore.tsx)
const reducers = {
    myFeatureReducer: myFeatureSlice.reducer,  // ← 등록되었는지 확인
}

// 2. Saga 확인
export function* rootSaga() {
    yield all([
        myFeatureSaga(),  // ← 추가되었는지 확인
    ])
}
```

### 타입 에러

**❌ `Argument of type 'X' is not assignable to parameter`**

**해결 방법**:
```typescript
// ✅ AsyncRequest 타입 명시
const asyncRequests = [
    {
        action: 'getData',
        state: 'data',
        initialState: null,
        api: () => axios.get<DataType>('/api/data'),
    } as const satisfies AsyncRequest<DataType, void>,
] as const  // ← 잊지 마세요!
```

### 메모리 누수

**❌ 페이지를 이동해도 데이터가 계속 쌓임**

**해결 방법**:
```typescript
// 컴포넌트 언마운트 시 cleanup
useEffect(() => {
    dispatch(action.getData())
    
    return () => {
        dispatch(action.initialize('data'))  // ← 필수!
    }
}, [])
```

## 🎨 스타일링 관련

### TailwindCSS 클래스가 적용되지 않음

**❌ 클래스를 추가했는데 스타일이 적용되지 않음**

**확인 사항**:
1. 개발 서버가 실행 중인지 확인
2. `index.css`가 import되었는지 확인
3. 클래스명 오타 확인

**해결 방법**:
```typescript
// main.tsx에서 확인
import './styles/index.css'  // ← 임포트되었는지 확인
```

### 테마가 적용되지 않음

**❌ 다크모드/라이트모드 전환이 안 됨**

**확인 사항**:
1. `index.html`에 인라인 스크립트가 있는지 확인
2. `.dark` 또는 `.light` 클래스가 `<html>`에 적용되었는지 확인

**해결 방법**:
```javascript
// 개발자 도구 콘솔에서
console.log(document.documentElement.className)
// 'dark' 또는 'light'가 포함되어야 함
```

### shadcn 컴포넌트 경로 오류

**❌ `cn` 경로를 찾을 수 없음**

**해결 방법**:
`components.json` 파일에서 경로 확인:
```json
{
    "aliases": {
        "utils": "src/shared/lib/shadcn/lib/utils"
    }
}
```

## 🛣️ 라우팅 관련

### 페이지가 표시되지 않음

**❌ `/mypage`로 이동했는데 404 에러**

**확인 사항**:
1. `pages/url/` 폴더에 파일이 있는지 확인
2. default export를 사용했는지 확인
3. 파일명이 올바른지 확인

**해결 방법**:
```typescript
// ✅ 올바른 방법
// pages/url/mypage/MyPage.tsx
export default function MyPage() {
    return <div>My Page</div>
}
```

### 동적 라우트 파라미터를 받지 못함

**❌ `useParams()`가 `undefined` 반환**

**확인 사항**:
1. 폴더명이 `[param]` 형식인지 확인
2. React Router를 올바르게 import했는지 확인

**해결 방법**:
```typescript
import { useParams } from 'react-router-dom'  // ← 올바른 import

function DetailPage() {
    const { id } = useParams()  // 이제 작동함
}
```

## 🌐 API 관련

### API 호출이 실패함

**❌ 네트워크 에러 또는 CORS 에러**

**확인 사항**:
1. API 서버가 실행 중인지 확인
2. API URL이 올바른지 확인
3. CORS 설정 확인

**해결 방법**:
```typescript
// vite.config.ts에서 프록시 설정
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
})
```

## 📱 기타

### Hot Module Replacement가 작동하지 않음

**해결 방법**:
1. 개발 서버 재시작
2. 브라우저 캐시 삭제
3. `node_modules` 삭제 후 재설치:
```bash
rm -rf node_modules .yarn/cache
yarn install
```

### Prettier가 자동 적용되지 않음

**해결 방법**:
1. VS Code: 설정에서 "Format On Save" 활성화
2. WebStorm: 설정에서 Prettier 활성화
3. 수동 실행:
```bash
yarn exec prettier . --write
```

## 🆘 추가 도움이 필요한 경우

위의 방법으로 해결되지 않는다면:

1. **GitHub Issues 검색**: 비슷한 이슈가 있는지 확인
2. **새 Issue 등록**: 문제를 상세히 설명하고 등록
3. **Discord/Slack**: 팀 채널에서 문의

---

[← Resources 목차로 돌아가기](./README.md)

