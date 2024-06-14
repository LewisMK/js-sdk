import { FC, createContext, PropsWithChildren, useEffect } from "react";
import { useWalletStateHandle } from "../hooks/useWalletStateHandle";
import { useAppState } from "../hooks/useAppState";

type AppContextState = {};

const AppContext = createContext<AppContextState>({} as AppContextState);

export const AppStateProvider: FC<PropsWithChildren> = (props) => {
  useWalletStateHandle();
  useAppState();

  return <AppContext.Provider value={{}}>{props.children}</AppContext.Provider>;
};
