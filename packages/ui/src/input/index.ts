import { QuantityInput } from "./extends/quantity";
import { Input as InputBase, inputVariants } from "./input";

export { InputAdditional } from "./inputAdditional";

export type { InputProps } from "./input";

export * as inputFormatter from "./formatter";

export type {
  InputFormatter,
  InputFormatterOptions,
} from "./formatter/inputFormatter";

export { TextField } from "./textField";

export { type TextFieldProps } from "./textField";

export { InputHelpText } from "./inputHelpText";
export type { InputHelpTextProps } from "./inputHelpText";

type InputType = typeof InputBase & {
  token: typeof QuantityInput;
};

const Input = InputBase as InputType;
Input.token = QuantityInput;

export { Input, inputVariants };