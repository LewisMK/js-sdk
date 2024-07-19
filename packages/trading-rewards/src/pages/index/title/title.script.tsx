import { ReactNode } from "react";
import { useTradingRewardsContext } from "../provider";

export type TitleConfig = {
  /// default is `Trading Rewards`
  title?: string | ReactNode;
  /// default is `Trade with Orderly’s brokers to earn rewards.`
  subtitle?: string | ReactNode;
  /// default is `Learn more about Orderly Trading Rewards Program in Trading Rewards Docs`
  content?: string | ReactNode;
  /// default is { url: 'https://orderly.network/docs/introduction/tokenomics/trading-rewards', target: "_blank"}
  docOpenOptions?: {
    url?: string;
    target?: string;
    features?: string;
  };
  brokerName?: string;
};

export const useTitleScript = (): TitleConfig => {

    const { titleConfig } = useTradingRewardsContext();

    return titleConfig;
};
