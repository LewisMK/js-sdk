import {
  ComponentPropsWithout,
  RemovedProps,
} from "../helpers/component-props";
import React from "react";
import { VariantProps, tv } from "tailwind-variants";

const tableVariants = tv({
  slots: {
    root: "oui-relative oui-w-full oui-overflow-auto oui-TableRoot",
    table: "oui-w-full oui-caption-bottom oui-text-xs oui-TableRootTable",
    thead: "[&_tr]:oui-border-b oui-TableHead",
    tbody: "[&_tr:last-child]:oui-border-0 oui-TableBody",
    tfooter:
      "oui-border-t oui-font-medium [&>tr]:oui-last:border-b-0 oui-TableFooter",
    tr: "oui-transition-colors oui-TableTr hover:oui-bg-base-1/20",
    th: "oui-h-10 oui-px-2 oui-text-left oui-align-middle oui-font-medium oui-text-muted-foreground [&:has([role=checkbox])]:oui-pr-0 [&>[role=checkbox]]:oui-translate-y-[2px] oui-TableTh",
    td: "oui-p-2 oui-align-middle [&:has([role=checkbox])]:oui-pr-0 [&>[role=checkbox]]:oui-translate-y-[2px] oui-TableTd",
    caption: "oui-mt-4 oui-text-xs oui-text-muted-foreground oui-TableCaption",
  },
  variants: {
    bordered: {
      true: {
        tr: "oui-border-b",
        // th: "",
        // td: "",
      },
      false: {
        tr: "",
      },
    },
  },
});

interface TableRootProps
  extends VariantProps<typeof tableVariants>,
    ComponentPropsWithout<
      "table",
      "asChild" | "defaultChecked" | "defaultValue" | "color" | "border"
    > {}

const Table = React.forwardRef<HTMLTableElement, TableRootProps>(
  ({ className, bordered, ...props }, ref) => {
    const { root, table } = tableVariants({ className, bordered });
    return (
      <div className={root({ className })}>
        <table ref={ref} className={table()} {...props} />
      </div>
    );
  }
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { thead } = tableVariants();
  return <thead ref={ref} className={thead({ className })} {...props} />;
});
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { tbody } = tableVariants();
  return <tbody ref={ref} className={tbody({ className })} {...props} />;
});
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  const { tfooter } = tableVariants();
  return <tfoot ref={ref} className={tfooter({ className })} {...props} />;
});
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    bordered?: boolean;
  }
>(({ className, bordered, ...props }, ref) => {
  const { tr } = tableVariants({ bordered });
  return <tr ref={ref} className={tr({ className })} {...props} />;
});
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { th } = tableVariants();
  return <th ref={ref} className={th({ className })} {...props} />;
});
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  const { td } = tableVariants();
  return <td ref={ref} className={td({ className })} {...props} />;
});
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  const { caption } = tableVariants();
  return <caption ref={ref} className={caption({ className })} {...props} />;
});
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};