import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrDaySelector from './BgrDaySelector'

const meta = {
    title: 'Components/BgrDaySelector',
    component: BgrDaySelector,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onDayChange: fn(),
    },
} satisfies Meta<typeof BgrDaySelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        selectedDays: [],
    },
    render: (args) => {
        const [selectedDays, setSelectedDays] = useState<string[]>(
            args.selectedDays || [],
        )
        return (
            <BgrDaySelector
                selectedDays={selectedDays}
                onDayChange={(days) => {
                    setSelectedDays(days)
                    args.onDayChange?.(days)
                }}
            />
        )
    },
}

export const WithSelectedDays: Story = {
    args: {
        selectedDays: ['mon', 'wed', 'fri'],
    },
    render: (args) => {
        const [selectedDays, setSelectedDays] = useState<string[]>(
            args.selectedDays || [],
        )
        return (
            <BgrDaySelector
                selectedDays={selectedDays}
                onDayChange={(days) => {
                    setSelectedDays(days)
                    args.onDayChange?.(days)
                }}
            />
        )
    },
}

export const AllSelected: Story = {
    args: {
        selectedDays: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    },
    render: (args) => {
        const [selectedDays, setSelectedDays] = useState<string[]>(
            args.selectedDays || [],
        )
        return (
            <BgrDaySelector
                selectedDays={selectedDays}
                onDayChange={(days) => {
                    setSelectedDays(days)
                    args.onDayChange?.(days)
                }}
            />
        )
    },
}

export const WeekdaysOnly: Story = {
    args: {
        selectedDays: ['mon', 'tue', 'wed', 'thu', 'fri'],
    },
    render: (args) => {
        const [selectedDays, setSelectedDays] = useState<string[]>(
            args.selectedDays || [],
        )
        return (
            <BgrDaySelector
                selectedDays={selectedDays}
                onDayChange={(days) => {
                    setSelectedDays(days)
                    args.onDayChange?.(days)
                }}
            />
        )
    },
}

