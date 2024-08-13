import {
  useFundingFeeHistory,
  useQuery,
  useSymbolsInfo,
} from "@orderly.network/hooks";
import { usePagination } from "@orderly.network/ui";
import { subtractDaysFromCurrentDate } from "@orderly.network/utils";
import { useState } from "react";
import { useDataTap } from "@orderly.network/react-app";
import { parseDateRangeForFilter } from "../helper/date";

// type FundingSearchParams = {
//   dataRange?: Date[];
// };

export const useFundingHistoryHook = () => {
  const [dateRange, setDateRange] = useState<Date[]>([
    subtractDaysFromCurrentDate(90),
    new Date(),
  ]);
  const [symbol, setSymbol] = useState<string>("All");
  const { page, pageSize, setPage, setPageSize, parseMeta } = usePagination();

  console.log("dateRange", dateRange);

  const [data, { isLoading, meta }] = useFundingFeeHistory(
    {
      dataRange: dateRange.map((date) => date.getTime()),
      symbol,
      page,
      pageSize,
    },
    {
      keepPreviousData: true,
    }
  );

  const onFilter = (filter: { name: string; value: any }) => {
    if (filter.name === "symbol") {
      setSymbol(filter.value);
      setPage(1);
    }

    if (filter.name === "dateRange") {
      // setDateRange([filter.value.from, filter.value.to]);
      setDateRange(parseDateRangeForFilter(filter.value));
      setPage(1);
    }
  };

  // const filteredData = useDataTap(data);

  return {
    dataSource: data,
    meta: parseMeta(meta),
    isLoading,
    // onDateRangeChange,
    queryParameter: {
      symbol,
      dateRange,
    },
    onFilter,
    setPage,
    setPageSize,
  } as const;
};

export type UseFundingHistoryReturn = ReturnType<typeof useFundingHistoryHook>;