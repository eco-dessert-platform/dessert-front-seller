import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrChip from './BgrChip'

const meta = {
    title: 'Components/BgrChip',
    component: BgrChip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'primary', 'secondary'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
        },
        closable: {
            control: 'boolean',
        },
    },
    args: {
        onClose: fn(),
    },
} satisfies Meta<typeof BgrChip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Chip',
        variant: 'default',
        size: 'md',
        closable: false,
    },
}

export const Primary: Story = {
    args: {
        children: 'Primary Chip',
        variant: 'primary',
        size: 'md',
        closable: false,
    },
}

export const Secondary: Story = {
    args: {
        children: 'Secondary Chip',
        variant: 'secondary',
        size: 'md',
        closable: false,
    },
}

export const Closable: Story = {
    args: {
        children: 'Closable Chip',
        variant: 'default',
        size: 'md',
        closable: true,
        onClose: fn(),
    },
}

export const Small: Story = {
    args: {
        children: 'Small Chip',
        variant: 'default',
        size: 'sm',
        closable: false,
    },
}

export const AllVariants: Story = {
    args: {
        children: '',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center flex-wrap">
                <BgrChip variant="default">Default</BgrChip>
                <BgrChip variant="primary">Primary</BgrChip>
                <BgrChip variant="secondary">Secondary</BgrChip>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
                <BgrChip variant="default" closable onClose={fn()}>
                    Closable
                </BgrChip>
                <BgrChip variant="primary" closable onClose={fn()}>
                    Closable Primary
                </BgrChip>
            </div>
        </div>
    ),
}

