import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrRadio from './BgrRadio'
import type { BgrRadioProps } from './BgrRadio'

const meta = {
    title: 'Components/BgrRadio',
    component: BgrRadio,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
    },
    args: {
        onChange: fn(),
    },
} satisfies Meta<typeof BgrRadio>

export default meta
type Story = StoryObj<typeof meta>

const defaultOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

const DefaultComponent = (args: BgrRadioProps) => {
    const [value, setValue] = useState(args.value)
    return (
        <BgrRadio
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val)
                args.onChange?.(val)
            }}
        />
    )
}

export const Default: Story = {
    args: {
        options: defaultOptions,
        name: 'radio-group',
        value: 'option1',
        direction: 'horizontal',
    },
    render: DefaultComponent,
}

const VerticalComponent = (args: BgrRadioProps) => {
    const [value, setValue] = useState(args.value)
    return (
        <BgrRadio
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val)
                args.onChange?.(val)
            }}
        />
    )
}

export const Vertical: Story = {
    args: {
        options: defaultOptions,
        name: 'radio-group-vertical',
        value: 'option1',
        direction: 'vertical',
    },
    render: VerticalComponent,
}

const WithDisabledComponent = (args: BgrRadioProps) => {
    const [value, setValue] = useState(args.value)
    return (
        <BgrRadio
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val)
                args.onChange?.(val)
            }}
        />
    )
}

export const WithDisabled: Story = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2 (Disabled)', value: 'option2', disabled: true },
            { label: 'Option 3', value: 'option3' },
        ],
        name: 'radio-group-disabled',
        value: 'option1',
        direction: 'horizontal',
    },
    render: WithDisabledComponent,
}

const ManyOptionsComponent = (args: BgrRadioProps) => {
    const [value, setValue] = useState(args.value)
    return (
        <BgrRadio
            {...args}
            value={value}
            onChange={(val) => {
                setValue(val)
                args.onChange?.(val)
            }}
        />
    )
}

export const ManyOptions: Story = {
    args: {
        options: [
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
            { label: 'Option 3', value: 'option3' },
            { label: 'Option 4', value: 'option4' },
            { label: 'Option 5', value: 'option5' },
        ],
        name: 'radio-group-many',
        value: 'option3',
        direction: 'horizontal',
    },
    render: ManyOptionsComponent,
}

