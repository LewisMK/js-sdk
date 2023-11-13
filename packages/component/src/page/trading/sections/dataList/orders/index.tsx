import { OrdersView } from "@/block/orders";
import { FC, useCallback, useContext, useEffect, useState } from "react";
import {
  useOrderStream,
  useAccount,
  useSessionStorage,
} from "@orderly.network/hooks";
import { TradingPageContext } from "@/page/trading/context/tradingPageContext";
import { API, AccountStatusEnum, OrderEntity } from "@orderly.network/types";
import { TabContext } from "@/tab";
import { OrderStatus } from "@orderly.network/types";

interface Props {
  // symbol: string;
}

export const OrdersPane: FC<Props> = (props) => {
  const context = useContext(TradingPageContext);
  const tabContext = useContext(TabContext);

  const [showAllSymbol, setShowAllSymbol] = useSessionStorage(
    "showAllSymbol_orders",
    true
  );

  const [symbol, setSymbol] = useState(() =>
    showAllSymbol ? "" : context.symbol
  );

  const [data, { isLoading, loadMore, cancelOrder, updateOrder }] =
    useOrderStream({
      status: OrderStatus.INCOMPLETE,
      symbol: symbol,
    });

  const onShowAllSymbolChange = (isAll: boolean) => {
    setSymbol(isAll ? "" : context.symbol);
    setShowAllSymbol(isAll);
  };

  const { state } = useAccount();

  const onCancelOrder = useCallback(
    (orderId: number, symbol: string): Promise<any> => {
      return cancelOrder(orderId, symbol);
    },
    []
  );

  return (
    <OrdersView
      dataSource={state.status < AccountStatusEnum.EnableTrading ? [] : data}
      isLoading={isLoading}
      symbol={context.symbol}
      showAllSymbol={showAllSymbol}
      cancelOrder={onCancelOrder}
      onShowAllSymbolChange={onShowAllSymbolChange}
      editOrder={updateOrder}
      onSymbolChange={context.onSymbolChange}
      loadMore={loadMore}
    />
  );
};
