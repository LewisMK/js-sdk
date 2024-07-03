import { ElementType, FC, useMemo, isValidElement } from "react";
import { ExtensionPosition } from "./types";
import { OrderlyExtensionRegistry } from "./registry";
import { useExtensionBuilder } from "./useExtensionBuilder";
import { Slot } from "@radix-ui/react-slot";
import { NotFound } from "./notFound";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  position: ExtensionPosition;
  defaultWidget?: React.ReactNode;
  scope?: string[];
  [key: string]: any;
}

export const ExtensionSlot: FC<Props> = (props) => {
  const { position, scope, defaultWidget: defaultValue, ...rest } = props;
  // const [component, setComponent] = useState<ReactNode | null>(null);
  //

  const elementProps = useExtensionBuilder(position, rest);

  // console.log("👉elementProps", elementProps);

  const Ele = useMemo<ElementType>(() => {
    const registry = OrderlyExtensionRegistry.getInstance();
    const plugin = registry.getPluginsByPosition(position);

    if (isValidElement(plugin?.render)) {
      return plugin?.render;
    }

    if (isValidElement(defaultValue)) {
      return defaultValue;
    }

    return NotFound;
  }, []);

  return (
    <ErrorBoundary
      fallback={<div>{`Component: [${position}] went wrong`}</div>}
    >
      <Slot {...(elementProps as any)} position={position}>
        <Ele />
      </Slot>
    </ErrorBoundary>
  );
};
