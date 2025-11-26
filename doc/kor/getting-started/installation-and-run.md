# 설치 및 실행

## 사전 요구사항

> ℹ️ **이미 Node.js와 Yarn이 설치되어 있다면 이 섹션을 건너뛰고 바로 [프로젝트 설치](#프로젝트-설치)로 이동할 수 있습니다.**

### Node.js 버전 관리 (nvm)

> ⏭️ **이미 Node.js 18.0 이상 버전이 설치되어 있다면 이 단계를 건너뛸 수 있습니다.** `node --version` 명령으로 확인하세요.

프로젝트에서 권장하는 Node.js 버전을 사용하기 위해 nvm(Node Version Manager)을 설치하는 것을 권장합니다.

**nvm 설치 (Unix/macOS/WSL):**
```bash
# nvm 설치
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 또는 wget 사용
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# nvm 활성화 (설치 후)
source ~/.bashrc  # 또는 ~/.zshrc
```

**nvm 설치 (Windows):**
- [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) 에서 최신 설치 프로그램 다운로드
- 설치 후 관리자 권한으로 명령 프롬프트 실행

**Node.js 설치:**
```bash
# LTS 버전 설치 (권장)
nvm install --lts

# 특정 버전 설치
nvm install 20.18.0

# 설치된 버전 사용
nvm use 20.18.0

# 설치된 버전 확인
node --version
```

### Yarn 4 설치 (Corepack 사용)

> ⏭️ **이미 Yarn이 설치되어 있다면** `yarn --version`으로 버전을 확인하세요. 버전이 4.x 이상이면 이 단계를 건너뛸 수 있습니다.

이 프로젝트는 **Yarn 4.11.0**을 사용합니다. Node.js 16.10+ 버전에 포함된 Corepack을 활성화하여 자동으로 올바른 Yarn 버전을 사용할 수 있습니다.

**Corepack 활성화:**
```bash
# Corepack 활성화
corepack enable

# Yarn 버전 확인 (자동으로 4.11.0이 설정됨)
yarn --version
```

**Windows에서 Corepack 권한 문제 해결:**
```powershell
# PowerShell을 관리자 권한으로 실행
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
corepack enable
```

**Corepack을 사용할 수 없는 경우:**
```bash
# npm을 통한 Yarn 설치
npm install -g yarn

# 특정 버전 설치
npm install -g yarn@4.11.0
```

## 프로젝트 설치

> ✅ **필수 단계:** 이 섹션의 명령어들은 프로젝트 실행을 위해 반드시 필요합니다.

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 미리보기
yarn preview

# ESLint 실행
yarn lint
```

## Windows 환경 설정

> ⏭️ **macOS 또는 Linux 사용자는 이 섹션을 건너뛰세요.** Windows 사용자만 해당됩니다.

### WSL2 사용 (권장)

> ℹ️ **WSL2는 선택사항입니다.** 일반 Windows 환경에서도 프로젝트를 실행할 수 있지만, WSL2 사용을 권장합니다.

Windows에서는 WSL2(Windows Subsystem for Linux)를 사용하는 것을 권장합니다.

```powershell
# PowerShell을 관리자 권한으로 실행
wsl --install

# 재부팅 후 Ubuntu 설정
# 이후 WSL2 터미널에서 위의 Unix/macOS 설정 가이드를 따릅니다
```

### Git 설정 (Windows)

> ℹ️ **선택사항:** 이미 Git이 잘 작동하고 있다면 건너뛰어도 됩니다. 줄바꿈 문자 관련 오류가 발생할 경우에만 설정하세요.

Windows에서 줄바꿈 문자 충돌을 방지하기 위해:

```bash
git config --global core.autocrlf false
git config --global core.eol lf
```

### 경로 길이 제한 해제

> ℹ️ **선택사항:** 경로 관련 오류가 발생하지 않는다면 건너뛰어도 됩니다. 주로 깊은 경로의 node_modules에서 문제가 발생할 때 설정합니다.

Windows의 경로 길이 제한(260자)을 해제합니다:

```powershell
# PowerShell 관리자 권한으로 실행
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

또는 레지스트리 편집기에서:
1. `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`
2. `LongPathsEnabled` 값을 `1`로 설정

## Storybook

```bash
yarn storybook         # 스토리북 실행
yarn build-storybook   # 스토리북 정적 사이트 빌드
```

## 테스트

```bash
yarn test        # 단위 테스트(Vitest)
yarn test:run    # 전체 테스트 CI 모드 실행
yarn cypress     # (설정 시) Cypress E2E 테스트 실행
```

