import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import BgrThumbnail from './BgrThumbnail'

const meta = {
    title: 'Components/BgrThumbnail',
    component: BgrThumbnail,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        showPagination: {
            control: 'boolean',
        },
        showSoldOut: {
            control: 'boolean',
        },
    },
    args: {
        onClick: fn(),
    },
} satisfies Meta<typeof BgrThumbnail>

export default meta
type Story = StoryObj<typeof meta>

const sampleImageUrl =
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop'

export const Default: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Thumbnail',
        size: 'md',
    },
}

export const Small: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Small Thumbnail',
        size: 'sm',
    },
}

export const Large: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Large Thumbnail',
        size: 'lg',
    },
}

export const WithPagination: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Thumbnail with Pagination',
        size: 'md',
        showPagination: true,
        paginationText: '1/5',
    },
}

export const SoldOut: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Sold Out Thumbnail',
        size: 'md',
        showSoldOut: true,
        soldOutText: 'Sold Out',
    },
}

export const NoImage: Story = {
    args: {
        alt: 'No Image',
        size: 'md',
    },
}

export const Clickable: Story = {
    args: {
        src: sampleImageUrl,
        alt: 'Clickable Thumbnail',
        size: 'md',
        onClick: fn(),
    },
}

export const AllSizes: Story = {
    render: () => (
        <div className="flex gap-4 items-end">
            <BgrThumbnail src={sampleImageUrl} alt="Small" size="sm" />
            <BgrThumbnail src={sampleImageUrl} alt="Medium" size="md" />
            <BgrThumbnail src={sampleImageUrl} alt="Large" size="lg" />
        </div>
    ),
}

export const WithFeatures: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <BgrThumbnail
                src={sampleImageUrl}
                alt="With Pagination"
                size="md"
                showPagination={true}
                paginationText="2/10"
            />
            <BgrThumbnail
                src={sampleImageUrl}
                alt="Sold Out"
                size="md"
                showSoldOut={true}
                soldOutText="품절"
            />
        </div>
    ),
}

