import type { Meta, StoryObj } from '@storybook/react';

import { ButtonSquare } from './button-square';

const meta: Meta<typeof ButtonSquare> = {
  title: 'Example/ButtonSquare',
  component: ButtonSquare,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
    },
  },
  args: { onClick: () => console.log('Button clicked') },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    children: 'Click Me!',
  },
};