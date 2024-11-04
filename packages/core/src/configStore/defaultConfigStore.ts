import { ChainNamespace } from "@orderly.network/types";
import { ConfigKey, ConfigStore } from "./configStore";

type URLS = {
  apiBaseUrl: string;
  publicWsUrl: string;
  privateWsUrl: string;
  operatorUrl: Record<keyof typeof ChainNamespace, string>;
};

const API_URLS: { [key: string]: URLS } = {
  mainnet: {
    apiBaseUrl: "https://api-evm.orderly.org",
    publicWsUrl: "wss://ws-evm.orderly.org",
    privateWsUrl: "wss://ws-private-evm.orderly.org",
    operatorUrl: {
      evm: "https://operator-evm.orderly.org",
      solana: "https://operator-solana.orderly.org",
    },
  },
  testnet: {
    apiBaseUrl: "https://testnet-api-evm.orderly.org",
    publicWsUrl: "wss://testnet-ws-evm.orderly.org",
    privateWsUrl: "wss://testnet-ws-private-evm.orderly.org",
    operatorUrl: {
      evm: "https://testnet-operator-evm.orderly.org",
      solana: "https://testnet-operator-sol.orderly.org",
    },
  },
};

export class DefaultConfigStore implements ConfigStore {
  protected map: Map<ConfigKey, any>;

  constructor(init: Partial<Record<ConfigKey, any>>) {
    const env = init.env || "prod";
    const networkId = init.networkId || "mainnet";
    const urls = API_URLS[networkId];
    const brokerId = init?.brokerId || "orderly";
    const brokerName = init?.brokerName || "Orderly";
    const chainNamespace = init?.chainNamespace || ChainNamespace.evm;

    this.map = new Map<ConfigKey, any>([
      ["brokerId", brokerId],
      ["brokerName", brokerName],
      ["env", env],
      ["chainNamespace", chainNamespace],
      ["apiBaseUrl", urls["apiBaseUrl"]],
      ["publicWsUrl", urls["publicWsUrl"]],
      ["privateWsUrl", urls["privateWsUrl"]],
      ["operatorUrl", urls["operatorUrl"]],
      ["networkId", networkId],
    ]);

    // this.solanaMap = new Map<ConfigKey, any>([]);
  }
  get<T>(key: ConfigKey): T {
    const value = this.map.get(key);
    if (typeof value !== "object" || value === null) {
      return value;
    }

    return value[this.get("chainNamespace") as ChainNamespace] as T;
  }
  getOr<T>(key: ConfigKey, defaultValue: T): T {
    return this.map.get(key) ?? defaultValue;
  }
  set<T>(key: ConfigKey, value: T): void {
    this.map.set(key, value);
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
}
