import { Box, ExtensionPositionEnum, ExtensionSlot } from "@orderly.network/ui";
import { LayoutProvider } from "./context";
import {
  Scaffold,
  SideBar,
  SideBarProps,
  SideMenuItem,
  useScaffoldContext,
} from "@orderly.network/ui-scaffold";
import { PropsWithChildren } from "react";
import { LayoutProps } from "@orderly.network/ui-scaffold";

export type TradingRewardsLayoutProps = {
  hideSideBar?: boolean;
} & SideBarProps &
  LayoutProps;

export const TradingRewardsLayout = (
  props: PropsWithChildren<TradingRewardsLayoutProps>
) => {
  const { children, ...rest } = props;

  return (
    <Scaffold
      leftSidebar={props.hideSideBar ? (<></>) : <LeftSidebar {...rest} />}
      routerAdapter={props.routerAdapter}
      {...props}
    >
      <Box>
        {props.children}
      </Box>
    </Scaffold>
  );
};

const LeftSidebar = (props: SideBarProps & {
  onClickMenuItem?: (item: SideMenuItem) => void;

} & LayoutProps) => {
  const { expanded, setExpand } = useScaffoldContext();

  console.log("sidebar", props.onItemSelect);

  return (
    <div className="oui-m-3 oui-p-4 oui-broder oui-border-[1px] oui-border-line oui-rounded-xl oui-h-[calc(100%-29px)]">
      <SideBar
        title={"Rewards"}
        {...props}
        open={expanded}
        onOpenChange={(open) => setExpand(open)}
        onItemSelect={(a) => {
          console.log("xxxxxxx a,",a);
          props.onItemSelect?.(a);
          props.routerAdapter?.onRouteChange?.({
            href: a.href || "" ,
            name: a.name,
          });
        }}
      />
    </div>
  );
};
