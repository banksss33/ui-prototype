import type { Meta, StoryObj } from '@storybook/react';

import { ButtonCircle } from './button-circle';

const meta: Meta<typeof ButtonCircle> = {
  title: 'Example/ButtonCircle',
  component: ButtonCircle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    children: {
      control: 'text',
    },
  },
  args: { onClick: () => console.log('Circle button clicked') },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    children: '→',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: '→',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: '→',
    size: 'large',
  },
};

export const WithIcon: Story = {
  args: {
    children: '✓',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    children: '×',
    disabled: true,
    size: 'medium',
  },
};