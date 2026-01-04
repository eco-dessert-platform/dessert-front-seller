import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { useState } from 'react'
import BgrPagination from './BgrPagination'
import type { BgrPaginationProps } from './BgrPagination'

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

const DefaultComponent = (args: BgrPaginationProps) => {
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
}

// 첫 번째 그룹 (1-5)
export const FirstGroup: Story = {
    args: {
        currentPage: 1,
        totalPages: 15,
    },
    render: DefaultComponent,
}

// 중간 그룹 (6-10)
const MiddleGroupComponent = (args: BgrPaginationProps) => {
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
}

export const MiddleGroup: Story = {
    args: {
        currentPage: 6,
        totalPages: 15,
    },
    render: MiddleGroupComponent,
}

// 마지막 그룹 (11-15)
const LastGroupComponent = (args: BgrPaginationProps) => {
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
}

export const LastGroup: Story = {
    args: {
        currentPage: 11,
        totalPages: 15,
    },
    render: LastGroupComponent,
}

// 5페이지 이하 (그룹이 하나만 있는 경우)
const FewPagesComponent = (args: BgrPaginationProps) => {
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
}

export const FewPages: Story = {
    args: {
        currentPage: 2,
        totalPages: 5,
    },
    render: FewPagesComponent,
}

// 많은 페이지 (100페이지)
const ManyPagesComponent = (args: BgrPaginationProps) => {
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
}

export const ManyPages: Story = {
    args: {
        currentPage: 50,
        totalPages: 100,
    },
    render: ManyPagesComponent,
}
