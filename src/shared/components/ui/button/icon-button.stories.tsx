import { Meta, StoryObj } from '@storybook/react'
import { IconButton } from './icon-button'
import ForwardMediumArrow from '@/assets/icons/arrow/forward-medium-arrow.svg?react'

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '색상',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: '버튼 크키',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    Icon: {
      control: false,
      description: '아이콘',
    },
  },
} satisfies Meta<typeof IconButton>

export default meta

type Story = StoryObj<typeof IconButton>

export const Default: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    Icon: <ForwardMediumArrow />,
  },
}
