import React, {
  type PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { WalletConnectorContext } from "@orderly.network/hooks";
import { hex2int, int2hex } from "@orderly.network/utils";
import { ChainNamespace } from "@orderly.network/types";
import { useSOL } from "./useSOL";
import { useEvm } from "./useEvm";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { SolanaChains } from "./config";

export function Main(
  props: PropsWithChildren<{ solanaNetwork: WalletAdapterNetwork }>
) {
  const sol = useSOL();
  const evm = useEvm();

  const [namespace, setNamespace] = useState<ChainNamespace | null>(null);

  const newNamespace = useRef<ChainNamespace | null>();

  const connect = async (options: any) => {
    if (Array.from(SolanaChains.values()).includes(options.chainId)) {
      newNamespace.current = ChainNamespace.solana;
      // connect solana
      return sol.connect().then((res) => {
        console.log("-- connect sol", res);
        if (res) {
          return res;
        }
      });
    }
    newNamespace.current = ChainNamespace.evm;
    const evmOption = options.autoSelect
      ? {
          autoSelect: options.autoSelect,
        }
      :undefined;

    return evm
      .connect(evmOption)
      .then((res) => {
        console.log("-- connect evm", res);
        if (!res.length) {
          return Promise.reject({ message: "user reject" });
        }
        return res;
      })
      .catch((e) => {
        console.log("-- connect evm error", e);
        return Promise.reject(e);
      });
  };

  const disconnect = async () => {
    if (namespace === ChainNamespace.evm) {
      return evm.disconnect();
    }
    if (namespace === ChainNamespace.solana) {
      return sol.disconnect();
    }
  };

  const connecting =
    newNamespace.current == ChainNamespace.solana
      ? sol.connecting
      : evm.connecting;

  // console.log('-- connecting', connecting);

  const wallet =
    namespace === ChainNamespace.solana && sol.connected
      ? sol.wallet
      : namespace === ChainNamespace.evm && evm.connected
      ? evm.wallet
      : null;

  const connectedChain =
    namespace === ChainNamespace.solana
      ? sol.connectedChain
      : evm.connectedChain;

  const setChain = (chain: any) => {
    // solana connect
    const chainId =
      typeof chain.chainId === "number"
        ? chain.chainId
        : hex2int(chain.chainId);
    // console.log('-- setchain chain',{
    //   chain, chainId,
    // });

    let tempNamespace: ChainNamespace = ChainNamespace.evm;
    if (Array.from(SolanaChains.values()).includes(chainId)) {
      tempNamespace = ChainNamespace.solana;
    }
    console.log("--- namespace", {
      namespace,
      tempNamespace,
    });
    if (namespace === tempNamespace && namespace === ChainNamespace.evm) {
      // todo switch chan on block native

      return evm.changeChain(chain);
    }
    if (namespace !== tempNamespace) {
      return connect({ chainId: chainId }).then();
    }
  };

  useEffect(() => {
    // console.log("-- connect", {
    //   sol: sol.connected,
    //   evm: evm.connected,
    // });
    if (sol.connected && evm.connected) {
      if (newNamespace.current === ChainNamespace.solana) {
        evm.disconnect().then();
        setNamespace(ChainNamespace.solana);
        return;
      } else {
        setNamespace(ChainNamespace.evm);
        sol.disconnect().then();
        return;
      }
    }

    if (sol.connected) {
      setNamespace(ChainNamespace.solana);
      return;
    }
    if (evm.connected) {
      setNamespace(ChainNamespace.evm);
      return;
    }
  }, [newNamespace.current, sol.connected, evm.connected]);
  // console.log('--main wallet', {
  //   wallet,
  //   'sol wallet': sol.wallet
  // });

  return (
    <WalletConnectorContext.Provider
      value={{
        connect,
        disconnect,
        connecting,
        wallet,
        setChain,
        connectedChain,
        namespace,
      }}
    >
      {props.children}
    </WalletConnectorContext.Provider>
  );
}
