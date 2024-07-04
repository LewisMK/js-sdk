import { ENVType, useGetEnv, useWalletRewardsHistory } from "@orderly.network/hooks";
import { useTradingRewardsContext } from "../provider";
import { useMemo } from "react";

export type AvailableReturns = {
  order?: number;
  esorder?: number;
  goToClaim?: (e: any) => void;
};

export const useAvailableScript = (): AvailableReturns => {
  const { totalOrderClaimedReward, walletRewardsHistory } = useTradingRewardsContext();
  const { data: totalClaimedReward } = totalOrderClaimedReward;

  const { data } = walletRewardsHistory;
  const totalGetReward = data?.wallet_lifetime_trading_rewards_order;

  const env = useGetEnv();
  const goToClaim = (e: any) => {
    const url = `https://${env !== ENVType.prod ? `${env}-` : ""}app.orderly.network/tradingRewards`;
    window.open(url, "_blank");
  };

  const availableOrder = useMemo(() => {
    if (
      typeof totalClaimedReward !== "undefined" &&
      typeof totalGetReward !== "undefined"
    ) {
      return totalGetReward - totalClaimedReward;
    }

    return undefined;
  }, [totalGetReward, totalClaimedReward]);

  const order = availableOrder;
  const esorder = 0;
  return {
    order,
    esorder,
    goToClaim,
  };
};