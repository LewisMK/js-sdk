import { useDistributionHistory } from "@orderly.network/hooks";
import { subtractDaysFromCurrentDate } from "@orderly.network/utils";
import { useMemo, useRef, useState } from "react";
import { PaginationMeta, usePagination } from "@orderly.network/ui";
import { parseDateRangeForFilter } from "../helper/date";
import {
  addDays,
  getDate,
  getMonth,
  getYear,
  isSameDay,
  set,
  setHours,
  setMinutes,
} from "date-fns";

export const useDistributionHistoryHook = () => {
  // const today = useRef(setMinutes(setHours(new Date(), 23), 59));

  const [today] = useState(() => {
    const d = new Date();

    return new Date(getYear(d), getMonth(d), getDate(d), 0, 0, 0);
  });

  const [dateRange, setDateRange] = useState<Date[]>([
    subtractDaysFromCurrentDate(90, today),
    today,
  ]);
  const [type, setType] = useState<string>("All");
  const { page, pageSize, setPage, setPageSize, parseMeta } = usePagination();

  const [data, { isLoading, meta, isValidating }] = useDistributionHistory({
    // dataRange: dateRange.map((date) => date.getTime()),
    dataRange: [
      dateRange[0].getTime(),
      set(dateRange[1], {
        hours: 23,
        minutes: 59,
        seconds: 59,
        milliseconds: 0,
      }).getTime(),
    ],
    type,
    pageSize,
    page,
  });

  // console.log("----", isLoading, isValidating);

  // const res = useQuery("v1/public/info/funding_period");

  const onFilter = (filter: { name: string; value: any }) => {
    if (filter.name === "type") {
      setType(filter.value);
      setPage(1);
    }

    if (filter.name === "dateRange") {
      // setDateRange([filter.value.from, filter.value.to]);
      setDateRange(parseDateRangeForFilter(filter.value));
      setPage(1);
    }
  };

  const pagination = useMemo(() => {
    return {
      ...parseMeta(meta),
      onPageChange: setPage,
      onPageSizeChange: setPageSize,
    } as PaginationMeta;
  }, [meta, setPage, setPageSize]);

  return {
    dataSource: data,
    meta: parseMeta(meta),
    isLoading,
    isValidating,
    // onDateRangeChange,
    queryParameter: {
      type,
      dateRange,
    },
    onFilter,
    setPage,
    setPageSize,
    pagination,
  } as const;
};

export type useDistributionHistoryHookReturn = ReturnType<
  typeof useDistributionHistoryHook
>;
