import {
  useDebounce,
  useDebouncedCallback,
  useLeverage,
  useMarginRatio,
} from "@orderly.network/hooks";
import { SliderMarks, toast, useModal } from "@orderly.network/ui";
import { log } from "console";
import { useMemo, useState } from "react";

export const useLeverageScript = () => {
  const { currentLeverage } = useMarginRatio();

  const { hide } = useModal();

  const [maxLeverage, { update, config: leverageLevers, isMutating }] =
    useLeverage();
  const onLeverageChange = (leverage: number) => {
    setLeverage(leverage);
    // updateLeverage(leverage);
  };
  const [leverage, setLeverage] = useState(maxLeverage ?? 0);

  const marks = useMemo((): SliderMarks => {
    return (
      leverageLevers?.map((e: number) => ({
        label: `${e}x`,
        value: e,
      })) || []
    );
  }, [leverageLevers]);

  const step = 100 / ((marks?.length || 0) - 1);

  const leverageValue = useMemo(() => {
    const index = leverageLevers.findIndex((item: any) => item === leverage);

    return index * step;
  }, [leverageLevers, leverage, step]);

  const onCancel = () => hide();
  const onSave = async () => {
    try {
      update({ leverage }).then(
        (res: any) => {
          hide();
          toast.success("Leverage updated");
        },
        (err: Error) => {
          toast.error(err.message);
        }
      );
    } catch (e) {}
  };

  return {
    currentLeverage,
    value: leverageValue,
    marks,
    onLeverageChange,
    step,
    onCancel,
    onSave,
    isLoading: isMutating,
  };
};

export type LeverageScriptReturns = ReturnType<typeof useLeverageScript>;