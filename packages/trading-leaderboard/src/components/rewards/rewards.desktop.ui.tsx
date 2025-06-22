import { FC, useMemo, useState } from "react";
import { useTranslation, Trans } from "@orderly.network/i18n";
import { InfoCircleIcon, Tooltip, Text, Button, cn } from "@orderly.network/ui";
import { CampaignConfig, UserData } from "../campaigns/type";
import {
  calculateEstimatedRewards,
  calculateEstimatedTickets,
  calculateUserPoolReward,
  formatRewardAmount,
  formatTicketCount,
  calculateTicketProgress,
} from "./utils";

interface RewardsDesktopUIProps {
  campaign?: CampaignConfig;
  userdata?: UserData;
  onLearnMore: () => void;
  onTradeNow: () => void;
  isMobile?: boolean;
}

export const RewardsDesktopUI: FC<RewardsDesktopUIProps> = ({
  campaign,
  userdata,
  onLearnMore,
  onTradeNow,
  isMobile,
}) => {
  const { t } = useTranslation();
  // Use mock data for userdata if not provided
  const currentUserData = userdata;

  // Calculate estimated rewards
  const estimatedRewards =
    campaign && currentUserData
      ? calculateEstimatedRewards(currentUserData, campaign)
      : null;

  // Calculate estimated tickets
  const estimatedTickets =
    campaign?.ticket_rules && currentUserData
      ? calculateEstimatedTickets(currentUserData, campaign.ticket_rules)
      : 0;

  const rewardText = estimatedRewards
    ? formatRewardAmount(estimatedRewards.amount, estimatedRewards.currency)
    : "0 USDC";

  const ticketText = formatTicketCount(estimatedTickets);

  const canTrade = useMemo(() => {
    return (
      campaign?.start_time &&
      campaign?.end_time &&
      campaign.start_time < new Date().toISOString() &&
      campaign.end_time > new Date().toISOString()
    );
  }, [campaign]);

  const tooltipContent = useMemo(() => {
    // if (!campaign?.prize_pools || !currentUserData) {
    //   return null;
    // }

    return (
      <div className="oui-flex oui-flex-col oui-gap-1 oui-min-w-[240px]">
        {campaign?.prize_pools?.map((pool) => {
          if (pool.tiers.length == 0) {
            return null;
          }
          const userPoolReward = currentUserData
            ? calculateUserPoolReward(currentUserData, pool)
            : 0;

          return (
            <div
              key={pool.pool_id}
              className="oui-flex oui-items-center oui-justify-between oui-h-[18px]"
            >
              <Text
                size="2xs"
                weight="semibold"
                className="oui-text-base-contrast-54"
              >
                {pool.label}
              </Text>
              <div className="oui-flex oui-items-center oui-gap-1">
                <Text.numeral
                  dp={2}
                  size="2xs"
                  weight="semibold"
                  className="oui-text-base-contrast"
                >
                  {userPoolReward}
                </Text.numeral>
                <Text
                  size="2xs"
                  weight="semibold"
                  className="oui-text-base-contrast"
                >
                  {pool.currency}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [campaign, currentUserData]);

  const ticketTooltipContent = useMemo(() => {
    const ticketRules = campaign?.ticket_rules;

    if (!ticketRules) {
      return null;
    }

    if (ticketRules.mode === "linear") {
      return (
        <div>
          {t("tradingLeaderboard.earnTickets", {
            ticket: ticketRules?.linear?.tickets,
            amount: ticketRules?.linear?.every,
          })}
        </div>
      );
    }

    return (
      <div className="oui-flex oui-flex-col oui-gap-1 oui-min-w-[240px]">
        {ticketRules?.tiers?.map((tier) => {
          return (
            <div
              key={tier.value}
              className="oui-flex oui-items-center oui-justify-between h-[18px] oui-text-2xs oui-font-semibold"
            >
              <div className="oui-text-base-contrast-54">{`$${tier.value} volume`}</div>
              <div className="oui-text-base-contrast">
                {tier.tickets} tickets
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [campaign]);

  const extraProps = useMemo(() => {
    if (
      !userdata ||
      !campaign?.ticket_rules ||
      campaign.end_time < new Date().toISOString() ||
      campaign.start_time > new Date().toISOString()
    ) {
      return {
        showExtraInfo: false,
        extraInfo: null,
      };
    }

    const progress = calculateTicketProgress(userdata, campaign.ticket_rules);

    if (!progress) {
      return {
        showExtraInfo: false,
        extraInfo: null,
      };
    }

    return {
      showExtraInfo: true,
      extraInfo: progress,
    };
  }, [campaign, userdata]);

  return (
    <div
      className={cn([
        "oui-flex oui-flex-col oui-pb-10 oui-mb-10 oui-max-w-[992px] oui-mx-auto",
        isMobile ? "oui-gap-3" : "oui-gap-6",
      ])}
    >
      <div
        className={cn([
          "oui-w-full oui-flex oui-items-stretch oui-gap-3",
          isMobile ? "oui-px-3" : "",
        ])}
      >
        <RewardItem
          title={t("tradingLeaderboard.estimatedRewards")}
          value={rewardText}
          showTooltip
          tooltip={tooltipContent}
          isMobile={isMobile}
        />
        <RewardItem
          showTooltip={!!campaign?.ticket_rules}
          title={t("tradingLeaderboard.estimatedTicketsEarned")}
          value={ticketText}
          tooltip={ticketTooltipContent}
          {...extraProps}
          isMobile={isMobile}
        />
      </div>
      <div
        className={cn([
          "oui-flex oui-gap-3 oui-justify-center",
          isMobile ? "oui-px-3" : "",
        ])}
      >
        {campaign?.rule_url && (
          <Button
            size={isMobile ? "md" : "lg"}
            variant="outlined"
            className={cn([
              "oui-border-[rgb(var(--oui-gradient-brand-start))] oui-text-[rgb(var(--oui-gradient-brand-start))] hover:oui-bg-[rgb(var(--oui-gradient-brand-start))]/[0.08] active:oui-bg-[rgb(var(--oui-gradient-brand-start))]/[0.08]",
              isMobile ? "oui-flex-1" : "oui-w-[140px]",
            ])}
            onClick={onLearnMore}
          >
            {t("tradingLeaderboard.viewRules")}
          </Button>
        )}
        {canTrade && (
          <Button
            size={isMobile ? "md" : "lg"}
            variant="gradient"
            color="primary"
            className={cn([isMobile ? "oui-flex-1" : "oui-w-[140px]"])}
            onClick={onTradeNow}
          >
            {t("tradingLeaderboard.tradeNow")}
          </Button>
        )}
      </div>
    </div>
  );
};

const RewardItem: FC<{
  title: string;
  value: string;
  showTooltip?: boolean;
  tooltip?: any;
  showExtraInfo?: boolean;
  extraInfo?: {
    percent: number;
    value: number;
  } | null;
  isMobile?: boolean;
}> = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const tooltipProps = useMemo(() => {
    if (!props.isMobile) {
      return {};
    }
    return {
      open: tooltipOpen,
      onOpenChange: setTooltipOpen,
    };
  }, [tooltipOpen, props.isMobile, setTooltipOpen]);

  return (
    <div className="oui-flex-1 oui-px-5 oui-py-4 oui-flex oui-flex-col oui-items-center oui-bg-base-9 oui-rounded-2xl oui-justify-center">
      <div
        className={cn([
          "oui-text-base-contrast-54",
          props.isMobile
            ? "oui-text-2xs oui-leading-[15px] oui-h-[15px]"
            : "oui-text-sm oui-font-semibold",
        ])}
      >
        {props.title}
      </div>
      <div className="oui-flex oui-items-center oui-gap-2">
        <Text.gradient
          weight="bold"
          color="brand"
          className={cn([
            "oui-trading-leaderboard-title",
            props.isMobile
              ? "oui-text-base oui-leading-[16px] oui-h-[16px]"
              : "oui-text-[32px] oui-h-10 oui-leading-10",
          ])}
        >
          {props.value}
        </Text.gradient>
        {props.showTooltip && (
          <Tooltip content={props.tooltip} {...tooltipProps}>
            <div
              className="oui-flex oui-items-center oui-justify-center oui-w-4 oui-h-4"
              onClick={() => setTooltipOpen(true)}
            >
              <InfoCircleIcon className="oui-cursor-pointer" />
            </div>
          </Tooltip>
        )}
      </div>
      {props.showExtraInfo && (
        <div
          className={cn([
            "oui-flex oui-flex-col oui-items-center oui-justify-end",
            props.isMobile ? "oui-mt-2" : "",
          ])}
        >
          <div className="oui-text-base-contrast-36 oui-text-2xs oui-font-semibold oui-flex oui-flex-col oui-items-center oui-gap-1">
            <div
              className={cn([
                "oui-w-[225px] oui-h-[18px] oui-p-[2px] oui-bg-base-5 oui-rounded-[100px] oui-flex oui-items-center",
                props.isMobile ? "oui-w-full" : "oui-w-[225px]",
              ])}
            >
              <div
                className={cn([
                  "oui-h-[14px] oui-rounded-[100px]",
                  "oui-bg-[linear-gradient(270deg,rgb(var(--oui-gradient-brand-start))_0%,rgb(var(--oui-gradient-brand-end))_100%)]",
                ])}
                style={{ width: `${props?.extraInfo?.percent}%` }}
              />
            </div>
            <div
              className={cn([
                "oui-text-center oui-font-semibold",
                props.isMobile ? "oui-text-2xs oui-leading-[15px]" : "",
              ])}
            >
              {/* @ts-ignore */}
              <Trans
                i18nKey="tradingLeaderboard.tradeForMoreTickets"
                components={[
                  <span key="0" className="oui-text-base-contrast">
                    ${props?.extraInfo?.value?.toFixed(2)}
                  </span>,
                ]}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
