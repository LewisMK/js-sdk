import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard, ReferralProvider } from "@orderly.network/affiliate";
import { TradingRewardsLayoutWidget } from "@orderly.network/trading-rewards";

const meta: Meta<typeof Dashboard.HomePage> = {
  title: "Package/Affiliate/homePage",
  component: Dashboard.HomePage,
  decorators: [
    (Story: any) => {
      return (
        <ReferralProvider
          becomeAnAffiliateUrl="https://orderly.network"
          learnAffiliateUrl="https://orderly.network"
          referralLinkUrl="https://ordely.network"
          showReferralPage={() => {
            console.log("show referral page");
          }}
          // onEnterAffiliatePage={() => {
          //   console.log("show affiliate page");
          // }}
          // onEnterTraderPage={() => {
          //   console.log("show trader page");
          // }}
          // chartConfig={
          //   {
          //     trader: {
          //       bar: { ...InitialBarStyle, fill: "#00B49E", columnPadding: 20 }
          //     },
          //     affiliate: {
          //       bar: { ...InitialBarStyle, fill: "#608CFF", columnPadding: 20 }
          //     },
          //   }
          // }
          // intl={
          // {
          // messages,
          // }
          // }
          splashPage={() => (
            <div style={{ backgroundColor: "#FF0000" }}>df</div>
          )}
          overwrite={{
            shortBrokerName: "Mark",
            brokerName: "Mark Pan",
            ref: {
              // gradientTitle: "Mark",
              // top: (state) =>  (<div>ASD</div>),
              // card: (state) => (<div>GFHJK</div>),
              // card: {
              // refClassName: "orderly-text-red-900",
              // refIcon: (<div className="orderly-bg-white orderly-h-full">DDS</div>),
              // ref: (state) => (<div>gdjsj</div>)
              // traderClassName: "orderly-text-red-900",
              // traderIcon: (<div className="orderly-bg-white orderly-h-full">DDS</div>),
              // trader: (state) => (<div>gdjsj</div>)
              // },
              // step: (state) => (<div>DJD</div>)
              // step: {
              //   applyIcon: (<div>Apply</div>),
              //   shareIcon: (<div>Share</div>),
              //   earnIcon: (<div>Earn</div>),
              // }
            },
          }}
        >
          <Story />
        </ReferralProvider>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  args: {
    p: 5,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

export const LayoutPage: Story = {
  render: () => {
    return (
      <TradingRewardsLayoutWidget>
        <Dashboard.HomePage />
      </TradingRewardsLayoutWidget>
    );
  },
};
