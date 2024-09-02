import { FC } from "react";
import { Box, Flex, modal, Text } from "@orderly.network/ui";
import { UseFeeReturn } from "../depositForm/depositForm.script";
import { Decimal } from "@orderly.network/utils";

type FeeProps = UseFeeReturn;

export const Fee: FC<FeeProps> = (props) => {
  const { dstGasFee, feeQty, feeAmount, dp, nativeSymbol } = props;

  const onShowFee = () => {
    const content = (
      <div className="oui-text-2xs">
        <Flex gapX={1}>
          <Text intensity={54}>Destination gas fee:</Text>
          <Text.numeral
            intensity={80}
            dp={dp}
            rm={Decimal.ROUND_UP}
            padding={false}
          >
            {feeQty}
          </Text.numeral>
          <Text intensity={54}>{nativeSymbol}</Text>
        </Flex>
        <Box mt={2}>
          <Text intensity={36}>
            Additional gas tokens are required to cover operations on the
            destination chain.
          </Text>
        </Box>
      </div>
    );

    modal.alert({
      title: "Fee",
      message: content,
    });
  };

  const showFeeQty = !!dstGasFee && dstGasFee !== "0";

  return (
    <Text
      size="xs"
      intensity={36}
      className="oui-border-dashed oui-border-b oui-border-line-12 oui-cursor-pointer"
      onClick={onShowFee}
    >
      {`Fee ≈ `}

      <Text size="xs" intensity={80}>
        $
        <Text.numeral dp={2} padding={false} rm={Decimal.ROUND_UP}>
          {feeAmount}
        </Text.numeral>
        {` `}
      </Text>

      {showFeeQty && (
        <span>
          (
          <Text intensity={54}>
            <Text.numeral dp={dp} padding={false} rm={Decimal.ROUND_UP}>
              {feeQty}
            </Text.numeral>
            {nativeSymbol}
          </Text>
          )
        </span>
      )}
    </Text>
  );
};