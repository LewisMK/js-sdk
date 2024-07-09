import { FC } from "react";
import { Flex, Select, Text } from "@orderly.network/ui";
import { TitleStatisticReturns } from "./titleStatistic.script";

export const TitleStatisticUI: FC<TitleStatisticReturns> = (props) => {
  return (
    <Flex
      r={"2xl"}
      p={6}
      width={"100%"}
      gap={4}
      direction={"column"}
      className="oui-bg-base-9"
    >
      <Title {...props} />
      <Flex className="oui-h-[170px] 2xl:oui-h-[196px]"></Flex>
    </Flex>
  );
};

const Title: FC<TitleStatisticReturns> = (props) => {
  return (
    <Flex direction={"row"} justify={"between"} width={"100%"}>
      <Text className="oui-text-lg">TitleStatistic</Text>
      <Flex direction={"row"} gap={2} className={"oui-min-w-14"}>
        <Select.options
          size={"xs"}
          value={props.period}
          onValueChange={props.onPeriodChange}
          options={props.periodTypes}
        />
        <Select.options
          size={"xs"}
          value={props.volType}
          onValueChange={props.onVolTypeChange}
          options={props.volTypes}
        />
      </Flex>
    </Flex>
  );
};