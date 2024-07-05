import { FC } from "react";
import { Flex, Select, Text } from "@orderly.network/ui";
import { SummaryReturns } from "./summary.script";
import { USDCIcon } from "../../../components/usdcIcon";

export const SummaryUI: FC<SummaryReturns> = (props) => {
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
      <CommissionData {...props} />
      <Flex direction={"column"} width={"100%"} gap={2}>
        <Row title="Referral vol. (USDC)" {...props} />
        <Row title="Referees" {...props} />
        <Row title="Referees that traded" {...props} />
      </Flex>
    </Flex>
  );
};

const Title: FC<SummaryReturns> = (props) => {
  return (
    <Flex direction={"row"} justify={"between"} width={"100%"}>
      <Text className="oui-text-lg">Summary</Text>
      <div className={"oui-min-w-14"}>
        <Select.options
          size={"xs"}
          value={props.period}
          onValueChange={props.onPeriodChange}
          options={props.periodTypes}
        />
      </div>
    </Flex>
  );
};

const CommissionData: FC<SummaryReturns> = (props) => {
  return (
    <Flex
      gradient="primary"
      angle={180}
      r="2xl"
      py={4}
      px={6}
      width={"100%"}
      direction={"column"}
      gap={3}
    >
      <Text intensity={54} className="oui-text-base 2xl:oui-text-lg">
        Commission (USDC)
      </Text>
      <Flex
        direction={"row"}
        gap={3}
        className="oui-text-xl md:oui-text-2xl xl:oui-text-3xl"
      >
        <USDCIcon className="md:oui-w-[24px] md:oui-h-[24px] lg:oui-w-[28px] lg:oui-h-[28px] "/>
        <Text>12,322.12</Text>
      </Flex>
    </Flex>
  );
};

const Row: FC<
  SummaryReturns & {
    title: string;
  }
> = (props) => {
  return (
    <Flex direction={"row"} justify={"between"} width={"100%"}>
      <Text
        intensity={54}
        className="oui-text-2xs md:oui-text-xs xl:oui-text-sm"
      >
        {props.title}
      </Text>
      <Text className="oui-text-xs md:oui-text-sm xl:oui-text-base">
        12,1222.1
      </Text>
    </Flex>
  );
};