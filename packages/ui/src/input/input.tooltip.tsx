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

export type InputWithTooltipProps = InputProps & {
  tooltip?: string;
};

export const InputWithTooltip = forwardRef<
  HTMLInputElement,
  InputWithTooltipProps
>((props, ref) => {
  const { tooltip, ...inputProps } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof tooltip !== "undefined" && tooltip.length > 0) {
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
        <TooltipContent>
          {props.tooltip}
          <TooltipArrow />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  );
});

InputWithTooltip.displayName = "InputWithTooltip";