import type { Meta, StoryObj } from '@storybook/react'
import BgrBadge from './BgrBadge'

const meta = {
    title: 'Components/BgrBadge',
    component: BgrBadge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['success', 'warning', 'error', 'info', 'default'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
        },
    },
} satisfies Meta<typeof BgrBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        children: 'Badge',
        variant: 'default',
        size: 'md',
    },
}

export const Success: Story = {
    args: {
        children: 'Success',
        variant: 'success',
        size: 'md',
    },
}

export const Warning: Story = {
    args: {
        children: 'Warning',
        variant: 'warning',
        size: 'md',
    },
}

export const Error: Story = {
    args: {
        children: 'Error',
        variant: 'error',
        size: 'md',
    },
}

export const Info: Story = {
    args: {
        children: 'Info',
        variant: 'info',
        size: 'md',
    },
}

export const Small: Story = {
    args: {
        children: 'Small Badge',
        variant: 'default',
        size: 'sm',
    },
}

export const AllVariants: Story = {
    args: {
        children: 'All Variants',
        variant: 'default',
    },
    render: () => (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <BgrBadge variant="default">Default</BgrBadge>
                <BgrBadge variant="success">Success</BgrBadge>
                <BgrBadge variant="warning">Warning</BgrBadge>
                <BgrBadge variant="error">Error</BgrBadge>
                <BgrBadge variant="info">Info</BgrBadge>
            </div>
            <div className="flex gap-2 items-center">
                <BgrBadge variant="default" size="sm">
                    Small
                </BgrBadge>
                <BgrBadge variant="success" size="sm">
                    Small
                </BgrBadge>
                <BgrBadge variant="warning" size="sm">
                    Small
                </BgrBadge>
            </div>
        </div>
    ),
}

