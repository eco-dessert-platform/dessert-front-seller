import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrSelect from './BgrSelect'

const meta = {
    title: 'Components/BgrSelect',
    component: BgrSelect,
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
    },
    args: {
        onValueChange: fn(),
    },
} satisfies Meta<typeof BgrSelect>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
]

export const Default: Story = {
    args: {
        options: defaultOptions,
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const WithLabel: Story = {
    args: {
        options: defaultOptions,
        label: '선택 항목',
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const Required: Story = {
    args: {
        options: defaultOptions,
        label: '필수 선택',
        required: true,
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const WithError: Story = {
    args: {
        options: defaultOptions,
        label: '선택 항목',
        error: true,
        errorMessage: '필수 항목입니다',
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const WithHelperText: Story = {
    args: {
        options: defaultOptions,
        label: '선택 항목',
        helperText: '도움말 텍스트입니다',
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const Disabled: Story = {
    args: {
        options: defaultOptions,
        label: '선택 항목',
        disabled: true,
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

export const WithDisabledOption: Story = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2 (Disabled)', value: 'option2', disabled: true },
            { label: 'Option 3', value: 'option3' },
        ],
        label: '선택 항목',
        placeholder: '선택하세요',
    },
    render: (args) => {
        const [value, setValue] = useState<string | undefined>(args.value)
        return (
            <div className="w-[300px]">
                <BgrSelect
                    {...args}
                    value={value}
                    onValueChange={(val) => {
                        setValue(val)
                        args.onValueChange?.(val)
                    }}
                />
            </div>
        )
    },
}

