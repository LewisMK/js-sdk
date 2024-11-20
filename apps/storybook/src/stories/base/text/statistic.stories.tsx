import type { Meta, StoryObj } from "@storybook/react";
import { EditIcon, Statistic } from "@orderly.network/ui";

const meta: Meta<typeof Statistic> = {
  title: "Base/Typography/Statistic",
  component: Statistic,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  // tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    //   backgroundColor: { control: 'color' },
  },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    // p: 5,
    // py: 2,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Unreal. PnL",
    children: "1234.5609",
    valueProps: {
      coloring: true,
      showIdentifier: true,
      unit: "USDC",
      // surfix:'USDC',
    },
  },
};
export const ReactNodeSurfix: Story = {
  args: {
    label: "Unreal. PnL",
    children: "1234.5609",
    valueProps: {
      coloring: true,
      showIdentifier: true,
      surfix: <span className="oui-text-xs">(45.7%)</span>,
    },
  },
};
export const CustomValue: Story = {
  args: {
    label: "Unreal. PnL",
    children: (
      <div className="oui-flex oui-items-center">
        <span>10</span>
        <span>x</span>
        <button className="oui-ml-1">
          <EditIcon size={18} />
        </button>
      </div>
    ),
  },
};
export const RightAlign: Story = {
  args: {
    label: "Available to withdraw",
    children: "1234.5609",
    align: "right",
    valueProps: {
      dp: 3,
    },
  },
};