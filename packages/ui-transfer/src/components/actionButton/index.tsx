import React, { useMemo } from "react";
import { Box, Button, ButtonProps } from "@orderly.network/ui";
import { AuthGuard } from "@orderly.network/ui-connector";
import { NetworkId } from "@orderly.network/types";
import { DepositAction } from "../../types";

export type ActionButtonProps = {
  disabled?: boolean;
  loading?: boolean;
  actionType: DepositAction;
  symbol?: string;
  onDeposit?: () => void;
  onApprove?: () => void;
  networkId?: NetworkId;
};

export const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const {
    disabled,
    loading,
    actionType,
    symbol = "USDC",
    onDeposit,
    onApprove,
    networkId,
  } = props;

  const buttonParams = useMemo(() => {
    const params: Record<DepositAction, ButtonProps> = {
      [DepositAction.Approve]: {
        children: `Approve ${symbol}`,
        onClick: onApprove,
      },
      [DepositAction.Increase]: {
        children: `increase ${symbol} authorized amount`,
        onClick: onApprove,
      },
      [DepositAction.Deposit]: {
        children: "Deposit",
        onClick: onDeposit,
      },
    };

    return params[actionType];
  }, [onApprove, onDeposit, actionType, symbol]);

  return (
    <Box className="oui-min-w-[184px]">
      <AuthGuard networkId={networkId} buttonProps={{ fullWidth: true }}>
        <Button
          fullWidth
          disabled={disabled}
          loading={loading}
          {...buttonParams}
        />
      </AuthGuard>
    </Box>
  );
};