import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  modal,
  Sheet,
  ModalProvider,
  registerSimpleSheet,
  SimpleSheet,
} from "@orderly.network/ui";
import { useState } from "react";

const meta = {
  title: "Base/Sheet",
  component: Sheet,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  decorators: [
    (Story: any) => (
      <ModalProvider>
        <Story />
      </ModalProvider>
    ),
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    // open: true,
    // title: "Title",
    // size: "md",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CommandStyle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Open
        </Button>

        <SimpleSheet title="Demo" open={open} onOpenChange={setOpen}>
          SimpleSheet
        </SimpleSheet>
      </div>
    );
  },
};