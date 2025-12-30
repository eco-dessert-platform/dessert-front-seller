import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-onboarding',
        '@chromatic-com/storybook',
        '@storybook/experimental-addon-test',
        '@storybook/addon-a11y',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    async viteFinal(config) {
        // Tailwind CSS 플러그인 추가
        config.plugins = config.plugins || []
        config.plugins.push(tailwindcss())

        // 경로 별칭 설정
        config.resolve = config.resolve || {}
        config.resolve.alias = {
            ...config.resolve.alias,
            src: path.resolve(__dirname, '../src'),
        }

        return config
    },
}
export default config
