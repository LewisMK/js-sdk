import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Select, SelectItem } from "@orderly.network/ui";

const meta = {
  title: "Base/Select",
  component: Select,
  subcomponents: { SelectItem },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //   backgroundColor: { control: 'color' },
    size: {
      options: ["sm", "md", "lg", "xl"],
      control: { type: "inline-radio" },
    },
  },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    size: "md",
    error: false,
    disabled: false,
    onValueChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
        <SelectItem value="grapes">Grapes</SelectItem>
      </>
    ),
    value: "apple",
  },
};

export const Chains: Story = {
  render: (args) => {
    return <Select.chains {...args} />;
  },
  args: {
    size: "md",
    error: false,
    currentChain: {
      name: "ETH",
      id: 1,
    },
    chains: [
      {
        name: "ETH",
        id: 1,
      },
    ],
  },
};
