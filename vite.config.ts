import react from '@vitejs/plugin-react-swc'
import path, { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, Plugin } from 'vite'
import fs, { copyFileSync } from 'fs'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        fontPreloadPlugin(),
        copyRobotsTxt(),
        svgr(),
    ],

    // 포트지정
    server: {
        port: 6075,
    },

    base: '/',

    resolve: {
        alias: {
            src: path.resolve(__dirname, 'src'),
        },
    },

    build: {
        // 청크 크기 경고 임계값 설정 (개선 목표: 500KB 이하)
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            output: {
                manualChunks: {
                    // React 코어 라이브러리
                    'vendor-react': [
                        'react',
                        'react/jsx-runtime',
                        'scheduler',
                    ],
                    // React DOM
                    'vendor-react-dom': ['react-dom'],
                    // Redux 관련 모듈
                    'vendor-redux': [
                        '@reduxjs/toolkit',
                        'react-redux',
                        'redux',
                        'redux-saga',
                    ],
                    // React Router
                    'vendor-router': [
                        'react-router-dom',
                        'react-router',
                    ],
                    // 차트 라이브러리 (recharts는 크기가 큼)
                    'vendor-charts': ['recharts'],
                    // 테이블 라이브러리
                    'vendor-table': ['@tanstack/react-table'],
                    'vendor-virtual': ['@tanstack/react-virtual'],
                    // i18n 관련 모듈
                    'vendor-i18n': [
                        'i18next',
                        'react-i18next',
                        'i18next-browser-languagedetector',
                    ],
                    // 날짜 관련 라이브러리
                    'vendor-date': ['date-fns'],
                    'vendor-date-picker': ['react-day-picker'],
                    // 애니메이션 관련 모듈
                    'vendor-motion': ['framer-motion'],
                    // 아이콘 관련 모듈
                    'vendor-icons': ['lucide-react'],
                    // HTTP 클라이언트
                    'vendor-http': ['axios'],
                    // Toast 알림
                    'vendor-toast': ['react-toastify'],
                    // Radix UI 관련 모듈
                    'vendor-radix': [
                        '@radix-ui/react-accordion',
                        '@radix-ui/react-alert-dialog',
                        '@radix-ui/react-checkbox',
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-label',
                        '@radix-ui/react-scroll-area',
                        '@radix-ui/react-select',
                        '@radix-ui/react-separator',
                        '@radix-ui/react-slot',
                        '@radix-ui/react-switch',
                        '@radix-ui/react-tabs',
                        '@radix-ui/react-tooltip',
                    ],
                    // 기타 유틸리티 라이브러리들
                    'vendor-utils': [
                        'clsx',
                        'tailwind-merge',
                        'class-variance-authority',
                        'culori',
                        'typesafe-actions',
                        'vaul',
                    ],
                },
            },
        },
    },
})

// 폰트를 자동으로 preload하는 플러그인
function fontPreloadPlugin(): Plugin {
    return {
        name: 'vite-font-preload',
        transformIndexHtml: {
            order: 'pre',
            handler(html) {
                const fontDir = path.resolve(__dirname, 'src/assets/fonts')
                const preloadLinks: string[] = []
                const usedFonts = getUsedFonts(html)

                function walk(dir: string) {
                    const files = fs.readdirSync(dir)
                    for (const file of files) {
                        const fullPath = path.join(dir, file)
                        const stat = fs.statSync(fullPath)
                        if (stat.isDirectory()) {
                            walk(fullPath)
                        } else if (
                            file.endsWith('.woff') ||
                            file.endsWith('.woff2')
                        ) {
                            const publicPath = fullPath
                                .split('assets')[1]
                                .replace(/\\/g, '/')
                            const type = file.endsWith('.woff2')
                                ? 'font/woff2'
                                : 'font/woff'
                            const fontName = file.split('.')[0]
                            if (usedFonts.includes(fontName)) {
                                preloadLinks.push(
                                    `<link rel="preload" href="/assets${publicPath}" as="font" type="${type}" crossorigin>`,
                                )
                            }
                        }
                    }
                }

                walk(fontDir)
                return html.replace(
                    '</head>',
                    preloadLinks.join('\n') + '\n</head>',
                )
            },
        },
    }
}

// HTML에서 사용된 폰트를 추출하는 함수
function getUsedFonts(html: string): string[] {
    const fontRegex = /font-family:\s*['"]?([^;'"]+)['"]?/g
    const usedFonts: string[] = []
    let match
    while ((match = fontRegex.exec(html)) !== null) {
        usedFonts.push(match[1].toLowerCase())
    }
    return usedFonts
}

// 커스텀 플러그인: 빌드 후 robots.txt 복사
function copyRobotsTxt() {
    return {
        name: 'copy-robots-txt',
        closeBundle() {
            copyFileSync(
                resolve(__dirname, 'robots.txt'),
                resolve(__dirname, 'dist/robots.txt'),
            )
        },
    }
}
