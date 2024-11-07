import {
  CaretDownIcon,
  cn,
  Flex,
  Input,
  MenuItem,
  Text,
  SimpleDropdownMenu,
} from "@orderly.network/ui";
import { PNLInputState, PnLMode } from "./useBuilder.script";
import { inputFormatter } from "@orderly.network/ui";
import { useEffect, useMemo, useState } from "react";

export type PNLInputProps = PNLInputState & {
  testId?: string;
  quote: string;
  type: "TP" | "SL";
};

export const PNLInput = (props: PNLInputProps) => {
  const {
    mode,
    modes,
    onModeChange,
    onValueChange,
    quote,
    quote_dp,
    value,
    type,
    tips,
    onFocus,
    onBlur,
  } = props;

  const [prefix, setPrefix] = useState<string>(mode);
  useEffect(() => {
    setPrefix(mode);
  }, [mode]);
  const [placeholder, setPlaceholder] = useState<string>(
    mode === PnLMode.PERCENTAGE ? "%" : quote
  );

  useEffect(() => {
    setPrefix(!!value ? "" : mode);
  }, [value]);

  const id = useMemo(() => `${type.toLowerCase()}_${mode.toLowerCase()}`, []);

  return (
    <Input.tooltip
      prefix={prefix}
      size={"md"}
      placeholder={placeholder}
      id={id}
      align={"right"}
      value={value}
      tooltip={tips}
      tooltipProps={{
        content: {
          side: props.type === "TP" ? "top" : "bottom",
        },
      }}
      data-testid={props.testId}
      autoComplete={"off"}
      onValueChange={onValueChange}
      formatters={[
        props.formatter({ dp: quote_dp, mode, type }),
        inputFormatter.currencyFormatter,
      ]}
      classNames={{
        root: type === "TP" ? "oui-text-trade-profit" : "oui-text-trade-loss",
        additional: "oui-text-base-contrast-54",
        input: "oui-text-inherit",
      }}
      onFocus={() => {
        setPrefix("");
        setPlaceholder("");
        onFocus();
      }}
      onBlur={() => {
        setPrefix(!!value ? "" : mode);
        setPlaceholder(mode === PnLMode.PERCENTAGE ? "%" : quote);
        onBlur();
      }}
      suffix={
        <>
          {mode === PnLMode.PERCENTAGE &&  (
            <Text size={"2xs"} color="inherit" className="oui-ml-[2px]">
              %
            </Text>
          )}
          <PNLMenus
            mode={prefix}
            modes={modes}
            onModeChange={(item) => onModeChange(item.value as PnLMode)}
          />
        </>
      }
    />
  );
};

const PNLMenus = (props: {
  mode?: string;
  modes: MenuItem[];
  onModeChange: (value: MenuItem) => void;
}) => {
  return (
    <SimpleDropdownMenu
      currentValue={props.mode}
      menu={props.modes}
      align={"end"}
      size={"xs"}
      className={"oui-min-w-[80px]"}
      onCloseAutoFocus={(event) => event.preventDefault()}
      onSelect={(item) => props.onModeChange(item as MenuItem)}
    >
      <button className={"oui-p-2"}>
        <CaretDownIcon size={12} color={"white"} />
      </button>
    </SimpleDropdownMenu>
  );
};
