# 설치 및 실행

## 빠른 시작

프로젝트를 바로 시작하려면 아래 명령어를 실행하세요:

```bash
# 1. 의존성 설치
yarn install

# 2. 개발 서버 실행
yarn dev
```

이후 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 기타 명령어

```bash
yarn build       # 프로덕션 빌드
yarn preview     # 빌드 미리보기
yarn lint        # ESLint 실행
yarn storybook   # 스토리북 실행
yarn test        # 단위 테스트 실행
```

---

## 문제 해결 및 권장 설정

위의 빠른 시작으로 실행되지 않는 경우, 아래 섹션을 참고하세요.

### ❗ Node.js가 설치되지 않은 경우

**증상:** `node: command not found` 또는 `node is not recognized` 오류

**해결 방법:**

#### nvm 사용 (권장)

**nvm이란?**  
nvm(Node Version Manager)은 여러 Node.js 버전을 설치하고 관리할 수 있게 해주는 도구입니다. 프로젝트마다 다른 Node.js 버전을 쉽게 전환할 수 있어 개발 환경 관리에 유용합니다.

**Unix/macOS/WSL:**
- **저장소:** [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)
- 설치 방법은 버전에 따라 다를 수 있으므로 위 저장소의 최신 설치 가이드를 참고하세요.

```bash
# nvm 설치 예시 (최신 버전은 GitHub 저장소 참고)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc  # 또는 ~/.zshrc

# Node.js LTS 버전 설치
nvm install --lts
nvm use --lts
```

**Windows:**
- **저장소:** [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows)
- 설치 방법은 버전에 따라 다를 수 있으므로 위 저장소의 Releases 페이지에서 최신 설치 프로그램을 다운로드하세요.
- 설치 프로그램을 관리자 권한으로 실행한 후, 위의 명령어를 사용하세요.

#### 직접 설치

- [Node.js 공식 사이트](https://nodejs.org/)에서 LTS 버전 다운로드 및 설치
- 설치 후 `node --version` 명령으로 확인 (18.0 이상 권장)

### ❗ Yarn이 설치되지 않은 경우

**증상:** `yarn: command not found` 또는 `yarn is not recognized` 오류

**해결 방법:**

#### Corepack 사용 (권장, Node.js 16.10+)

**Corepack이란?**  
Corepack은 Node.js 16.10 버전부터 포함된 내장 도구로, Yarn, pnpm 등의 패키지 매니저 버전을 자동으로 관리해줍니다. 프로젝트의 설정 파일(`.yarnrc.yml`)에 명시된 버전을 자동으로 감지하고 사용하므로, 별도의 수동 설치나 버전 관리가 필요 없습니다.

```bash
# Corepack 활성화
corepack enable

# Yarn 버전 확인 (자동으로 4.11.0 사용)
yarn --version
```

**Windows에서 권한 문제가 있는 경우:**
```powershell
# PowerShell을 관리자 권한으로 실행
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
corepack enable
```

#### npm을 통한 설치

```bash
npm install -g yarn@4.11.0
```

### ❗ Windows에서 줄바꿈 문자 오류

**증상:** Git에서 파일이 계속 수정된 것으로 표시되거나 스크립트 실행 오류

**해결 방법:**

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

설정 후 저장소를 다시 클론하거나:
```bash
git rm -rf --cached .
git reset --hard
```

### ❗ Windows에서 경로 길이 제한 오류

**증상:** `ENAMETOOLONG` 오류 또는 파일 경로가 너무 길다는 메시지

**해결 방법:**

```powershell
# PowerShell을 관리자 권한으로 실행
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

설정 후 컴퓨터를 재시작하세요.

### ❗ 포트 충돌 오류

**증상:** `Port 5173 is already in use` 오류

**해결 방법:**

```bash
# 포트를 사용 중인 프로세스 종료 또는
# vite.config.ts에서 포트 변경
yarn dev --port 3000
```

### 💡 WSL2 사용 권장 (Windows)

Windows 사용자는 WSL2를 사용하면 더 나은 개발 경험을 얻을 수 있습니다.

```powershell
# PowerShell을 관리자 권한으로 실행
wsl --install

# 재부팅 후 Ubuntu 실행
# WSL2 터미널에서 위의 설치 명령어 사용
```

### 💡 Yarn 버전 문제

이 프로젝트는 **Yarn 4.11.0**을 사용합니다. 프로젝트의 `.yarnrc.yml` 파일에 버전이 명시되어 있어, Corepack이 활성화되어 있으면 자동으로 올바른 버전을 사용합니다.

**Yarn 버전 확인:**
```bash
yarn --version  # 4.11.0이 출력되어야 함
```

**Yarn 버전이 다른 경우:**
```bash
corepack enable
corepack prepare yarn@4.11.0 --activate
```