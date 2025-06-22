import { API, OrderSide, PositionSide } from "@orderly.network/types";
import { OrderType } from "@orderly.network/types";
import { AlgoOrderType } from "@orderly.network/types";
import { Decimal, todpIfNeed, zero } from "@orderly.network/utils";

export type UpdateOrderKey =
  | "tp_trigger_price"
  | "tp_offset_percentage"
  | "tp_pnl"
  | "tp_offset"
  | "quantity"
  | "sl_trigger_price"
  | "sl_offset_percentage"
  | "sl_pnl"
  | "sl_offset";

/**
 * offset -> TP/SL price
 */
export function offsetToPrice(inputs: {
  qty: number;
  offset: number;
  entryPrice: number;
  orderSide: OrderSide;
  orderType: AlgoOrderType;
}) {
  const { qty, offset, entryPrice, orderType, orderSide } = inputs;

  if (!offset) return;

  if (orderSide === OrderSide.BUY) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(entryPrice).add(new Decimal(offset)).toNumber();
    }

    return new Decimal(entryPrice).minus(new Decimal(offset)).toNumber();
  }

  if (orderSide === OrderSide.SELL) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(entryPrice).minus(new Decimal(offset)).toNumber();
    }

    return new Decimal(entryPrice).add(new Decimal(offset)).toNumber();
  }
}

export function priceToOffset(
  inputs: {
    qty: number;
    price: number;
    entryPrice: number;
    orderSide: OrderSide;
    orderType: AlgoOrderType;
  },
  options: { symbol?: Pick<API.SymbolExt, "quote_dp"> } = {}
) {
  const { qty, price, entryPrice, orderType, orderSide } = inputs;
  const { symbol } = options;
  let decimal: Decimal;

  if (orderSide === OrderSide.BUY) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      decimal = new Decimal(price).minus(new Decimal(entryPrice));
    }

    decimal = new Decimal(price).minus(new Decimal(entryPrice));
  }

  if (orderSide === OrderSide.SELL) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      decimal = new Decimal(price).minus(new Decimal(entryPrice));
    }

    decimal = new Decimal(entryPrice).minus(new Decimal(price));
  }

  if (symbol) {
    return decimal!.abs().todp(symbol.quote_dp, Decimal.ROUND_UP).toNumber();
  }

  return decimal!.abs().toNumber();
}

export function offsetPercentageToPrice(inputs: {
  qty: number;
  percentage: number;
  entryPrice: number;
  orderSide: OrderSide;
  orderType: AlgoOrderType;
}) {
  const { qty, percentage, entryPrice, orderType, orderSide } = inputs;

  if (!percentage) return;

  if (orderSide === OrderSide.BUY) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(1)
        .add(new Decimal(percentage))
        .mul(new Decimal(entryPrice))
        .toNumber();
    }

    return new Decimal(1)
      .minus(new Decimal(percentage))
      .mul(new Decimal(entryPrice))
      .toNumber();
  }

  if (orderSide === OrderSide.SELL) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(1)
        .minus(new Decimal(percentage))
        .mul(new Decimal(entryPrice))
        .toNumber();
    }

    return new Decimal(1)
      .add(new Decimal(percentage))
      .mul(new Decimal(entryPrice))
      .toNumber();
  }
}

export function priceToOffsetPercentage(inputs: {
  qty: number;
  price: number;
  entryPrice: number;
  orderSide: OrderSide;
  orderType: AlgoOrderType;
}) {
  const { qty, price, entryPrice, orderType, orderSide } = inputs;

  if (orderSide === OrderSide.BUY) {
    if (entryPrice === 0) return 0;
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(price)
        .div(new Decimal(entryPrice))
        .minus(1)
        .toDecimalPlaces(4, Decimal.ROUND_DOWN)
        .toNumber();
    }

    return new Decimal(1)
      .minus(new Decimal(price).div(new Decimal(entryPrice)))
      .toDecimalPlaces(4, Decimal.ROUND_DOWN)
      .toNumber();
  }

  if (orderSide === OrderSide.SELL) {
    if (entryPrice === 0) return 0;
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(1)
        .minus(new Decimal(price).div(new Decimal(entryPrice)))
        .abs()
        .toDecimalPlaces(4, Decimal.ROUND_DOWN)
        .toNumber();
    }

    return new Decimal(price)
      .div(new Decimal(entryPrice))
      .minus(1)
      .toDecimalPlaces(4, Decimal.ROUND_DOWN)
      .toNumber();
  }
}

/**
 * pnl -> TP/SL price
 */
export function pnlToPrice(inputs: {
  qty: number;
  pnl: number;
  entryPrice: number;
  orderSide: OrderSide;
  orderType: AlgoOrderType;
}) {
  const { qty, pnl, entryPrice, orderType, orderSide } = inputs;

  if (!pnl) {
    return;
  }

  if (qty === 0) return;

  if (orderSide === OrderSide.BUY) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(entryPrice)
        .plus(new Decimal(pnl).div(new Decimal(qty)))
        .toNumber();
    }

    return new Decimal(entryPrice)
      .add(new Decimal(pnl).div(new Decimal(qty)))
      .toNumber();
  }
  if (orderSide === OrderSide.SELL) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      return new Decimal(entryPrice)
        .add(new Decimal(pnl).div(new Decimal(qty)))
        .toNumber();
    }

    return new Decimal(entryPrice)
      .add(new Decimal(pnl).div(new Decimal(qty)))
      .toNumber();
  }
}

/**
 * TP/SL price -> pnl
 * @price trigger_price
 * @entryPrice calculate price, maybe markPrice/limitPrice/order.price
 */
export function priceToPnl(
  inputs: {
    qty: number;
    price: number;
    entryPrice: number;
    orderSide: OrderSide;
    orderType: AlgoOrderType;
  },
  options: { symbol?: Pick<API.SymbolExt, "quote_dp"> } = {}
): number {
  const { qty, price, entryPrice, orderType, orderSide } = inputs;
  const { symbol } = options;
  let decimal = zero;
  // const qty =
  //   orderSide === OrderSide.BUY ? Math.abs(_qty) : Math.abs(_qty) * -1;
    
    

  if (orderSide === OrderSide.BUY) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      decimal = new Decimal(qty).mul(
        new Decimal(price).minus(new Decimal(entryPrice))
      );
    }

    decimal = new Decimal(qty).mul(
      new Decimal(price).minus(new Decimal(entryPrice))
    );
  }

  if (orderSide === OrderSide.SELL) {
    if (orderType === AlgoOrderType.TAKE_PROFIT) {
      decimal = new Decimal(qty).mul(
        new Decimal(price).minus(new Decimal(entryPrice))
      );
    }

    decimal = new Decimal(qty).mul(
      new Decimal(price).minus(new Decimal(entryPrice))
    );
  }

  if (symbol) {
    // return decimal.todp(symbol.quote_dp, Decimal.ROUND_DOWN).toNumber();
    return decimal.todp(2, Decimal.ROUND_DOWN).toNumber();
  }

  return decimal.toNumber();
}

export function calcTPSL_ROI(inputs: {
  pnl: number | string;
  qty: number | string;
  price: number | string;
}) {
  const qtyNum = Number(inputs.qty);
  const priceNum = Number(inputs.price);
  if (qtyNum === 0 || priceNum === 0) return "0";
  return new Decimal(inputs.pnl)
    .div(new Decimal(qtyNum).abs().mul(new Decimal(priceNum)))
    .toString();
}

// function formatPrice(price: number | string, symbol?: API.SymbolExt) {
//   if (typeof price !== "string") {
//     price = `${price}`;
//   }

//   if (price.endsWith(".") || !symbol) {
//     return price;
//   }
//   return new Decimal(Number(price))
//     .todp(symbol.quote_dp, Decimal.ROUND_UP)
//     .toNumber();
// }

export function tpslCalculateHelper(
  key: string,
  inputs: {
    key: string;
    value: string | number;
    entryPrice: number | string;
    qty: number | string;
    orderSide: OrderSide;
  },
  options: { symbol?: Pick<API.SymbolExt, "quote_dp"> } = {}
) {
  const { symbol } = options;
  // if not need to be computed, return the value directly
  if (
    key !== "quantity" &&
    key !== "tp_trigger_price" &&
    key !== "sl_trigger_price" &&
    key !== "tp_pnl" &&
    key !== "sl_pnl" &&
    key !== "tp_offset" &&
    key !== "sl_offset" &&
    key !== "tp_offset_percentage" &&
    key !== "sl_offset_percentage"
  ) {
    return {
      [key]: inputs.value,
    };
  }

  const orderType = key.startsWith("tp_")
    ? AlgoOrderType.TAKE_PROFIT
    : AlgoOrderType.STOP_LOSS;
  const keyPrefix = key.slice(0, 3);

  let qty = Number(key === "quantity" ? inputs.value : inputs.qty);

  if (
    qty === 0 &&
    (key === "tp_pnl" ||
      key === "sl_pnl" ||
      key === "tp_trigger_price" ||
      key === "sl_trigger_price")
  ) {
    return {
      [`${keyPrefix}trigger_price`]: "",
      // [`${keyPrefix}offset`]: "",
      // [`${keyPrefix}offset_percentage`]: "",
      [`${keyPrefix}pnl`]: "",
      [key]: inputs.value,
    };
  }
  let trigger_price, offset, offset_percentage, pnl;

  const entryPrice = new Decimal(inputs.entryPrice)
    .todp(options.symbol?.quote_dp ?? 2, Decimal.ROUND_UP)
    .toNumber();

  switch (key) {
    case "tp_trigger_price":
    case "sl_trigger_price": {
      trigger_price = inputs.value;
      // if trigger price is empty and the key is `*_trigger_price`, reset the offset and pnl
      if (inputs.value === "") {
        return {
          [`${keyPrefix}trigger_price`]: trigger_price,
          [`${keyPrefix}offset`]: "",
          [`${keyPrefix}offset_percentage`]: "",
          [`${keyPrefix}pnl`]: "",
          [`${keyPrefix}ROI`]: "",
        };
      }
      break;
    }

    case "tp_pnl":
    case "sl_pnl": {
      pnl = inputs.value;
      trigger_price = pnlToPrice({
        qty,
        pnl: Number(inputs.value),
        entryPrice,
        orderSide: inputs.orderSide,
        orderType,
      });
      break;
    }

    case "tp_offset":
    case "sl_offset": {
      offset = inputs.value;
      trigger_price = offsetToPrice({
        qty,
        offset: Number(inputs.value),
        entryPrice,
        orderSide: inputs.orderSide,
        orderType:
          key === "tp_offset"
            ? AlgoOrderType.TAKE_PROFIT
            : AlgoOrderType.STOP_LOSS,
      });
      break;
    }

    case "tp_offset_percentage":
    case "sl_offset_percentage": {
      offset_percentage = inputs.value;
      // console.log("offset_percentage", offset_percentage);
      trigger_price = offsetPercentageToPrice({
        qty,
        percentage: Number(`${inputs.value}`.replace(/\.0{0,2}$/, "")),
        entryPrice,
        orderSide: inputs.orderSide,
        orderType,
      });
      break;
    }
  }

  if (!trigger_price)
    return {
      [`${keyPrefix}trigger_price`]: "",
      [`${keyPrefix}offset`]: "",
      [`${keyPrefix}offset_percentage`]: "",
      [`${keyPrefix}pnl`]: "",
      [`${keyPrefix}ROI`]: "",
      [key]: inputs.value,
    };

  return {
    [`${keyPrefix}trigger_price`]: todpIfNeed(
      trigger_price,
      symbol?.quote_dp ?? 2
    ),
    [`${keyPrefix}offset`]:
      offset ??
      priceToOffset(
        {
          qty,
          price: Number(trigger_price!),
          entryPrice,
          orderSide: inputs.orderSide,
          orderType,
        },
        options
      ),
    [`${keyPrefix}offset_percentage`]:
      offset_percentage ??
      priceToOffsetPercentage({
        qty,
        price: Number(trigger_price!),
        entryPrice,
        orderSide: inputs.orderSide,
        orderType,
      }),
    [`${keyPrefix}pnl`]:
      pnl ??
      priceToPnl(
        {
          qty,
          price: Number(trigger_price!),
          entryPrice,
          orderSide: inputs.orderSide,
          orderType,
        },
        options
      ),
    // [`${keyPrefix}ROI`]: calcROI({
    //   pnl: Number(pnl ?? 0),
    //   qty,
    //   price: Number(trigger_price!),
    // }),
  };
}
