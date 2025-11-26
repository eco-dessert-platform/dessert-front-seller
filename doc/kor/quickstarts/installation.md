# 설치 및 실행

프로젝트를 설치하고 실행하는 방법을 단계별로 안내합니다.

## ⚡ 빠른 시작

이미 Node.js와 Yarn이 설치되어 있다면 바로 시작하세요:

```bash
# 1. 의존성 설치
yarn install

# 2. 개발 서버 실행
yarn dev
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 📦 사전 요구사항

### Node.js 18+ 설치

#### WSL/Linux/macOS

**nvm 사용 (권장)**:
```bash
# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Node.js LTS 설치
nvm install --lts
nvm use --lts

# 설치 확인
node --version  # v18.0.0 이상
```

**직접 설치**:
[Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드

#### Windows

**nvm-windows 사용 (권장)**:
1. [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 최신 설치 프로그램 다운로드
2. 관리자 권한으로 실행
3. PowerShell에서:
```powershell
nvm install lts
nvm use lts
```

**WSL2 사용 (권장)**:
Windows 사용자는 WSL2 사용을 강력히 권장합니다.

```powershell
# PowerShell 관리자 권한으로 실행
wsl --install
# 재부팅 후 Ubuntu 실행
```

WSL2 내부에서 위의 Linux 명령어를 사용하세요.

### Yarn 4 설치

#### Corepack 사용 (권장, Node.js 16.10+)

```bash
# Corepack 활성화
corepack enable

# 버전 확인 (자동으로 4.11.0 사용)
yarn --version
```

**Windows에서 권한 문제 시**:
```powershell
# PowerShell 관리자 권한으로 실행
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
corepack enable
```

#### npm 사용

```bash
npm install -g yarn@4.11.0
```

## 🚀 프로젝트 설치

### 1. 저장소 클론

```bash
git clone <repository-url>
cd dessert-front-seller
```

### 2. 의존성 설치

```bash
yarn install
```

처음 실행 시 시간이 걸릴 수 있습니다 (약 1-2분).

### 3. 개발 서버 실행

```bash
yarn dev
```

실행 후 터미널에 다음과 같이 표시됩니다:

```
VITE v6.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

브라우저에서 `http://localhost:5173`으로 접속하세요.

## 📝 기타 명령어

```bash
# 프로덕션 빌드
yarn build

# 빌드 미리보기
yarn preview

# ESLint 실행
yarn lint

# Prettier 포맷팅
yarn exec prettier . --write

# Storybook 실행
yarn storybook

# 테스트 실행
yarn test
```

## 🔧 문제 해결

### ❌ `node: command not found` 오류

**원인**: Node.js가 설치되지 않았거나 PATH에 없습니다.

**해결 방법**:
1. 위의 [Node.js 설치](#nodejs-18-설치) 섹션을 따라 설치
2. 터미널을 재시작
3. `node --version`으로 확인

### ❌ `yarn: command not found` 오류

**원인**: Yarn이 설치되지 않았습니다.

**해결 방법**:
1. `corepack enable` 실행
2. 터미널을 재시작
3. `yarn --version`으로 확인 (4.11.0이어야 함)

### ❌ `Port 5173 is already in use` 오류

**원인**: 5173 포트를 다른 프로세스가 사용 중입니다.

**해결 방법**:

**Option 1**: 포트를 변경하여 실행
```bash
yarn dev --port 3000
```

**Option 2**: 프로세스 종료

**WSL/Linux/macOS**:
```bash
# 포트 사용 프로세스 확인
lsof -ti:5173

# 프로세스 종료
kill -9 $(lsof -ti:5173)
```

**Windows**:
```powershell
# 포트 사용 프로세스 확인
netstat -ano | findstr :5173

# 프로세스 종료 (PID는 위 명령어에서 확인)
taskkill /PID <PID> /F
```

### ❌ Windows 줄바꿈 문자 오류

**원인**: Git이 CRLF를 사용하여 파일이 계속 수정된 것으로 표시됩니다.

**해결 방법**:
```bash
git config --global core.autocrlf false
git config --global core.eol lf

# 저장소 다시 클론하거나
git rm -rf --cached .
git reset --hard
```

### ❌ WSL2에서 파일 감지 안 됨

**원인**: Windows 파일 시스템에서 프로젝트를 실행 중입니다.

**해결 방법**:
프로젝트를 WSL 파일 시스템으로 이동:
```bash
# WSL 홈 디렉토리로 이동
cd ~

# 프로젝트 클론
git clone <repository-url>
```

### ❌ `ENAMETOOLONG` 오류 (Windows)

**원인**: 경로가 너무 깁니다.

**해결 방법**:
```powershell
# PowerShell 관리자 권한으로 실행
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# 재부팅
```

## 💡 권장 사항

### WSL2 사용 (Windows)

Windows 사용자는 WSL2 사용을 강력히 권장합니다.

**장점**:
- ✅ Linux 환경에서 개발 가능
- ✅ 더 빠른 파일 I/O
- ✅ 줄바꿈 문자 문제 없음
- ✅ 대부분의 도구가 Linux를 기준으로 개발됨

**설치**:
```powershell
# PowerShell 관리자 권한으로 실행
wsl --install

# 재부팅 후 Ubuntu 실행
```

### 개발 환경 설정

**권장 IDE**:
- VS Code (추천)
- WebStorm

**권장 VS Code 확장**:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript 지원

## ✅ 설치 확인

다음 명령어들이 정상 실행되면 설치 완료:

```bash
# 버전 확인
node --version    # v18.0.0 이상
yarn --version    # 4.11.0
```

```bash
# 프로젝트 실행
yarn dev
```

브라우저에서 `http://localhost:5173` 접속 확인

## 🚀 다음 단계

설치를 완료하셨다면:

- **첫 기능 만들어보기**: [첫 번째 기능 만들기](./your-first-feature.md)
- **프로젝트 구조 이해하기**: [프로젝트 구조](../concepts/project-structure.md)
- **상태 관리 알아보기**: [상태 관리](../concepts/state-management.md)

---

[← Quickstarts 목차로 돌아가기](./README.md)

