import { CSSProperties } from "react";
import { cnBase } from "tailwind-variants";
import { TableColumn } from "../type";

export function getColumnPinningProps(
  column: TableColumn<any>,
  isHeader?: boolean
) {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  const style: CSSProperties = {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    width: column.getSize(),
  };

  const fixedCls = cnBase(
    "before:oui-block before:oui-absolute before:oui-w-[32px] before:oui-h-full",
    "before:oui-top-0 before:oui-z-[-1]",
    "before:oui-bg-[linear-gradient(90deg,rgba(7,8,10,0.80)_0%,rgba(7,8,10,0.36)_65%,rgba(7,8,10,0.00)_100%)]"
  );

  const hoverCls = cnBase(
    "after:oui-block after:oui-absolute after:oui-w-[6px] after:oui-h-full",
    "after:oui-top-0 after:oui-right-[-6px] after:oui-bg-[var(--oui-table-background-color)]"
  );

  const className = cnBase(
    isPinned ? "oui-sticky" : "oui-relative",
    isPinned ? "oui-z-[1]" : "oui-z-0",
    // isPinned === "right" && isHeader && "oui-translate-x-[-6px]",
    // !isPinned && !isHeader && "oui-translate-x-[-6px]",
    isPinned && "oui-bg-[var(--oui-table-background-color)]",
    isPinned && !isHeader && "group-hover:oui-bg-base-8",
    isLastLeftPinnedColumn && cnBase(fixedCls, "before:oui-right-[-32px]"),
    isFirstRightPinnedColumn &&
      cnBase(
        fixedCls,
        "before:oui-left-[-32px] before:oui-rotate-180",
        isHeader && hoverCls
      )
  );

  return {
    style,
    className,
  };
}
