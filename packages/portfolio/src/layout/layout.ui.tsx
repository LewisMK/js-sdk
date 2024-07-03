import { Box, ExtensionPositionEnum, ExtensionSlot } from "@orderly.network/ui";
import { LayoutProvider } from "./context";
import { Scaffold, SideBar, SideBarProps } from "@orderly.network/ui-scaffold";
import { PropsWithChildren } from "react";

export type PortfolioLayoutProps = {
  // sideOpen?: boolean;
} & SideBarProps;

export const PortfolioLayout = (
  props: PropsWithChildren<PortfolioLayoutProps>
) => {
  const { ...rest } = props;
  return (
    <Scaffold leftSidebar={<LeftSidebar {...rest} />}>
      <Box mx={3} my={6}>
        {props.children}
      </Box>
    </Scaffold>
  );
  // return (
  //   <LayoutProvider>
  //     <div className="oui-h-dvh">
  //       <ExtensionSlot position={ExtensionPositionEnum.MainNav} />
  //       <div
  //         className="oui-grid oui-h-full"
  //         style={{ gridAutoColumns: "160px 1fr" }}
  //       >
  //         <Box p={4} className="oui-bg-base-9 oui-rounded-2xl">
  //           <ExtensionSlot position={ExtensionPositionEnum.SideNav} />
  //         </Box>
  //         <div></div>
  //       </div>
  //     </div>
  //   </LayoutProvider>
  // );
};

const LeftSidebar = (props: SideBarProps) => {
  return (
    <Box p={4} m={3} border borderColor={8} r={"xl"}>
      <SideBar {...props} />
    </Box>
  );
};
