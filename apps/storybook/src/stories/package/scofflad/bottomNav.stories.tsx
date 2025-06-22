import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@orderly.network/ui";
import { FooterWidget, Scaffold } from "@orderly.network/ui-scaffold";

const meta: Meta<typeof FooterWidget> = {
  title: "Package/ui-scaffold/footer",
  component: FooterWidget,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story: any) => (
      <Box intensity={900}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CumstomizeUrls: Story = {
  render: () => {
    return (
      <Scaffold
        footerProps={{
          telegramUrl: "https://orderly.network",
          discordUrl: "https://orderly.network",
          twitterUrl: "https://orderly.network",
          trailing: <a onClick={() => window.open('https://orderly.network')} style={{fontSize: '12px', color:'blue', cursor: 'pointer'}}>Product feedback</a>
        }}
      
      ></Scaffold>
    );
  },
};
