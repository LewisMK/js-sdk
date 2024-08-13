import type { Meta, StoryObj } from "@storybook/react";
import { fn } from '@storybook/test';

import { OrderlyApp } from "@orderly.network/react-app";
import { ConnectorProvider } from "@orderly.network/web3-onboard";
// import { Button, modal } from "@orderly.network/ui";
import { TPSLWidget, PositionTPSLConfirm , TPSLEditorWidget} from '@orderly.network/ui-positions';
import { Box } from "@orderly.network/ui";

const meta = {
  title: "Package/ui-positions/tpsl",
  component: TPSLWidget,
  subcomponents: {
    PositionTPSLConfirm
  },
  decorators: [
    (Story) => (
      <ConnectorProvider>
        <OrderlyApp brokerId={"orderly"} brokerName={""} networkId={"testnet"}>
          <Story />
        </OrderlyApp>
      </ConnectorProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },

  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    symbol: 'PERP_BTC_USDC',
    position: {
      "symbol": "PERP_BTC_USDC",
      "position_qty": 0.01129,
      "cost_position": 786.620603,
      "last_sum_unitary_funding": 14680.7,
      "pending_long_qty": 0,
      "pending_short_qty": 0,
      "settle_price": 69674.10124004,
      "average_open_price": 68400.7,
      "unsettled_pnl": -247.497136,
      "mark_price": 64064.8,
      "est_liq_price": 0,
      "timestamp": 1717147723392,
      "mmr": 0.012,
      "imr": 0.1,
      "IMR_withdraw_orders": 0.1,
      "MMR_with_orders": 0.012,
      "pnl_24_h": 0,
      "fee_24_h": 0
    },
    onCancel: fn()
  },
} satisfies Meta<typeof TPSLWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Stroy) => <Box width={'360px'} p={5} intensity={800} r={'lg'}>{Stroy()}</Box>
  ]
};


export const PositionConfirm: Story = {
  render: (args) => <PositionTPSLConfirm {...args}/>,
  decorators: [
    (Stroy) => <Box width={'320px'} px={5} intensity={800} r={'lg'}>{Stroy()}</Box>
  ],
  args:{
    symbol: 'PERP_BTC_USDC',
  }
}

export const Dialog: Story = {
  render:(args)=>{
    return <TPSLEditorWidget {...args}/>
  },
  args:{
    symbol: 'PERP_BTC_USDC',
    position: {
      "symbol": "PERP_BTC_USDC",
      "position_qty": 0.01129,
      "cost_position": 786.620603,
      "last_sum_unitary_funding": 14680.7,
      "pending_long_qty": 0,
      "pending_short_qty": 0,
      "settle_price": 69674.10124004,
      "average_open_price": 68400.7,
      "unsettled_pnl": -247.497136,
      "mark_price": 64064.8,
      "est_liq_price": 0,
      "timestamp": 1717147723392,
      "mmr": 0.012,
      "imr": 0.1,
      "IMR_withdraw_orders": 0.1,
      "MMR_with_orders": 0.012,
      "pnl_24_h": 0,
      "fee_24_h": 0
    },
    onCancel: fn()
  }
}