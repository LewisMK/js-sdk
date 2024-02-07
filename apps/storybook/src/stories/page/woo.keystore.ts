import { BaseKeyStore, OrderlyKeyPair } from "@orderly.network/core";

export class WooKeyStore extends BaseKeyStore {
  getOrderlyKey(): OrderlyKeyPair {
    return "";
  }
  getAccountId(): string | undefined {
    try {
      const parsedConfigs = this.parseLocalStorageConfigs();

      return parsedConfigs["loginAccountInfo"]?.["applicationId"];
    } catch (e) {
      console.error(e);
    }
  }
  setAccountId(accountId: string): void {
    console.log("TODO: setAccountId to woo redux", accountId);
  }
  getAddress(): string | undefined {
    try {
      const parsedConfigs = this.parseLocalStorageConfigs();

      return parsedConfigs["userAddress"];
    } catch (e) {
      console.error(e);
    }
  }
  setAddress(address: string): void {
    // throw new Error("Method not implemented.");
    console.log("TODO: setAddress to woo redux", address);
  }
  generateKey(): OrderlyKeyPair {
    throw new Error("Method not implemented.");
  }
  setKey(orderlyKey: string, secretKey: string): void {
    throw new Error("Method not implemented.");
  }
  cleanAllKey(): void {
    throw new Error("Method not implemented.");
  }
  cleanKey(key: string): void {
    throw new Error("Method not implemented.");
  }

  private parseLocalStorageConfigs() {
    if (typeof window === "undefined") {
      throw new Error("WooKeyStore is only for client side.");
    }
    const configs = localStorage.getItem("persist:root");
    if (!configs) {
      // throw new Error("No configs found in localStorage.");
      console.log("No configs found in localStorage.");
      return {};
    }
    let parsedConfigs = JSON.parse(configs);
    if (parsedConfigs["global"]) {
      parsedConfigs = JSON.parse(parsedConfigs["global"]);
    }
    console.log("parsedConfigs", parsedConfigs);
    return parsedConfigs;
  }
}