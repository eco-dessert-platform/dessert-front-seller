import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrDropdown from './BgrDropdown'

const meta = {
    title: 'Components/BgrDropdown',
    component: BgrDropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        disabled: {
            control: 'boolean',
        },
    },
    args: {
        onSelect: fn(),
    },
} satisfies Meta<typeof BgrDropdown>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

export const Default: Story = {
    args: {
        options: defaultOptions,
        placeholder: '선택하세요',
    },
    render: (args) => (
        <div className="w-[300px]">
            <BgrDropdown {...args} />
        </div>
    ),
}

export const WithValue: Story = {
    args: {
        options: defaultOptions,
        value: 'option2',
        placeholder: '선택하세요',
    },
    render: (args) => (
        <div className="w-[300px]">
            <BgrDropdown {...args} />
        </div>
    ),
}

export const Disabled: Story = {
    args: {
        options: defaultOptions,
        disabled: true,
        placeholder: '선택하세요',
    },
    render: (args) => (
        <div className="w-[300px]">
            <BgrDropdown {...args} />
        </div>
    ),
}

export const ManyOptions: Story = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
            { label: 'Option 5', value: 'option5' },
            { label: 'Option 6', value: 'option6' },
        ],
        placeholder: '선택하세요',
    },
    render: (args) => (
        <div className="w-[300px]">
            <BgrDropdown {...args} />
        </div>
    ),
}

