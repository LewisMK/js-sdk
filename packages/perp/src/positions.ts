import { API } from "@orderly.network/types";
import { Decimal } from "@orderly.network/utils";
import { IMRFactorPower } from "./constants";

/**
 * Calculates the notional value of a single position.
 * @param qty The quantity of the position.
 * @param mark_price The price of the position.
 * @returns The notional value of the position.
 */
export function notional(qty: number, mark_price: number): number {
  return new Decimal(qty).mul(mark_price).abs().toNumber();
}

/**
 * Calculates the total notional value of all positions.
 * @param positions The array of positions.
 * @returns The total notional value of all positions.
 * @link https://wootraders.atlassian.net/wiki/spaces/WOOFI/pages/346030144/v2#Total-Notional
 */
export function totalNotional(positions: API.Position[]): number {
  return positions.reduce((acc, cur) => {
    return acc + notional(cur.position_qty, cur.mark_price);
  }, 0);
}

export type UnrealPnLInputs = {
  markPrice: number;
  openPrice: number;
  qty: number;
};

/**
 * Calculates the unrealized profit or loss of a single position.
 * @param inputs The inputs for calculating the unrealized profit or loss.
 * @returns The unrealized profit or loss of the position.
 */
export function unrealizedPnL(inputs: UnrealPnLInputs): number {
  return new Decimal(inputs.qty)
    .mul(inputs.markPrice - inputs.openPrice)
    .toNumber();
}

export type UnrealPnLROIInputs = {
  positionQty: number;
  openPrice: number;
  IMR: number;
  unrealizedPnL: number;
};

/**
 * Calculates the return on investment (ROI) of a single position's unrealized profit or loss.
 * @param inputs The inputs for calculating the ROI.
 * @returns The ROI of the position's unrealized profit or loss.
 */
export function unrealizedPnLROI(inputs: UnrealPnLROIInputs): number {
  const { openPrice, IMR } = inputs;

  if (
    inputs.unrealizedPnL === 0 ||
    inputs.positionQty === 0 ||
    openPrice === 0 ||
    IMR === 0
  )
    return 0;

  return new Decimal(inputs.unrealizedPnL)
    .div(new Decimal(inputs.positionQty).mul(openPrice).mul(IMR))
    .toNumber();
}

/**
 * Calculates the total unrealized profit or loss of all positions.
 * @param positions The array of positions.
 * @returns The total unrealized profit or loss of all positions.
 */
export function totalUnrealizedPnL(positions: API.Position[]): number {
  return positions.reduce((acc, cur) => {
    return (
      acc +
      unrealizedPnL({
        qty: cur.position_qty,
        openPrice: cur.average_open_price,
        markPrice: cur.mark_price,
      })
    );
  }, 0);
}

export type LiqPriceInputs = {
  markPrice: number;
  totalCollateral: number;
  positionQty: number;
  MMR: number;
};

/**
 * Calculates the liquidation price of a single position.
 * @param inputs The inputs for calculating the liquidation price.
 * @returns The liquidation price of the position.
 * @see {@link https://wootraders.atlassian.net/wiki/spaces/WOOFI/pages/346030144/v2#Position-Liq.-Price}
 */
export function liqPrice(inputs: LiqPriceInputs): number {
  const { markPrice, totalCollateral, positionQty, MMR } = inputs;
  const totalNotional = notional(positionQty, markPrice);

  if (positionQty === 0) {
    return 0;
  }

  return Math.max(
    new Decimal(markPrice)
      .add(
        new Decimal(totalCollateral)
          .sub(new Decimal(totalNotional).mul(MMR))
          .div(new Decimal(positionQty).abs().mul(MMR).sub(positionQty))
      )
      .toNumber(),
    0
  );
}

export type MMInputs = {
  positionQty: number;
  markPrice: number;
  MMR: number;
};

/**
 * Calculates the maintenance margin of a position.
 * @param inputs The inputs for calculating the maintenance margin.
 * @returns The maintenance margin of the position.
 */
export function maintenanceMargin(inputs: MMInputs) {
  const { positionQty, markPrice, MMR } = inputs;

  return new Decimal(positionQty).mul(markPrice).mul(MMR).abs().toNumber();
}

export type UnsettlementPnLInputs = {
  positionQty: number;
  markPrice: number;
  costPosition: number;
  sumUnitaryFunding: number;
  lastSumUnitaryFunding: number;
};

/**
 * Calculates the unrealized profit or loss of each position.
 * @param inputs The inputs for calculating the unrealized profit or loss.
 * @returns The unrealized profit or loss of each position.
 * @link https://wootraders.atlassian.net/wiki/spaces/WOOFI/pages/346030144/v2#Total-Unsettlement-PNL-%5BinlineExtension%5D
 */
export function unsettlementPnL(inputs: UnsettlementPnLInputs): number {
  const {
    positionQty,
    markPrice,
    costPosition,
    sumUnitaryFunding,
    lastSumUnitaryFunding,
  } = inputs;

  const qty = new Decimal(positionQty);

  return qty
    .mul(markPrice)
    .sub(costPosition)
    .sub(qty.mul(new Decimal(sumUnitaryFunding).sub(lastSumUnitaryFunding)))
    .toNumber();
}

export type TotalUnsettlementPnLInputs = {
  positions: (API.Position & {
    sum_unitary_funding: number;
  })[];
  sumUnitaryFunding: number;
};

/**
 * Calculates the total unrealized profit or loss of all positions.
 * @param positions The array of positions.
 * @returns The total unrealized profit or loss of all positions.
 * @link https://wootraders.atlassian.net/wiki/spaces/WOOFI/pages/346030144/v2#Total-Unsettlement-PNL-%5BinlineExtension%5D
 */
export function totalUnsettlementPnL(
  positions: (API.Position & {
    sum_unitary_funding: number;
  })[]
): number {
  if (!Array.isArray(positions) || positions.length === 0) {
    return 0;
  }

  return positions.reduce((acc, cur) => {
    return (
      acc +
      unsettlementPnL({
        positionQty: cur.position_qty,
        markPrice: cur.mark_price,
        costPosition: cur.cost_position,
        sumUnitaryFunding: cur.sum_unitary_funding,
        lastSumUnitaryFunding: cur.last_sum_unitary_funding,
      })
    );
  }, 0);
}

/**
 * Calculates the maintenance margin requirement (MMR) of a position.
 * @param inputs The inputs for calculating the MMR.
 * @returns The MMR of the position.
 */
export function MMR(inputs: {
  baseMMR: number;
  baseIMR: number;
  IMRFactor: number;
  positionNotional: number;
  IMR_factor_power: number;
}): number {
  const {
    baseMMR,
    baseIMR,
    IMRFactor,
    positionNotional,
    IMR_factor_power = IMRFactorPower,
  } = inputs;
  return Math.max(
    baseMMR,
    new Decimal(baseMMR)
      .div(baseIMR)
      .mul(IMRFactor)
      .mul(Math.abs(positionNotional))
      .toPower(IMR_factor_power)
      .toNumber()
  );
}
