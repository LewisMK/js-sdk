"use client";

import { KeyStore } from "./keyStore";
import { base64url } from "./utils";

import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

export type MessageFactor = {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
};

export type SignedMessagePayload = {
  "orderly-key": string;
  "orderly-timestamp": string;
  "orderly-signature": string;
};

export interface Signer {
  sign: (data: MessageFactor) => Promise<SignedMessagePayload>;
}

export class BaseSigner implements Signer {
  constructor(private readonly keyStore: KeyStore) {}

  async sign(message: MessageFactor): Promise<SignedMessagePayload> {
    const orderlyKeyPair = this.keyStore.getOrderlyKey();
    const url = new URL(message.url);
    const timestamp = Date.now().toString();
    let msgStr = [
      timestamp,
      message.method.toUpperCase(),
      url.pathname + url.search,
    ].join("");
    if (message.data && Object.keys(message.data).length) {
      msgStr += JSON.stringify(message.data);
    }
    const u8 = Buffer.from(msgStr);

    const signature = await orderlyKeyPair.sign(u8);
    // console.log("signature", signature);
    const signHex = Buffer.from(signature).toString("base64");
    // console.log("signHex", signHex);
    const b64 = base64url(signHex);
    // console.log("b64", b64);

    return {
      "orderly-key": await orderlyKeyPair.getPublicKey(),
      "orderly-timestamp": timestamp,
      "orderly-signature": b64,
    };
  }
}
