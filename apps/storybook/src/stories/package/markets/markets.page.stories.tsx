import type { Meta, StoryObj } from "@storybook/react";
import {
  MarketsHomePage,
  MarketsHeaderWidget,
  MarketsListFullWidget,
  FavoritesListFullWidget,
  FundingOverviewWidget,
  MarketsDataListWidget,
  MarketsProvider,
  FundingComparisonWidget,
} from "@orderly.network/markets";
import { useScreen } from "@orderly.network/ui";
import { BaseLayout } from "../../../components/layout";

const meta: Meta<typeof MarketsHomePage> = {
  title: "Package/markets/HomePage",
  component: MarketsHomePage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  parameters: {
    layout: "fullscreen",
  },
};

export const LayoutPage: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => {
    const { isMobile } = useScreen();
    return (
      <BaseLayout
        initialMenu="/markets"
        // hide top bar
        topBar={isMobile ? <></> : undefined}
      >
        <MarketsHomePage />
      </BaseLayout>
    );
  },
};

export const Header: Story = {
  render: (args) => {
    return <MarketsHeaderWidget />;
  },
};

export const Favorites: Story = {
  render: (args) => {
    return <FavoritesListFullWidget />;
  },
};

export const AllMarkets: Story = {
  render: (args) => {
    return (
      <MarketsListFullWidget
        type="all"
        initialSort={{ sortKey: "24h_amount", sortOrder: "desc" }}
      />
    );
  },
};

export const NewListings: Story = {
  render: (args) => {
    return (
      <MarketsListFullWidget
        type="new"
        initialSort={{ sortKey: "created_time", sortOrder: "desc" }}
      />
    );
  },
};

export const DataList: Story = {
  render: (args) => {
    return (
      <MarketsProvider>
        <MarketsDataListWidget />
      </MarketsProvider>
    );
  },
};

export const FundingHistory: Story = {
  render: (args) => {
    return <FundingOverviewWidget />;
  },
};

export const FundingComparison: Story = {
  render: (args) => {
    return <FundingComparisonWidget />;
  },
};
