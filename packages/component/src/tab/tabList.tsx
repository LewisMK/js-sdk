import {
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  MouseEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import { TabIndicator } from "./indicator";
import { Tab } from "./tab";
import { TabContext, TabContextState } from "./tabContext";
import { cn } from "@/utils/css";

export type TabItem = {
  title: ReactNode;
  value?: string;
  disabled?: boolean;
};

export type TabBarExtraRender = (tabContext: TabContextState) => ReactNode;

interface TabListProps {
  tabs: TabItem[];
  value?: string;
  //   activeIndex: number;
  onTabChange?: (value: string) => void;
  tabBarExtra?: ReactNode | TabBarExtraRender;
  className?: string;
  showIdentifier?: boolean;
  fullWidth?: boolean;
}

type IndicatorBounding = {
  left: number;
  width: number;
};

export const TabList: FC<TabListProps> = (props) => {
  const [bounding, setBounding] = useState<IndicatorBounding>({
    left: 0,
    width: 40,
  });

  const boxRef = useRef<HTMLDivElement>(null);
  const tabContext = useContext(TabContext);

  const calcLeft = useCallback(
    (target: HTMLButtonElement) => {
      if (!target || !boxRef.current) {
        return;
      }
      const { left, width } = target.getBoundingClientRect();
      const { left: parentLeft } = boxRef.current?.getBoundingClientRect();

      // const parentLeft = boxRef.current?.getBoundingClientRect().left || 0;

      setBounding(() => ({
        // left: left - parentLeft + (width - 40) / 2,
        left: left - parentLeft,
        width,
      }));
    },
    [boxRef.current]
  );

  const onItemClick = useCallback(
    (value: any, event: MouseEvent<HTMLButtonElement>) => {
      if (typeof props.onTabChange === "undefined") return;

      calcLeft(event.currentTarget as HTMLButtonElement);
      props.onTabChange?.(value);

      if (!tabContext.contentVisible) {
        tabContext.toggleContentVisible();
      }
    },
    [props.onTabChange, tabContext.contentVisible]
  );

  useEffect(() => {
    if (!props.showIdentifier || !boxRef.current) return;

    const callback = (entries: ResizeObserverEntry[]) => {
      // console.log("entries", entries);
      entries.forEach((entry) => {
        const target = entry.target as HTMLButtonElement;
        // console.log("target", target);

        if (target.classList.contains("orderly-active")) {
          calcLeft(target);
        }
      });
    };
    const resizeObserver = new ResizeObserver(callback);

    const tabs = boxRef.current.querySelectorAll(".orderly-tab-item");

    tabs.forEach((tab) => {
      resizeObserver.observe(tab);
    });

    return () => {
      resizeObserver.disconnect();
    };
  }, [props.showIdentifier]);

  const extraNode = useMemo(() => {
    if (typeof props.tabBarExtra === "undefined") return null;
    if (typeof props.tabBarExtra === "function") {
      return props.tabBarExtra(tabContext);
    }
    return props.tabBarExtra;
  }, [props.tabBarExtra, tabContext]);

  return (
    <div
      className={cn(
        "orderly-flex orderly-border-b orderly-border-b-divider orderly-px-3 orderly-items-center",
        props.className
      )}
    >
      <div className="orderly-pb-1 orderly-relative orderly-flex-1 orderly-h-full orderly-flex orderly-items-center">
        <div
          className={cn("orderly-flex orderly-space-x-5 orderly-h-full", {
            "orderly-w-full": props.fullWidth,
          })}
          ref={boxRef}
        >
          {props.tabs.map((item, index) => {
            return (
              <Tab
                key={index}
                title={item.title}
                value={item.value ?? index}
                disabled={item.disabled}
                fullWidth={props.fullWidth}
                active={
                  !!item.value &&
                  !!props.value &&
                  item.value === props.value &&
                  tabContext.contentVisible
                }
                onClick={onItemClick}
              />
            );
          })}
        </div>
        {props.showIdentifier && (
          <TabIndicator left={bounding.left} width={bounding.width} />
        )}
      </div>
      {extraNode}
    </div>
  );
};
