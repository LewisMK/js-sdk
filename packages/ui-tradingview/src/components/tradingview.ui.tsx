import React, { ReactNode, useRef } from "react";
import { TradingviewUIPropsInterface } from "../type";
import TopBar from "./topBar";
import {TimeInterval}from "./timeInterval";
import { MobileDisplayControl, DesktopDisplayControl } from "./displayControl";
import { NoTradingview } from "./noTradingview";
import { Box, Button, Divider, Flex } from "@orderly.network/ui";
import { IndicatorsIcon, LineTypeIcon, SettingIcon } from "../icons";
import LineType from "./lineType";
import { useMediaQuery } from "@orderly.network/hooks";
import { MEDIA_TABLET } from "@orderly.network/types";

const OperateButton = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) => {
  return (
    <Box
      onClick={onClick}
      className="oui-cursor-pointer oui-w-[18px] oui-h-[18px] oui-text-base-contrast-36  hover:oui-text-base-contrast-80"
    >
      {children}
    </Box>
  );
};

export function TradingviewUi(props: TradingviewUIPropsInterface) {
  const {
    chartRef,
    interval,
    changeDisplaySetting,
    displayControlState,
    tradingViewScriptSrc,
    changeInterval,
    lineType,
    changeLineType,
    openChartSetting,
    openChartIndicators,

  } = props;
  const isMobile = useMediaQuery(MEDIA_TABLET);

  return (
    <div className="oui-h-full oui-w-full  oui-relative">
      {!tradingViewScriptSrc ? (
        <NoTradingview />
      ) : (
        <div className="oui-z-[1] oui-absolute oui-top-0 oui-bottom-0 oui-right-0 oui-left-0 oui-h-full oui-w-full oui-flex oui-flex-col">
          <TopBar>
            {isMobile ?
              <>
                <TimeInterval
                  interval={interval ?? "1"}
                  changeInterval={changeInterval}
                />

                <MobileDisplayControl
                  displayControlState={displayControlState}
                  changeDisplayControlState={changeDisplaySetting}
                />
              </>
              :
              <>
                <TimeInterval
                  interval={interval ?? "1"}
                  changeInterval={changeInterval}
                />
                <Divider
                  direction="vertical"
                  className="oui-h-4"
                  mx={2}
                  intensity={8}
                />
                <Flex justify="start" itemAlign="center" gap={2}>
                  <DesktopDisplayControl
                    displayControlState={displayControlState}
                    changeDisplayControlState={changeDisplaySetting}
                  />
                  <OperateButton onClick={openChartIndicators}>
                    <IndicatorsIcon />
                  </OperateButton>
                  <LineType lineType={lineType} changeLineType={changeLineType} />
                  <OperateButton onClick={openChartSetting}>
                    <SettingIcon />
                  </OperateButton>
                </Flex>

              </>
            }

          </TopBar>
          <div className="oui-h-full oui-w-full" ref={chartRef}></div>

        </div>
      )}
    </div>
  );
}
