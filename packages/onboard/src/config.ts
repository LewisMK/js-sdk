import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";
import type { InitOptions, OnboardAPI } from "@web3-onboard/core";
import { getChainsArray } from "./chains";
import binanceModule from "@binance/w3w-blocknative-connector";
// import bitgetWalletModule from "@web3-onboard/bitget";
import { merge } from "lodash";

// initialize the module with options
const binance = binanceModule({ options: { lng: "en" } });
// const bitgetWallet = bitgetWalletModule();

export const initConfig: (
  apiKey?: string,
  options?: InitOptions
) => OnboardAPI = (apiKey, options) => {
  const defaultOptions = {
    apiKey,
    connect: {
      // autoConnectAllPreviousWallet: true,
      autoConnectLastWallet: true,
    },
    wallets: [injectedModule(), binance],
    chains: getChainsArray(),
    appMetadata: {
      name: "Orderly",
      // icon: blocknativeIcon,
      description: "Orderly",
      recommendedInjectedWallets: [
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
        { name: "MetaMask", url: "https://metamask.io" },
        { name: "Trezor", url: "https://trezor.io/" },
        { name: "Walletconnect", url: "https://walletconnect.com/" },
        { name: "Ledger", url: "https://www.ledger.com/" },
      ],
      agreement: {
        version: "1.0.0",
        termsUrl: "https://www.blocknative.com/terms-conditions",
        privacyUrl: "https://www.blocknative.com/privacy-policy",
      },
      gettingStartedGuide: "https://blocknative.com",
      explore: "https://blocknative.com",
    },
    accountCenter: {
      desktop: {
        enabled: false,
      },
      mobile: {
        enabled: false,
      },
    },
    theme: "dark",
  } as InitOptions;

  const mergedOptions = merge(defaultOptions, options);

  return init(mergedOptions);
};
