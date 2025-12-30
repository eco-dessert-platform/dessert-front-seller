import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrTextarea from './BgrTextarea'

const meta = {
    title: 'Components/BgrTextarea',
    component: BgrTextarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        error: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
        required: {
            control: 'boolean',
        },
        showCount: {
            control: 'boolean',
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof BgrTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const WithLabel: Story = {
    args: {
        label: '설명',
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const Required: Story = {
    args: {
        label: '필수 입력',
        required: true,
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const WithError: Story = {
    args: {
        label: '설명',
        error: true,
        errorMessage: '오류 메시지입니다',
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const WithHelperText: Story = {
    args: {
        label: '설명',
        helperText: '도움말 텍스트입니다',
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const WithMaxLength: Story = {
    args: {
        label: '설명',
        maxLength: 100,
        showCount: true,
        placeholder: '최대 100자까지 입력 가능합니다',
    },
    render: (args) => {
        const [value, setValue] = useState(args.value || '')
        return (
            <div className="w-[400px]">
                <BgrTextarea
                    {...args}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value)
                        args.onChange?.(e)
                    }}
                />
            </div>
        )
    },
}

export const Disabled: Story = {
    args: {
        label: '설명',
        disabled: true,
        value: '비활성화된 텍스트',
        placeholder: '텍스트를 입력하세요',
    },
    render: (args) => {
        return (
            <div className="w-[400px]">
                <BgrTextarea {...args} />
            </div>
        )
    },
}

