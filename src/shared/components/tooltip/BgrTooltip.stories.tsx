import type { Meta, StoryObj } from '@storybook/react'
import BgrTooltip from './BgrTooltip'
import BgrButton from '../button/BgrButton'

const meta = {
    title: 'Components/BgrTooltip',
    component: BgrTooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        position: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
        },
    },
} satisfies Meta<typeof BgrTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        content: 'This is a tooltip',
        position: 'top',
        children: <BgrButton title="Hover me" />,
    },
}

export const Top: Story = {
    args: {
        content: 'Tooltip on top',
        position: 'top',
        children: <BgrButton title="Hover me" />,
    },
}

export const Bottom: Story = {
    args: {
        content: 'Tooltip on bottom',
        position: 'bottom',
        children: <BgrButton title="Hover me" />,
    },
}

export const Left: Story = {
    args: {
        content: 'Tooltip on left',
        position: 'left',
        children: <BgrButton title="Hover me" />,
    },
}

export const Right: Story = {
    args: {
        content: 'Tooltip on right',
        position: 'right',
        children: <BgrButton title="Hover me" />,
    },
}

export const LongText: Story = {
    args: {
        content:
            'This is a very long tooltip text that will wrap to multiple lines if needed',
        position: 'top',
        children: <BgrButton title="Hover me" />,
    },
}

export const WithReactNode: Story = {
    args: {
        content: (
            <div>
                <strong>Bold text</strong>
                <br />
                Regular text
            </div>
        ),
        position: 'top',
        children: <BgrButton title="Hover me" />,
    },
}

export const AllPositions: Story = {
    render: () => (
        <div className="flex flex-col gap-8 items-center p-8">
            <BgrTooltip content="Top tooltip" position="top">
                <BgrButton title="Top" />
            </BgrTooltip>
            <div className="flex gap-4">
                <BgrTooltip content="Left tooltip" position="left">
                    <BgrButton title="Left" />
                </BgrTooltip>
                <BgrTooltip content="Right tooltip" position="right">
                    <BgrButton title="Right" />
                </BgrTooltip>
            </div>
            <BgrTooltip content="Bottom tooltip" position="bottom">
                <BgrButton title="Bottom" />
            </BgrTooltip>
        </div>
    ),
}

