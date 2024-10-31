import { useMarketList } from "@orderly.network/hooks";
import { SortOrder, TableColumn } from "@orderly.network/ui";

export type FavoriteInstance = ReturnType<typeof useMarketList>[1];

export type TInitialSort = {
  sortKey: string;
  sort: SortOrder;
};

export type GetColumns = (
  favorite: FavoriteInstance,
  isFavoriteList: boolean
) => TableColumn[];
