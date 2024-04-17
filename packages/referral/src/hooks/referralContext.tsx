import { usePrivateQuery } from "@orderly.network/hooks";
import { FC, PropsWithChildren, ReactNode, createContext, useEffect, useMemo } from "react";
import { API } from "../types/api";
import { useDaily } from "./useDaily";
import { XAxis, YAxis, BarStyle } from "../components";
import { formatYMDTime } from "../utils/utils";
import { IntlProvider, MessageFormatElement } from "react-intl";
import { en } from "../locale/en-US";

export type UserVolumeType = {
    "1d_volume"?: number,
    "7d_volume"?: number,
    "30d_volume"?: number,
    "all_volume"?: number,
}

export type OverwiteCard = {
    ref?: BuildNode,
    refClassName?: string,
    refIcon?: ReactNode,

    trader?: BuildNode,
    traderClassName?: string,
    traderIcon?: ReactNode,
}

export type Overwrite = {
    ref?: {
        gradientTitle?: string,
        top?: BuildNode,
        card?: ReactNode | OverwiteCard,
        step?: BuildNode | {
            applyIcon?: ReactNode,
            shareIcon?: ReactNode,
            earnIcon?: ReactNode,
        },

    }
};

export type ChartConfig = {
    affiliate: {
        bar?: BarStyle,
        yAxis?: YAxis,
        xAxis?: XAxis,
    },
    trader: {
        bar?: BarStyle,
        yAxis?: YAxis,
        xAxis?: XAxis,
    }
};

export type ReferralContextProps = {
    //** click become an affiliate, If this method is implemented, the `becomeAnAffiliateUrl` will not work */
    becomeAnAffiliate?: () => void,
    //** set become an affiliate url, default is `https://orderly.network/` */
    becomeAnAffiliateUrl?: string,
    //** bind refferal code callback */
    bindReferralCodeState?: (success: boolean, error: any, hide: any, queryParams: any) => void,
    //** click learn affilate, if this method is implemented, the `learnAffilateUrl` will not work */
    learnAffiliate?: () => void,
    //** set learn affiliate url, default is `https://orderly.network/` */
    learnAffiliateUrl?: string,
    //** default is `https://orderly.network/` */
    referralLinkUrl: string,
    //** referral index page */
    showReferralPage?: () => void,
    enterTraderPage?: (params?: any) => void,
    enterAffiliatePage?: (params?: any) => void,
    //** tab + tab content */
    showDashboard?: () => void,
    //** col chart config */
    chartConfig?: ChartConfig,
    //** overwrite refferal */
    overwrite: Overwrite,
}

export type ReferralContextReturns = {
    referralInfo?: API.ReferralInfo,
    isAffiliate: boolean,
    isTrader: boolean,
    mutate: any,
    userVolume?: UserVolumeType
    dailyVolume?: API.DayliVolume[],
} & ReferralContextProps;

export const ReferralContext = createContext<ReferralContextReturns>({} as ReferralContextReturns);

export type BuildNode = (state: ReferralContextReturns) => ReactNode;

export const ReferralProvider: FC<PropsWithChildren<ReferralContextProps & {
    intl?: {
        messages?: Record<string, string> | Record<string, MessageFormatElement[]>,
        locale: string,
        defaultLocale?: string,
    }
}>> = (props) => {
    const {
        becomeAnAffiliate,
        becomeAnAffiliateUrl = "https://orderly.network/",
        bindReferralCodeState,
        learnAffiliate,
        learnAffiliateUrl= "https://orderly.network/",
        referralLinkUrl= "https://orderly.network/",
        showReferralPage,
        enterTraderPage,
        enterAffiliatePage,
        chartConfig,
        intl = {
            messages: en,
            locale: "en",
            defaultLocale: "en",
        },
        overwrite,
    } = props;

    const {
        data,
        mutate: referralInfoMutate
    } = usePrivateQuery<API.ReferralInfo>("/v1/referral/info", {
        revalidateOnFocus: true,
    });


    const {
        data: dailyVolume,
        mutate: dailyVolumeMutate
    } = useDaily();

    const {
        data: volumeStatistics,
        mutate: volumeStatisticsMutate
    } = usePrivateQuery<API.UserVolStats>("/v1/volume/user/stats", {
        revalidateOnFocus: true,
    });

    const isAffiliate = useMemo(() => {
        return (data?.referrer_info?.referral_codes?.length || 0) > 0;
    }, [data?.referrer_info]);

    const isTrader = useMemo(() => {
        return (data?.referee_info.referer_code?.length || 0) > 0;
    }, [data?.referee_info]);


    const userVolume = useMemo(() => {

        const volume: any = {};

        if (dailyVolume && (dailyVolume.length) > 0) {
            const now = formatYMDTime(new Date().toLocaleDateString());
            const index = dailyVolume.findIndex((item) => {
                const itemDate = item.date;
                return itemDate === now;
            });
            let oneDayVolume = 0;
            if (index !== -1) {
                oneDayVolume = dailyVolume[index].perp_volume;
            }
            volume["1d_volume"] = oneDayVolume;
        }

        if (volumeStatistics) {
            volume["7d_volume"] = volumeStatistics.perp_volume_last_7_days;
            volume["30d_volume"] = volumeStatistics.perp_volume_last_30_days;
            volume["all_volume"] = volumeStatistics.perp_volume_ltd;
        }
        return volume;

    }, [
        dailyVolume,
        volumeStatistics
    ]);


    const mutate = () => {
        volumeStatisticsMutate();
        dailyVolumeMutate();
        referralInfoMutate();
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const refCode = searchParams.get('ref');
        if (refCode) {
            localStorage.setItem("referral_code", refCode);
        }
    }, []);


    const { messages, locale, defaultLocale } = intl;



    return (
        <IntlProvider
            messages={messages}
            locale={locale}
            defaultLocale={defaultLocale}
        >
            <ReferralContext.Provider value={{
                referralInfo: data,
                isAffiliate: isAffiliate,
                isTrader: isTrader,
                // isAffiliate: false,
                // isTrader: false,
                mutate,
                becomeAnAffiliate,
                becomeAnAffiliateUrl,
                bindReferralCodeState,
                learnAffiliate,
                learnAffiliateUrl,
                referralLinkUrl,
                userVolume,
                dailyVolume,
                showReferralPage,
                enterTraderPage,
                enterAffiliatePage,
                chartConfig,
                overwrite,
            }}>
                {props.children}
            </ReferralContext.Provider>
        </IntlProvider>
    );
}