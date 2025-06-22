import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useAccount,
  useConfig,
  useInfiniteQuery,
  useQuery,
} from "@orderly.network/hooks";
import { API } from "@orderly.network/types";
import { TableSort, usePagination, useScreen } from "@orderly.network/ui";
import { useEndReached } from "../../../hooks/useEndReached";
import { DateRange } from "../../../type";
import { formatDateRange, getDateRange } from "../../../utils";
import { getCurrentAddressRowKey, isSameAddress } from "../shared/util";

export type GeneralRankingData = {
  account_id: string;
  address: string;
  broker_fee: number;
  date: string;
  perp_maker_volume: number;
  perp_taker_volume: number;
  perp_volume: number;
  realized_pnl: number;
  total_fee: number;

  // custom field
  key?: string;
  rank?: number | string;
  volume?: number;
  pnl?: number;
};

export type GeneralRankingResponse = {
  meta: API.RecordsMeta;
  rows: GeneralRankingData[];
};
export type GeneralRankingScriptReturn = ReturnType<
  typeof useGeneralRankingScript
>;

export type GeneralRankingScriptOptions = {
  dateRange?: DateRange;
  address?: string;
  sortKey?: "perp_volume" | "realized_pnl";
};

export function useGeneralRankingScript(options?: GeneralRankingScriptOptions) {
  const {
    dateRange = getDateRange(90),
    address: searchValue,
    sortKey = "perp_volume",
  } = options || {};

  const [initialSort] = useState<TableSort>({
    sortKey,
    sort: "desc",
  });

  const [sort, setSort] = useState<TableSort | undefined>(initialSort);

  const { state } = useAccount();
  const brokerId = useConfig("brokerId");

  const { isMobile } = useScreen();

  const { page, pageSize, setPage, parsePagination } = usePagination({
    pageSize: isMobile ? 100 : 20,
  });

  const getUrl = (args: {
    page: number;
    pageSize: number;
    address?: string;
    sort?: string | null;
  }) => {
    const searchParams = new URLSearchParams();

    searchParams.set("page", args.page.toString());
    searchParams.set(
      "size",
      // if page is 1, we need to set page size to 100 to get the top 100 data to judge user rank
      args.page === 1 ? "100" : args.pageSize.toString(),
    );
    searchParams.set("aggregateBy", "address_per_builder");

    if (brokerId) {
      searchParams.set("broker_id", brokerId);
    }

    if (args.sort) {
      searchParams.set("sort", args.sort);
    } else if (args.sort !== null && sort) {
      const prefix = sort.sort === "asc" ? "ascending" : "descending";
      searchParams.set("sort", `${prefix}_${sort.sortKey}`);
    }

    if (dateRange?.from) {
      searchParams.set("start_date", formatDateRange(dateRange.from!));
    }

    if (dateRange?.to) {
      searchParams.set("end_date", formatDateRange(dateRange.to!));
    }

    if (args.address) {
      searchParams.set("address", args.address);
    }

    // https://orderly.network/docs/build-on-omnichain/evm-api/restful-api/private/get-builders-leaderboard
    return `/v1/broker/leaderboard/daily?${searchParams.toString()}`;
  };

  const { data, isLoading } = useQuery<GeneralRankingResponse>(
    getUrl({ page, pageSize, address: searchValue }),
    {
      formatter: (res) => res,
      revalidateOnFocus: false,
    },
  );

  const {
    data: infiniteData,
    size,
    setSize,
    isValidating,
  } = useInfiniteQuery<GeneralRankingResponse>(
    (pageIndex: number, previousPageData: any): string | null => {
      // reached the end
      if (previousPageData && !previousPageData.rows?.length) return null;

      if (!isMobile) {
        return null;
      }

      return getUrl({
        page: pageIndex + 1,
        pageSize,
        address: searchValue,
      });
    },
    {
      initialSize: 1,
      formatter: (res) => res,
      revalidateOnFocus: false,
    },
  );

  // it will use first page data cache
  const { data: top100Data } = useQuery<GeneralRankingResponse>(
    state.address
      ? getUrl({
          page: 1,
          pageSize: 100,
          sort: `descending_${sort?.sortKey || "perp_volume"}`,
        })
      : null,
    {
      formatter: (res) => res,
      revalidateOnFocus: false,
    },
  );

  const { data: userDataRes = [] } = useQuery<GeneralRankingData[]>(
    state.address
      ? getUrl({ page: 1, pageSize: 1, address: state.address, sort: null })
      : null,
    {
      revalidateOnFocus: false,
    },
  );

  const getAddressRank = useCallback(
    (address: string) => {
      const index = top100Data?.rows.findIndex((item) =>
        isSameAddress(item.address, address!),
      );
      return index !== -1 ? index! + 1 : "100+";
    },
    [top100Data],
  );

  const userDataList = useMemo(() => {
    if (!state.address || isLoading) {
      return [];
    }

    if (!userDataRes.length) {
      return [
        {
          key: getCurrentAddressRowKey(state.address!),
          address: state.address,
          rank: "-",
        } as unknown as GeneralRankingData,
      ];
    }

    return userDataRes?.map((item) => ({
      ...item,
      rank: getAddressRank(item.address!),
      key: getCurrentAddressRowKey(item.address!),
    }));
  }, [state.address, userDataRes, isLoading, getAddressRank]);

  const addRankForList = useCallback(
    (list: GeneralRankingData[], total: number) => {
      return list?.map((item, index) => {
        let rank: string | number = index + 1;

        if (searchValue) {
          rank = getAddressRank(item.address);
        } else {
          if (sort?.sort === "asc") {
            rank = total - (page - 1) * pageSize - index;
          } else if (sort?.sort === "desc") {
            rank = (page - 1) * pageSize + index + 1;
          }
        }

        return {
          ...item,
          rank,
        };
      });
    },
    [page, pageSize, sort, searchValue, getAddressRank],
  );

  const dataSource = useMemo(() => {
    let list = data?.rows || [];
    if (page === 1) {
      list = list.slice(0, pageSize);
    }
    const total = data?.meta.total || 0;
    const rankList = addRankForList(list, total);

    if (page === 1 && !searchValue) {
      return formatData([...userDataList, ...rankList]);
    }
    return formatData(rankList);
  }, [data, page, pageSize, userDataList, searchValue, addRankForList]);

  const dataList = useMemo(() => {
    if (!infiniteData?.length) {
      return [];
    }

    const total = infiniteData[0]?.meta.total || 0;
    const flatList = infiniteData?.map((item) => item.rows)?.flat();
    const rankList = addRankForList(flatList, total);

    if (!searchValue) {
      return formatData([...userDataList, ...rankList]);
    }
    return formatData(rankList);
  }, [infiniteData, userDataList, searchValue, addRankForList]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const pagination = useMemo(
    () =>
      parsePagination({
        total: data?.meta?.total || 0,
        current_page: data?.meta?.current_page || 1,
        records_per_page: pageSize,
      }),
    [data?.meta?.total, data?.meta?.current_page, pageSize],
  );

  useEndReached(sentinelRef, () => {
    if (!isValidating && isMobile) {
      setSize(size + 1);
    }
  });

  const onSort = useCallback(
    (sort?: TableSort) => {
      // befause table column dataIndex is not the same as the api sort, so we need to map the sortKey
      if (sort?.sortKey === "volume") {
        sort.sortKey = "perp_volume";
      } else if (sort?.sortKey === "pnl") {
        sort.sortKey = "realized_pnl";
      }
      setSort(sort || initialSort);
    },
    [initialSort],
  );

  useEffect(() => {
    if (searchValue) {
      setPage(1);
    }
  }, [searchValue]);

  useEffect(() => {
    setPage(1);
  }, [state.address]);

  useEffect(() => {
    if (dateRange?.to && dateRange?.from) {
      setPage(1);
    }
  }, [dateRange]);

  useEffect(() => {
    setSort({ sortKey, sort: "desc" });
  }, [sortKey]);

  return {
    pagination,
    initialSort,
    onSort,
    dataSource,
    isLoading: isLoading || isValidating,
    isMobile,
    sentinelRef,
    dataList,
    address: state.address,
  };
}

function formatData(data: any[]) {
  return data.map((item) => ({
    ...item,
    volume: item.perp_volume,
    pnl: item.realized_pnl,
  }));
}
