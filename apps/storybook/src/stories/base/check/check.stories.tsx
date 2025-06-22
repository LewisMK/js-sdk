import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@orderly.network/ui";

const meta: Meta<typeof Checkbox> = {
  title: "Base/Checkbox/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "inline-radio",
      },
      options: ["primary", "white"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Primary: Story = {
  render: () => <Checkbox color="primary" />,
};
