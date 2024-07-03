import React from "react";
import { Input, InputProps } from "./input";
import { InputHelpText } from "./inputHelpText";
import { tv } from "../utils/tv";
import { VariantProps } from "tailwind-variants";
import { Slot } from "@radix-ui/react-slot";

const textFieldVariants = tv({
  slots: {
    root: "oui-flex",
    label: "oui-text-sm oui-font-semibold",
    input: [],
  },
  variants: {
    direction: {
      column: {
        root: "oui-flex-col oui-space-y-1",
      },
      row: {
        root: "oui-flex-row oui-space-x-3 ",
      },
    },
  },
  defaultVariants: {
    direction: "column",
  },
});

export type TextFieldProps = InputProps & {
  label: string;
  helpText?: string;
  classNames?: {
    root?: string;
    label?: string;
    input?: string;
  };
} & VariantProps<typeof textFieldVariants>;

export const TextField: React.FC<TextFieldProps> = React.forwardRef<
  HTMLDivElement,
  TextFieldProps
>((props, ref) => {
  const { label, helpText, direction, className, ...inputProps } = props;
  const { root, label: labelClassName } = textFieldVariants({ direction });

  return (
    <div className={root({ className, direction })}>
      <InputLabel className={labelClassName()}>{label}</InputLabel>
      <div>
        <Input {...inputProps} />
        <InputHelpText color={inputProps.color}>{helpText}</InputHelpText>
      </div>
    </div>
  );
});

interface InputLabelProps extends React.HTMLAttributes<HTMLLabelElement> {
  asChild?: boolean;
}

const InputLabel = React.forwardRef<HTMLLabelElement, InputLabelProps>(
  (props, ref) => {
    const { asChild = false, className, ...rest } = props;
    const Comp = asChild ? Slot : "label";

    return (
      <Comp className={className} ref={ref} {...rest}>
        {props.children}
      </Comp>
    );
  }
);

InputLabel.displayName = "InputLabel";
