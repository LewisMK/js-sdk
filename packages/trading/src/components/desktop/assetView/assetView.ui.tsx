import React, { FC, useMemo, useState, useCallback, ReactNode } from "react";
import {
  Flex,
  Text,
  Box,
  Button,
  ArrowDownShortIcon,
  EyeIcon,
  EyeCloseIcon,
  ChevronDownIcon,
  Tooltip,
  Divider,
  gradientTextVariants,
  cn,
  Collapsible,
  CollapsibleContent,
} from "@orderly.network/ui";
import { AssetViewState } from "./assetView.script";
import { AuthGuard } from "@orderly.network/ui-connector";
import { AccountStatusEnum } from "@orderly.network/types";
import { useAccount, useLocalStorage } from "@orderly.network/hooks";
import { useAppContext } from "@orderly.network/react-app";
import { FaucetWidget } from "./faucet/faucet.widget";

interface StatusInfo {
  title: string;
  description: string;
  titleColor?: any;
}

interface TooltipContentProps {
  description: ReactNode;
  formula: ReactNode;
}

interface TotalValueProps {
  totalValue?: number;
  visible?: boolean;
  onToggleVisibility?: () => void;
}

interface AssetDetailProps {
  label: string;
  description: ReactNode;
  formula: ReactNode;
  visible: boolean;
  value?: number | string;
  unit?: string;
  rule?: "percentages";
  isConnected?: boolean;
  showPercentage?: boolean;
  placeholder?: string;
}

interface AssetValueListProps {
  visible?: boolean;
  freeCollateral?: number | null;
  marginRatioVal?: number;
  renderMMR?: string | number;
  isConnected: boolean;
}

const useCurrentStatusText = (): StatusInfo => {
  const { state } = useAccount();
  const { wrongNetwork } = useAppContext();

  return useMemo(() => {
    if (wrongNetwork) {
      return {
        title: "Wrong Network",
        description: "Please switch to a supported network to continue.",
        titleColor: "warning",
      };
    }

    switch (state.status) {
      case AccountStatusEnum.NotConnected:
        return {
          title: "Connect wallet",
          description: "Please connect your wallet before starting to trade.",
        };
      case AccountStatusEnum.NotSignedIn:
        return {
          title: "Sign in",
          description: "Please sign in before starting to trade.",
          titleColor: "primaryLight",
        };
      case AccountStatusEnum.DisabledTrading:
        return {
          title: "Enable trading",
          description: "Enable trading before starting to trade.",
          titleColor: "primaryLight",
        };
      default:
        return {
          title: "",
          description: "",
        };
    }
  }, [state.status, wrongNetwork]);
};

export const TooltipContent: FC<TooltipContentProps> = ({
  description,
  formula,
}) => (
  <div className="oui-leading-[1.5] oui-text-2xs oui-text-base-contrast-80 oui-min-w-[204px] oui-max-w-[240px]">
    <span>{description}</span>
    <Divider className="oui-border-white/10" my={2} />
    <span>{formula}</span>
  </div>
);

const TotalValue: FC<TotalValueProps> = ({
  totalValue = 0,
  visible = true,
  onToggleVisibility,
}) => (
  <Flex direction="column" gap={1} className="oui-text-2xs" itemAlign="center">
    <Text.numeral
      visible={visible}
      weight="bold"
      size="2xl"
      className={gradientTextVariants({ color: "brand" })}
      as="div"
      padding={false}
      dp={2}
    >
      {totalValue ?? "--"}
    </Text.numeral>
    <Flex gap={1} itemAlign="center">
      <Text size="2xs" color="neutral" weight="semibold">
        My Assets (USDC)
      </Text>
      <button onClick={onToggleVisibility}>
        {visible ? (
          <EyeIcon size={18} className="oui-text-base-contrast-54" />
        ) : (
          <EyeCloseIcon size={18} className="oui-text-base-contrast-54" />
        )}
      </button>
    </Flex>
  </Flex>
);

const AssetDetail: FC<AssetDetailProps> = ({
  label,
  description,
  formula,
  visible,
  value,
  unit,
  rule,
  isConnected,
  showPercentage = false,
  placeholder,
}) => (
  <Flex justify="between">
    <Tooltip
      content={
        (<TooltipContent description={description} formula={formula} />) as any
      }
    >
      <Text
        size="2xs"
        color="neutral"
        weight="semibold"
        className="oui-cursor-pointer oui-border-b oui-border-dashed oui-border-b-white/10"
      >
        {label}
      </Text>
    </Tooltip>
    <Text.numeral
        visible={visible}
        size="2xs"
        unit={unit}
        unitClassName="oui-text-base-contrast-36 oui-ml-0.5"
        as="div"
        rule={rule}
        padding={false}
        dp={2}
        // suffix={value && unit}
        placeholder={placeholder}
      >
        {value || '--'}
      </Text.numeral>
  </Flex>
);

const AssetValueList: FC<AssetValueListProps> = ({
  visible = true,
  freeCollateral,
  marginRatioVal,
  renderMMR,
  isConnected,
}) => {
  const [optionsOpen, setOptionsOpen] = useLocalStorage(
    "orderly_entry_asset_list_open",
    false
  );
  const [open, setOpen] = useState<boolean>(optionsOpen);

  const toggleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    setOptionsOpen(!open);
  }, [setOptionsOpen]);

  return (
    <Box>
      <Flex
        justify="center"
        gap={1}
        itemAlign="center"
        className="oui-cursor-pointer"
        onClick={toggleOpen}
      >
        <Divider className="oui-flex-1" />
        <ChevronDownIcon
          size={12}
          color="white"
          className={cn("oui-transition-transform", open && "oui-rotate-180")}
        />
        <Divider className="oui-flex-1" />
      </Flex>
      <Collapsible open={open}>
        <CollapsibleContent>
          <Box className="oui-space-y-1.5">
            <AssetDetail
              label="Free collateral"
              description="Free collateral for placing new orders."
              formula="Free collateral = Total balance + Total unsettlement PnL - Total position initial margin"
              visible={visible}
              value={freeCollateral!}
              unit="USDC"
            />
            <AssetDetail
              label="Margin ratio"
              description="The margin ratio represents the proportion of collateral relative to the total position value."
              formula="Account margin ratio = (Total collateral value / Total position notional) * 100%"
              visible={visible}
              value={marginRatioVal}
              isConnected={isConnected}
              rule="percentages"
              showPercentage={true}
              placeholder="--%"
              />
            <AssetDetail
              label="Maintenance margin ratio"
              description="The minimum margin ratio required to protect your positions from being liquidated. If the Margin ratio falls below the Maintenance margin ratio, the account will be liquidated."
              formula="Account maintenance margin ratio = Sum(Position notional * Symbol maintenance Margin Ratio)  / Total position notional * 100%"
              visible={visible}
              value={renderMMR}
              rule="percentages"
              showPercentage={true}
              placeholder="--%"
            />
          </Box>
        </CollapsibleContent>
      </Collapsible>
    </Box>
  );
};

export const AssetView: FC<AssetViewState> = ({
  networkId,
  isFirstTimeDeposit,
  totalValue,
  onDeposit,
  onWithdraw,
  toggleVisible,
  visible,
  freeCollateral,
  marginRatioVal,
  renderMMR,
  isConnected,
}) => {
  const { title, description, titleColor } = useCurrentStatusText();

  return (
    <Box>
      {title && description && (
        <Flex direction="column" gap={1} className="oui-mb-[32px]">
          <Text size="lg" weight="bold" color={titleColor || "inherit"}>
            {title}
          </Text>
          <Text size="2xs" color="neutral" weight="semibold">
            {description}
          </Text>
        </Flex>
      )}
      <AuthGuard
        networkId={networkId}
        status={AccountStatusEnum.EnableTrading}
        buttonProps={{ size: "md", fullWidth: true }}
      >
        {isFirstTimeDeposit ? (
          <>
            <Box>
              <Flex direction="column" gap={1} className="oui-mb-[32px]">
                <Text.gradient size="lg" weight="bold" color="brand">
                  Deposit to start trade
                </Text.gradient>
                <Text size="2xs" color="neutral" weight="semibold">
                  You can deposit assets from various networks
                </Text>
              </Flex>
            </Box>
            <Button fullWidth size="md" onClick={onDeposit}>
              <ArrowDownShortIcon color="white" opacity={1} />
              <Text>Deposit</Text>
            </Button>

            <Box className='oui-mt-3'>

              <FaucetWidget/>
            </Box>

          </>
        ) : (
          <Box className="oui-space-y-4">
            <TotalValue
              totalValue={totalValue}
              visible={visible}
              onToggleVisibility={toggleVisible}
            />
            <AssetValueList
              visible={visible}
              freeCollateral={freeCollateral}
              marginRatioVal={marginRatioVal}
              renderMMR={renderMMR}
              isConnected={isConnected}
            />
            <Flex gap={3} itemAlign="center">
              <Button
                fullWidth
                color="secondary"
                size="md"
                onClick={onWithdraw}
              >
                <ArrowDownShortIcon
                  color="white"
                  opacity={1}
                  className="oui-rotate-180"
                />
                <Text>Withdraw</Text>
              </Button>
              <Button fullWidth size="md" onClick={onDeposit}>
                <ArrowDownShortIcon color="white" opacity={1} />
                <Text>Deposit</Text>
              </Button>
            </Flex>
            <FaucetWidget/>
          </Box>
        )}
      </AuthGuard>
    </Box>
  );
};
