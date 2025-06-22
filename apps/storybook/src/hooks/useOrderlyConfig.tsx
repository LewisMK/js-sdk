import { useMemo } from "react";
import { RestrictedInfoOptions } from "@orderly.network/hooks";
import { useTranslation } from "@orderly.network/i18n";
import { AppLogos } from "@orderly.network/react-app";
import { TradingPageProps } from "@orderly.network/trading";
import {
  TradingActiveIcon,
  TradingInactiveIcon,
  PortfolioActiveIcon,
  PortfolioInactiveIcon,
  LeaderboardActiveIcon,
  LeaderboardInactiveIcon,
  MarketsActiveIcon,
  MarketsInactiveIcon,
  useScreen,
} from "@orderly.network/ui";
import {
  FooterProps,
  MainNavWidgetProps,
  BottomNavProps,
} from "@orderly.network/ui-scaffold";
import {
  AffiliatesActiveIcon,
  AffiliatesIcon,
  OrderlyActiveIcon,
  OrderlyIcon,
  TradingRewardsActiveIcon,
  TradingRewardsIcon,
} from "../components/icons";

export type OrderlyConfig = {
  orderlyAppProvider: {
    appIcons: AppLogos;
    restrictedInfo?: RestrictedInfoOptions;
  };
  scaffold: {
    mainNavProps: MainNavWidgetProps;
    bottomNavProps: BottomNavProps;
    footerProps: FooterProps;
  };
  tradingPage: {
    tradingViewConfig: TradingPageProps["tradingViewConfig"];
    sharePnLConfig: TradingPageProps["sharePnLConfig"];
    referral?: any;
  };
};

export const useOrderlyConfig = () => {
  const { t } = useTranslation();
  const { isMobile } = useScreen();

  return useMemo<OrderlyConfig>(() => {
    return {
      scaffold: {
        topBar: <></>,
        mainNavProps: {
          // leading: <CustomProductNav />,
          trailing: null,
          mainMenus: [
            { name: t("common.trading"), href: "/", isHomePageInMobile: true },
            { name: t("common.portfolio"), href: "/portfolio" },
            { name: t("common.markets"), href: "/markets" },
            {
              name: t("tradingLeaderboard.leaderboard"),
              href: "/leaderboard",
            },
          ],
          initialMenu: "/",
          campaigns: {
            name: t("tradingRewards.rewards"),
            href: "/rewards",
            icon: "box-ani.gif",
            isSubMenuInMobile: true,
            subMenuBackNav: {
              name: t("common.portfolio"),
              href: "/portfolio",
            },
            children: [
              {
                name: t("common.affiliate"),
                href: "/rewards/affiliate",
                tag: t("extend.affiliate.tag"),
                description: t("extend.affiliate.description"),
                icon: <AffiliatesIcon size={14} />,
                activeIcon: <AffiliatesActiveIcon size={14} />,
              },
              {
                name: t("common.tradingRewards"),
                href: "/rewards/trading",
                description: t("extend.tradingRewards.description"),
                icon: <TradingRewardsIcon size={14} />,
                activeIcon: <TradingRewardsActiveIcon size={14} />,
              },
              {
                name: t("extend.staking"),
                href: "https://app.orderly.network/staking",
                description: t("extend.staking.description"),
                target: "_blank",
                icon: <OrderlyIcon size={14} />,
                activeIcon: <OrderlyActiveIcon size={14} />,
              },
            ],
          },
        },
        bottomNavProps: {
          mainMenus: [
            {
              name: t("common.markets"),
              href: "/markets",
              activeIcon: <MarketsActiveIcon />,
              inactiveIcon: <MarketsInactiveIcon />,
            },
            {
              name: t("common.trading"),
              href: "/",
              activeIcon: <TradingActiveIcon />,
              inactiveIcon: <TradingInactiveIcon />,
            },
            {
              name: t("tradingLeaderboard.leaderboard"),
              href: "/leaderboard",
              activeIcon: <LeaderboardActiveIcon />,
              inactiveIcon: <LeaderboardInactiveIcon />,
            },
            {
              name: t("common.portfolio"),
              href: "/portfolio",
              activeIcon: <PortfolioActiveIcon />,
              inactiveIcon: <PortfolioInactiveIcon />,
            },
          ],
        },
        footerProps: {
          telegramUrl: "https://orderly.network",
          discordUrl: "https://discord.com/invite/orderlynetwork",
          twitterUrl: "https://twitter.com/OrderlyNetwork",
        },
      },
      orderlyAppProvider: {
        appIcons: {
          main: {
            component: <img src="/orderly-logo.svg" style={{ height: 40 }} />,
          },
          secondary: {
            img: "/orderly-logo-secondary.svg",
          },
        },
        restrictedInfo: {
          enableDefault: true,
          customRestrictedIps: [],
          customRestrictedRegions: [],
          // content: ({ ip, brokerName }) =>
          //   `You are accessing ${brokerName} from an IP address (${ip}) associated with a restricted country. Please refer to our Terms of Use</0>. If you believe this is an error, contact x@orerly.network.`,
        },
      },
      tradingPage: {
        tradingViewConfig: {
          scriptSRC: "/tradingview/charting_library/charting_library.js",
          library_path: "/tradingview/charting_library/",
          customCssUrl: "/tradingview/chart.css",
          // broker config tradingview bg
          // colorConfig: {
          //   downColor: '#BE1630',
          //   upColor: '#373d36',
          //   pnlDownColor: '#BE1630',
          //   pnlUpColor: '#53B049',
          //   // chartBG: '#BE1630',
          //   chartBG: '#6a64ed',
          // },
        },
        sharePnLConfig: {
          backgroundImages: [
            "/pnl/poster_bg_1.png",
            "/pnl/poster_bg_2.png",
            "/pnl/poster_bg_3.png",
            "/pnl/poster_bg_4.png",
          ],

          color: "rgba(255, 255, 255, 0.98)",
          profitColor: "rgba(41, 223, 169, 1)",
          lossColor: "rgba(245, 97, 139, 1)",
          brandColor: "rgba(255, 255, 255, 0.98)",

          // ref
          refLink: "https://orderly.network",
          refSlogan: "NEW BE222",
        },
      },
    };
  }, [t]);
};
