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
                manualChunks(id) {
                    // node_modules의 큰 라이브러리들을 분리
                    if (id.includes('node_modules')) {
                        // Recharts (매우 큰 라이브러리, 별도 분리)
                        if (id.includes('recharts')) {
                            return 'vendor-recharts'
                        }
                        // React 관련 모듈
                        if (
                            id.includes('react') ||
                            id.includes('scheduler') ||
                            id.includes('react-dom')
                        ) {
                            return 'vendor-react'
                        }
                        // Redux 관련 모듈
                        if (
                            id.includes('redux') ||
                            id.includes('@reduxjs/toolkit')
                        ) {
                            return 'vendor-redux'
                        }
                        // TanStack Table & Virtual (큰 라이브러리)
                        if (id.includes('@tanstack')) {
                            return 'vendor-tanstack'
                        }
                        // i18n 관련 모듈
                        if (id.includes('i18next') || id.includes('i18next-browser-languagedetector')) {
                            return 'vendor-i18n'
                        }
                        // 애니메이션 관련 모듈
                        if (id.includes('framer-motion')) {
                            return 'vendor-motion'
                        }
                        // 아이콘 관련 모듈
                        if (id.includes('lucide-react')) {
                            return 'vendor-icons'
                        }
                        // Radix UI 관련 모듈 (여러 패키지)
                        if (id.includes('@radix-ui')) {
                            return 'vendor-radix'
                        }
                        // React Router
                        if (id.includes('react-router')) {
                            return 'vendor-router'
                        }
                        // 날짜 관련 라이브러리
                        if (id.includes('date-fns') || id.includes('react-day-picker')) {
                            return 'vendor-date'
                        }
                        // 차트/UI 유틸리티
                        if (id.includes('culori') || id.includes('vaul')) {
                            return 'vendor-ui-utils'
                        }
                        // HTTP 클라이언트 및 알림
                        if (id.includes('axios') || id.includes('react-toastify')) {
                            return 'vendor-http'
                        }
                        // 나머지 node_modules는 vendor로 묶기
                        return 'vendor'
                    }
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
