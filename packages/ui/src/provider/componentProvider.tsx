import { ExtensionPosition } from "../plugin/types";
import { ComponentType, FC, PropsWithChildren, useEffect } from "react";

const ComponentsProvider: FC<
  PropsWithChildren<{
    components?: { [position in ExtensionPosition]: ComponentType };
  }>
> = (props) => {
  useEffect(() => {
    if (props.components && Object.keys(props.components).length) {
      for (const position in props.components) {
        console.log(position, props.components[position]);
      }
    }
  }, [props.components]);

  return props.children;
};

export { ComponentsProvider };