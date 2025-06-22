import { useMemo } from "react";
import { useFundingRates, useQuery } from "@orderly.network/hooks";
import { usePagination } from "@orderly.network/ui";
import { Decimal } from "@orderly.network/utils";
import { useMarketsContext } from "../../components/marketsProvider";
import { useSort, searchBySymbol } from "../../utils";

export const baseEX = "WOOFi Pro";

export const exchanges = [
  baseEX,
  "Binance",
  `${baseEX} - Binance`,
  "OKX",
  `${baseEX} - OKX`,
  "Bybit",
  `${baseEX} - Bybit`,
  "dYdX",
  `${baseEX} - dYdX`,
  "Bitget",
  `${baseEX} - Bitget`,
  "KuCoin",
  `${baseEX} - KuCoin`,
];

export type FundingComparisonReturn = ReturnType<
  typeof useFundingComparisonScript
>;

export const useFundingComparisonScript = () => {
  const { pagination } = usePagination({ pageSize: 10 });
  const { onSort, getSortedList } = useSort();
  const { searchValue } = useMarketsContext();

  const fundingRates = useFundingRates();

  const { data, isLoading } = useQuery<
    Array<{ symbol: string; exchanges: Array<{ name: string; last: number }> }>
  >("/v1/public/market_info/funding_comparison");

  const processedData = useMemo(() => {
    if (!Array.isArray(data) || !data.length) {
      return [];
    }
    return data.map((row) => {
      const result: Record<PropertyKey, any> = {
        symbol: row.symbol,
      };
      exchanges.forEach((item) => {
        const isCompare = item.includes(` - `);
        if (!isCompare) {
          if (item === baseEX) {
            const rate = fundingRates[row.symbol];
            result[item] = rate("last_funding_rate") ?? null;
          } else {
            const exchange = row.exchanges?.find(
              (e) => e.name.toLowerCase() === item.toLowerCase(),
            );
            result[item] = exchange?.last ?? null;
          }
        } else {
          const [, exchangeName] = item.replace(/ /g, "").split("-");
          const rate = fundingRates[row.symbol];
          const wooFiRate = rate("last_funding_rate") ?? null;
          const exchange = row.exchanges?.find(
            (e) => e.name.toLowerCase() === exchangeName.toLowerCase(),
          );
          const otherRate = exchange?.last ?? null;
          if (wooFiRate !== null && otherRate !== null) {
            result[item] = new Decimal(wooFiRate).sub(otherRate).toString();
          } else {
            result[item] = null;
          }
        }
      });
      return result;
    });
  }, [data, fundingRates]);

  const filteredData = useMemo(() => {
    return searchBySymbol(processedData, searchValue, "base-type");
  }, [processedData, searchValue, pagination]);

  const dataSource = useMemo(
    () => getSortedList(filteredData),
    [getSortedList, filteredData],
  );

  return {
    dataSource,
    isLoading,
    pagination,
    onSort,
  };
};
