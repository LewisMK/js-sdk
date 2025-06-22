import type { Meta, StoryObj } from "@storybook/react";
// import { fn } from '@storybook/test';
import { Popover, Button, SelectItem } from "@orderly.network/ui";

const meta = {
  title: "Base/Popover",
  component: Popover,
  subcomponents: { SelectItem },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    //   backgroundColor: { control: 'color' },
    size: {
      options: ["sm", "md", "lg"],
      control: { type: "inline-radio" },
    },
  },
  args: {
    align: "left",
    arrow: true,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Popover {...args} content={<div>Popover content</div>}>
      <Button>Open popover</Button>
    </Popover>
  ),
  // args: {
  //   // children: <Button>Open popover</Button>,
  //   // content: <div>Popover content</div>,
  // },
};
