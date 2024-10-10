import { forwardRef, useEffect, useState } from "react";
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipArrow,
  TooltipTrigger,
} from "../tooltip";
import { Input, InputProps } from "./input";
import type { TooltipContentProps } from "@radix-ui/react-tooltip";

export type InputWithTooltipProps = InputProps & {
  tooltip?: React.ReactNode;
  tooltipProps?: {
    content?: TooltipContentProps;
  };
};

export const InputWithTooltip = forwardRef<
  HTMLInputElement,
  InputWithTooltipProps
>((props, ref) => {
  const { tooltip, tooltipProps, ...inputProps } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof tooltip !== "undefined" && tooltip !== "" && tooltip !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [tooltip]);

  return (
    <TooltipRoot open={open}>
      <TooltipTrigger asChild>
        <div>
          <Input {...inputProps} ref={ref} />
        </div>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent {...tooltipProps?.content}>
          {props.tooltip}
          <TooltipArrow />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
});

InputWithTooltip.displayName = "InputWithTooltip";
