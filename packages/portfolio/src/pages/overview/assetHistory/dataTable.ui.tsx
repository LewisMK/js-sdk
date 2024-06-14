import { FC } from "react";
import { DataTable } from "@orderly.network/ui";
import { useAssetHistoryColumns } from "./column";

type AssetHistoryProps = {
  dataSource?: any[];
  page?: number;
  pageSize?: number;
  dataCount?: number;
};

export const AssetHistory: FC<AssetHistoryProps> = (props) => {
  const { dataSource, page = 1, pageSize, dataCount = 0 } = props;
  const columns = useAssetHistoryColumns();

  return (
    <DataTable
      bordered
      headerClassName="oui-text-xs oui-text-base-contrast-36"
      columns={columns}
      dataSource={dataSource?.[page - 1]}
    />
  );
};
