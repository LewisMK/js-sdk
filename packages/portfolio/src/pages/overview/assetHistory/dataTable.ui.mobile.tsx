import React, { FC, useMemo } from "react";
import { useQuery } from "@orderly.network/hooks";
import { useTranslation } from "@orderly.network/i18n";
import { AssetHistoryStatusEnum } from "@orderly.network/types";
import {
  Badge,
  DataFilter,
  Flex,
  ListView,
  Text,
  capitalizeFirstLetter,
  toast,
  ArrowRightShortIcon,
  EmptyDataState,
} from "@orderly.network/ui";
import { type UseAssetHistoryReturn } from "./useDataSource.script";

interface AssetHistoryMobileProps extends UseAssetHistoryReturn {
  onDeposit: () => void;
  chains: any[];
}

export const AssetHistoryMobile: FC<AssetHistoryMobileProps> = (props) => {
  const {
    dataSource,
    queryParameter,
    onFilter,
    isLoading,
    pagination,
    onDeposit,
    chains,
  } = props;
  const { side, dateRange } = queryParameter;
  const { t } = useTranslation();

  const SIDES = useMemo(() => {
    return [
      { label: t("common.all"), value: "All" },
      { label: t("common.deposit"), value: "DEPOSIT" },
      { label: t("common.withdraw"), value: "WITHDRAW" },
    ];
  }, [t]);

  const loadMore = () => {
    if (dataSource.length < (pagination?.count || 0)) {
      pagination?.onPageSizeChange &&
        pagination.onPageSizeChange(pagination?.pageSize + 50);
    }
  };

  // 格式化状态文本
  const getStatusText = (status: string) => {
    const statusMap = {
      [AssetHistoryStatusEnum.NEW]: t("assetHistory.status.pending"),
      [AssetHistoryStatusEnum.CONFIRM]: t("assetHistory.status.confirm"),
      [AssetHistoryStatusEnum.PROCESSING]: t("assetHistory.status.processing"),
      [AssetHistoryStatusEnum.COMPLETED]: t("assetHistory.status.completed"),
      [AssetHistoryStatusEnum.FAILED]: t("assetHistory.status.failed"),
    };
    return (
      statusMap[status as keyof typeof statusMap] ||
      capitalizeFirstLetter(status.toLowerCase())
    );
  };

  const renderHistoryItem = (item: any) => {
    // Amount formatting
    const formattedAmount =
      item.side === "WITHDRAW"
        ? -(item.amount - (item.fee ?? 0))
        : `+${item.amount - (item.fee ?? 0)}`;

    // Get tx link
    const getTxLink = () => {
      if (!item.tx_id) return undefined;

      const chainInfo =
        chains && Array.isArray(chains)
          ? chains.find(
              (chain: any) =>
                parseInt(item.chain_id) === parseInt(chain.chain_id),
            )
          : undefined;

      if (chainInfo?.explorer_base_url) {
        return `${chainInfo.explorer_base_url}/tx/${item.tx_id}`;
      }

      return undefined;
    };

    const itemColor = item.side === "DEPOSIT" ? "buy" : "sell";

    return (
      <Flex
        p={2}
        direction="column"
        gapY={1}
        className="oui-rounded-xl oui-bg-base-9 oui-font-semibold"
      >
        <Flex
          direction="row"
          justify="start"
          width="100%"
          className="oui-text-xs"
          height="18px"
        >
          <Text color={itemColor}>{formattedAmount}</Text>
          <Text className="oui-ml-1 oui-text-base-contrast-80">
            {item.token}
          </Text>
          <Badge color={itemColor} className="oui-ml-2" size="xs">
            {item.side === "DEPOSIT"
              ? t("common.deposit")
              : t("common.withdraw")}
          </Badge>
          <Text className="oui-text-base-contrast-80 oui-ml-auto">
            {getStatusText(item.trans_status)}
          </Text>
        </Flex>
        <Flex direction="row" justify="between" width="100%" height="18px">
          <Text.formatted
            rule="date"
            className="oui-text-base-contrast-36 oui-text-2xs"
          >
            {item.created_time}
          </Text.formatted>
          {item.tx_id ? (
            <a
              href={getTxLink()}
              target="_blank"
              className="oui-text-base-contrast-36 oui-text-xs"
              rel="noreferrer"
            >
              <Text.formatted
                copyable={!!item.tx_id}
                className="oui-underline-offset-4 oui-underline oui-decoration-dashed oui-decoration-line-16"
                rule="txId"
                onCopy={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toast.success(t("common.copy.copied"));
                }}
              >
                {item.tx_id}
              </Text.formatted>
            </a>
          ) : (
            <div className="oui-text-base-contrast-54">-</div>
          )}
        </Flex>
      </Flex>
    );
  };

  return (
    <>
      <DataFilter
        items={[
          {
            type: "picker",
            name: "side",
            options: SIDES,
            value: side,
            size: "md",
          },
          {
            type: "range",
            name: "dateRange",
            value: {
              from: dateRange[0],
              to: dateRange[1],
            },
          },
        ]}
        onFilter={(value) => {
          onFilter(value);
        }}
        className="oui-border-none oui-px-3 oui-py-2 oui-sticky oui-top-[44px] oui-z-10 oui-bg-base-10"
      />

      <ListView
        dataSource={dataSource}
        renderItem={renderHistoryItem}
        contentClassName="!oui-space-y-1"
        loadMore={loadMore}
        isLoading={isLoading}
        className="oui-px-1"
        emptyView={
          <Flex
            direction={"column"}
            height={"100%"}
            itemAlign={"center"}
            justify={"center"}
            mt={3}
          >
            <EmptyDataState />
            {dataSource?.length == 0 && (
              <Flex
                direction="row"
                itemAlign="center"
                justify="center"
                onClick={onDeposit}
                className="oui-w-full oui-text-secondary oui-mt-2 oui-h-4"
              >
                <Text color="primary" size="2xs">
                  {t("common.deposit")}
                </Text>
                <ArrowRightShortIcon
                  className="oui-ml-0.5 oui-opacity-100 oui-w-4 oui-h-4 oui-text-primary"
                  color="primary"
                  size={16}
                  opacity={100}
                />
              </Flex>
            )}
          </Flex>
        }
      />
    </>
  );
};
