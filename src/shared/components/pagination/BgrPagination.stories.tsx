import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrPagination from './BgrPagination'

const meta = {
    title: 'Components/BgrPagination',
    component: BgrPagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        onPageChange: fn(),
    },
} satisfies Meta<typeof BgrPagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        currentPage: 1,
        totalPages: 10,
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)
        return (
            <BgrPagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange?.(page)
                }}
            />
        )
    },
}

export const MiddlePage: Story = {
    args: {
        currentPage: 5,
        totalPages: 10,
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)
        return (
            <BgrPagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange?.(page)
                }}
            />
        )
    },
}

export const LastPage: Story = {
    args: {
        currentPage: 10,
        totalPages: 10,
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)
        return (
            <BgrPagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange?.(page)
                }}
            />
        )
    },
}

export const FewPages: Story = {
    args: {
        currentPage: 2,
        totalPages: 5,
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)
        return (
            <BgrPagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange?.(page)
                }}
            />
        )
    },
}

export const ManyPages: Story = {
    args: {
        currentPage: 50,
        totalPages: 100,
    },
    render: (args) => {
        const [currentPage, setCurrentPage] = useState(args.currentPage)
        return (
            <BgrPagination
                {...args}
                currentPage={currentPage}
                onPageChange={(page) => {
                    setCurrentPage(page)
                    args.onPageChange?.(page)
                }}
            />
        )
    },
}

