import { Button, Text } from "@orderly.network/ui";
import { NumeralWithCtx } from "./numeralWithCtx";
import { PriceInput } from "./priceInput";
import { QuantityInput } from "./quantityInput";
import { Decimal } from "@orderly.network/utils";

export const renderQuantity = (value: number, record: any) => {
  return (
    <Text.numeral dp={record?.symbolInfo?.("quote_dp")} rm={Decimal.ROUND_DOWN} padding={false}>
      {value}
    </Text.numeral>
  );
};

export const renderQuantityInput = (value: number, record: any) => {
  return <QuantityInput value={record["position_qty"]} />;
};

export const renderPriceInput = (value: number) => {
  return <PriceInput />;
};
