import { FC, useMemo, useState } from "react";
import { StatusTile } from "./statusTile";
import { Divider } from "@/divider";
import Button from "@/button";
import { SwapProcessStatusStatus } from "./misc";

interface SwapProcessStatusProps {
  status: SwapProcessStatusStatus;
  message: any;
  onComplete?: (isSuccss: boolean) => void;
  brokerName?: string;
}

export const BridgeAndSwapProcessStatus: FC<SwapProcessStatusProps> = (
  props
) => {
  const { status, message } = props;

  const statusUrl = useMemo(() => {
    if (status < SwapProcessStatusStatus.Depositing || !message) {
      return;
    }
    return `https://layerzeroscan.com/tx/${message.srcTxHash}`;
    // return `https://layerzeroscan.com/${message.srcChainId}/address/${message.srcUaAddress}/message/${message.dstChainId}/address/${message.dstUaAddress}/nonce/${message.srcUaNonce}`;
  }, [status, message]);

  const getBridgeStatus = (status: SwapProcessStatusStatus) => {
    if (status === SwapProcessStatusStatus.Bridging) {
      return "pending";
    }
    if (status === SwapProcessStatusStatus.BridgeFialed) {
      return "failed";
    }
    return "success";
  };

  const getDepositStatus = (status: SwapProcessStatusStatus) => {
    if (status < SwapProcessStatusStatus.Depositing) {
      return "disabled";
    }
    if (status === SwapProcessStatusStatus.Depositing) {
      return "pending";
    }
    if (status === SwapProcessStatusStatus.DepositFailed) {
      return "failed";
    }
    return "success";
  };

  return (
    <>
      <div className="orderly-py-[24px]">
        <div className="orderly-bg-base-500 orderly-rounded orderly-py-3 orderly-px-5">
          <StatusTile
            state={getBridgeStatus(status)}
            title={"Bridging"}
            description={"Bridge to Arbitrum via Stargate"}
            index={1}
          />
          <StatusTile
            state={getDepositStatus(status)}
            title={"Deposit"}
            description={`Deposit to ${props.brokerName}`}
            index={2}
          />
          <Divider className="before:orderly-border-b-base-contrast-12 after:orderly-border-b-base-contrast-12" />
          <div className="orderly-flex orderly-justify-center orderly-mt-3">
            <button
              className="orderly-text-2xs desktop:orderly-text-xs orderly-text-primary-light disabled:orderly-text-base-contrast/10"
              disabled={!statusUrl}
              onClick={() => {
                (location as any).href = statusUrl;
              }}
            >
              View Status
            </button>
          </div>
        </div>
      </div>
      {(status === SwapProcessStatusStatus.DepositFailed ||
        status === SwapProcessStatusStatus.BridgeFialed) && (
        <div className="orderly-pb-7 orderly-text-danger orderly-text-center orderly-text-2xs">
          Deposit failed, please try again later.
        </div>
      )}
      <Button
        className="orderly-text-base disabled:orderly-bg-base-300 disabled:orderly-text-base-contrast-36"
        fullWidth
        disabled={
          status === SwapProcessStatusStatus.Bridging ||
          status === SwapProcessStatusStatus.Depositing
        }
        onClick={() =>
          props.onComplete?.(status === SwapProcessStatusStatus.Done)
        }
      >
        OK
      </Button>
    </>
  );
};