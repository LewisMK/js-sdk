import {Box, Button, ButtonProps, modal} from "@orderly.network/ui";
import {AuthGuard} from "@orderly.network/ui-connector";
import React, {useMemo} from "react";
import {ActionType} from "../actionButton";
import {NetworkId} from "@orderly.network/types";
import {CrossWithdrawConfirm} from "../crossWithdrawConfirm";
import {API} from "@orderly.network/types/src";
import {Decimal} from "@orderly.network/utils";

interface IProps {
    disabled?: boolean;
    loading?: boolean;
    onWithdraw: () => Promise<void>;
    networkId?: NetworkId;
    crossChainWithdraw: boolean;
    address?: string;
    currentChain?: any;
    quantity: string;
    fee: number;

}

export const WithdrawAction = (props: IProps) => {
    const {
        disabled,
        loading,
        onWithdraw,
        networkId,
        crossChainWithdraw,
        address,
        currentChain,
        quantity,
        fee,
    } = props;

    const amount = useMemo(() => {
        if (!quantity) {
           return 0;
        }
        return new Decimal(quantity).minus(fee ?? 0).toNumber();

    }, [quantity, fee])

    const preWithdraw = () => {
        if (crossChainWithdraw) {
            modal.confirm({
                title: "Confirm to withdraw",
                content: <CrossWithdrawConfirm address={address!} amount={amount} currentChain={currentChain}/>,
                bodyClassName: 'oui-p-0',
                onOk: async () => {
                    onWithdraw();
                },

            })
            return;
        }
        onWithdraw();

    }

    return (
        <Box width={184}>
            <AuthGuard networkId={networkId} buttonProps={{fullWidth: true}}>
                <Button
                    fullWidth
                    disabled={disabled}
                    loading={loading}
                    onClick={preWithdraw}
                >
                    Withdraw
                </Button>
            </AuthGuard>
        </Box>
    );
}