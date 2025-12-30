import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrToast from './BgrToast'
import { bgrToast } from './BgrToast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const meta = {
    title: 'Components/BgrToast',
    component: BgrToast,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'error', 'warning', 'info'],
        },
    },
    args: {
        onClose: fn(),
    },
    decorators: [
        (Story) => (
            <div>
                <Story />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={true}
                    newestOnTop={true}
                    closeOnClick={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    toastClassName="!p-0 !bg-transparent !shadow-none !min-w-0"
                />
            </div>
        ),
    ],
} satisfies Meta<typeof BgrToast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
    args: {
        message: '성공적으로 저장되었습니다.',
        variant: 'success',
        onClose: fn(),
    },
}

export const Error: Story = {
    args: {
        message: '오류가 발생했습니다.',
        variant: 'error',
        onClose: fn(),
    },
}

export const Warning: Story = {
    args: {
        message: '주의가 필요합니다.',
        variant: 'warning',
        onClose: fn(),
    },
}

export const Info: Story = {
    args: {
        message: '정보를 확인해주세요.',
        variant: 'info',
        onClose: fn(),
    },
}

export const WithoutCloseButton: Story = {
    args: {
        message: '닫기 버튼이 없는 토스트',
        variant: 'success',
    },
}

export const LongMessage: Story = {
    args: {
        message:
            '이것은 매우 긴 메시지입니다. 토스트 컴포넌트가 긴 텍스트를 어떻게 처리하는지 확인할 수 있습니다.',
        variant: 'info',
        onClose: fn(),
    },
}

export const AllVariants: Story = {
    args: {
        message: 'All Variants',
        variant: 'success',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <BgrToast message="Success" variant="success" onClose={fn()} />
            <BgrToast message="Error" variant="error" onClose={fn()} />
            <BgrToast message="Warning" variant="warning" onClose={fn()} />
            <BgrToast message="Info" variant="info" onClose={fn()} />
        </div>
    ),
}

export const WithHelperFunctions: Story = {
    args: {
        message: 'Helper Functions',
        variant: 'success',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => bgrToast.success('성공 메시지')}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                Show Success Toast
            </button>
            <button
                onClick={() => bgrToast.error('오류 메시지')}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Show Error Toast
            </button>
            <button
                onClick={() => bgrToast.warning('경고 메시지')}
                className="px-4 py-2 bg-yellow-500 text-white rounded"
            >
                Show Warning Toast
            </button>
            <button
                onClick={() => bgrToast.info('정보 메시지')}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Show Info Toast
            </button>
        </div>
    ),
}

