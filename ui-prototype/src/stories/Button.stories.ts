import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circle', 'pill', 'square'],
      description: 'Button shape variant',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    color: {
      control: { type: 'color' },
      description: 'Primary color picker for the button',
    },
    fontSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    },
    textColor: {
      control: { type: 'select' },
      options: ['white', 'black', 'gray'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Square variant stories
export const Square: Story = {
  args: {
    variant: 'square',
    children: 'Square Button',
  },
};

export const SquareLarge: Story = {
  args: {
    variant: 'square',
    size: 'large',
    children: 'Large Square',
  },
};

export const SquareSmall: Story = {
  args: {
    variant: 'square',
    size: 'small',
    children: 'Small Square',
  },
};

// Pill variant stories
export const Pill: Story = {
  args: {
    variant: 'pill',
    children: 'Pill Button',
  },
};

export const PillLarge: Story = {
  args: {
    variant: 'pill',
    size: 'large',
    children: 'Large Pill',
  },
};

export const PillSmall: Story = {
  args: {
    variant: 'pill',
    size: 'small',
    children: 'Small Pill',
  },
};

// Circle variant stories
export const Circle: Story = {
  args: {
    variant: 'circle',
    children: '●',
  },
};

export const CircleLarge: Story = {
  args: {
    variant: 'circle',
    size: 'large',
    children: '●',
  },
};

export const CircleSmall: Story = {
  args: {
    variant: 'circle',
    size: 'small',
    children: '●',
  },
};

// Color variations
export const SquareRed: Story = {
  args: {
    variant: 'square',
    color: '#ef4444',
    children: 'Red Square',
  },
};

export const PillGreen: Story = {
  args: {
    variant: 'pill',
    color: '#22c55e',
    children: 'Green Pill',
  },
};

export const CirclePurple: Story = {
  args: {
    variant: 'circle',
    color: '#a855f7',
    children: '●',
  },
};

// Disabled states
export const SquareDisabled: Story = {
  args: {
    variant: 'square',
    disabled: true,
    children: 'Disabled Square',
  },
};

export const PillDisabled: Story = {
  args: {
    variant: 'pill',
    disabled: true,
    children: 'Disabled Pill',
  },
};

export const CircleDisabled: Story = {
  args: {
    variant: 'circle',
    disabled: true,
    children: '●',
  },
};

// Custom styling examples
export const CustomText: Story = {
  args: {
    variant: 'pill',
    color: '#fbbf24',
    textColor: 'black',
    fontSize: 'lg',
    children: 'Custom Styling',
  },
};

export const LargeFontCircle: Story = {
  args: {
    variant: 'circle',
    color: '#6366f1',
    fontSize: '2xl',
    children: '★',
  },
};

// More Color Examples
export const OrangeSquare: Story = {
  args: {
    variant: 'square',
    color: '#ff6b35',
    children: 'Orange Square',
  },
};

export const TealPill: Story = {
  args: {
    variant: 'pill',
    color: '#50e3c2',
    children: 'Teal Pill',
  },
};

export const PinkCircle: Story = {
  args: {
    variant: 'circle',
    color: '#ec4899',
    children: '●',
  },
};