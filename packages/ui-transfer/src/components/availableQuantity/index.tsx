import { FC } from "react";
import { Flex, Spinner, Text } from "@orderly.network/ui";
import { API } from "@orderly.network/types";
import { Decimal } from "@orderly.network/utils";

export type AvailableQuantityProps = {
  token?: API.TokenInfo;
  amount?: string;
  maxQuantity?: string;
  precision?: number;
  onClick?: () => void;
  loading?: boolean;
};

export const AvailableQuantity: FC<AvailableQuantityProps> = (props) => {
  const { amount, maxQuantity, token, precision, loading } = props;

  const name = token?.display_name || token?.symbol || "";

  return (
    <Flex justify="between" px={2}>
      <Text size="2xs" intensity={36}>
        ${amount}
      </Text>

      <Flex gapX={2}>
        <Text size="2xs" intensity={36}>
          Available:{" "}
          <Text.numeral rm={Decimal.ROUND_DOWN} dp={2} padding={false}>
            {maxQuantity!}
          </Text.numeral>{" "}
          {name}
        </Text>

        {loading && <Spinner size="sm" />}

        <Text
          size="2xs"
          color="primaryLight"
          className="oui-cursor-pointer oui-select-none"
          onClick={props.onClick}
        >
          Max
        </Text>
      </Flex>
    </Flex>
  );
};
