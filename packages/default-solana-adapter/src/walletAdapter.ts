import { SolanaAdapterOption, SolanaWalletProvider } from "./types";
import {
  AddOrderlyKeyInputs,
  BaseWalletAdapter,
  Message,
  RegisterAccountInputs,
  SettleInputs,
  SignatureDomain,
  SimpleDI,
  WithdrawInputs,
  Account,
  MessageFactor,
} from "@orderly.network/core";
import { API, MaxUint256, ChainNamespace } from "@orderly.network/types";
import * as ed from "@noble/ed25519";
import { encode as bs58encode, decode as bs58Decode } from "bs58";
import {
  addOrderlyKeyMessage,
  checkIsLedgerWallet,
  deposit,
  encodeLzMessage,
  getDepositQuoteFee,
  MsgType,
  registerAccountMessage,
  settleMessage,
  withdrawMessage,
} from "./helper";
import { bytesToHex } from "ethereum-cryptography/utils";
import { getAccount } from "@solana/spl-token";
import { getUSDCAccounts } from "./solana.util";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

class DefaultSolanaWalletAdapter extends BaseWalletAdapter<SolanaAdapterOption> {
  chainNamespace: ChainNamespace = ChainNamespace.solana;

  private _address!: string;
  private _chainId!: number;
  private _provider!: SolanaWalletProvider;
  private _connection!: Connection;

  constructor() {
    super();
  }

  get address(): string {
    return this._address;
  }

  get chainId(): number {
    return this._chainId;
  }

  set chainId(chainId: number) {
    this._chainId = chainId;
  }

  get connection(): Connection {
    if (this._connection) {
      return this._connection;
    }
    if (this._provider.rpcUrl) {
        this._connection = new Connection(this._provider.rpcUrl, {
          commitment: "confirmed",
        });
      return this._connection;
    }
    if (this._provider.network === WalletAdapterNetwork.Devnet) {
      this._connection = new Connection(clusterApiUrl(this._provider.network), {
        commitment: "confirmed",
      });
      return this._connection;
    }


    const account = SimpleDI.get<Account>("account");
    const url = '/v1/solana-rpc-proxy';
    this._connection = new Connection(`${account.apiBaseUrl}${url}`, {
      commitment: "confirmed",
      fetchMiddleware: async (info, init, fetch) => {
       
        const payload: MessageFactor = {
          url,
          method: init?.method as "GET" | "POST" | "PUT" | "DELETE",
          data: JSON.parse(init?.body as string),
        }
        // console.log('payload', payload);
        const signature = await this.signMessageByOrderlyKey(payload);
        for (const key of Object.keys(signature)) {
          (init?.headers as any)[key] = signature[key as keyof typeof signature] as string;
        }
        return fetch(info, init);
      }
    });
    return this._connection;
  }

  private setConfig(config: SolanaAdapterOption) {
    this._address = config.address;
    this._chainId = config.chain.id;
    if (config.provider) {
      this._provider = config.provider;
    }
  }

  private lifecycleName(name: string, data: any) {
    console.log("lifecycle", name, data);
  }

  active(config: SolanaAdapterOption): void {
    this.setConfig(config);
    this.lifecycleName("active", config);
  }

  deactivate(): void {
    this.lifecycleName("deactivate", {});
  }

  update(config: SolanaAdapterOption): void {
    this.lifecycleName("update", config);
    this.setConfig(config);
  }

  generateSecretKey(): string {
    let privKey, secretKey;
    do {
      privKey = ed.utils.randomPrivateKey();
      secretKey = bs58encode(privKey);
    } while (secretKey.length !== 44);

    return secretKey;
  }

  uint8ArrayToHexString(uint8Array: Uint8Array): string {
    return Array.from(uint8Array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  async signMessage(message: Uint8Array): Promise<string> {
    const isLedger = checkIsLedgerWallet(this._address);
    // test ledger wallet
    // if (!isLedger) {
    //   console.log("-- test error");
    //   throw new Error(
    //     "xxx Signing off chain messages with Ledger is not yet supported"
    //   );
    // }

    if (isLedger) {
      const transaction = new Transaction();

      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: new PublicKey(
            "ComputeBudget111111111111111111111111111111"
          ),
          data: new Uint8Array([3, 0, 0, 0, 0, 0, 0, 0, 0]) as any,
        })
      );

      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: new PublicKey(
            "ComputeBudget111111111111111111111111111111"
          ),
          data: new Uint8Array([2, 0, 0, 0, 0]) as any,
        })
      );

      transaction.add(
        new TransactionInstruction({
          keys: [],
          programId: new PublicKey(
            "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"
          ),
          data: message as any,
        })
      );

      const userPublicKey = new PublicKey(this.address);

      transaction.feePayer = userPublicKey;

      const zeroHash = new Uint8Array(32).fill(0);
      transaction.recentBlockhash = new PublicKey(zeroHash).toString();


      const signedTransaction = await this._provider.signTransaction(
        transaction
      );


      const signature = signedTransaction.signatures[0].signature;
      if (signature) {
        return this.uint8ArrayToHexString(signature as any);
      } else {
        console.log("-- sign message error", signature);
        throw new Error("Unsupported signature");
      }
    }
    const signRes = await this._provider.signMessage(message);
    return "0x" + bytesToHex(signRes);
  }

  async generateRegisterAccountMessage(
    inputs: RegisterAccountInputs
  ): Promise<Message> {
    const [message, toSignatureMessage] = registerAccountMessage({
      ...inputs,
      chainId: this.chainId,
    });

    const signature = await this.signMessage(toSignatureMessage as Uint8Array);

    return {
      message: {
        ...message,
        chainType: "SOL",
      },
      signatured: signature,
    };
  }

  async generateWithdrawMessage(
    inputs: WithdrawInputs
  ): Promise<Message & { domain: SignatureDomain }> {
    const [message, toSignatureMessage] = withdrawMessage({
      ...inputs,
      chainId: this.chainId,
    });
    const signature = await this.signMessage(toSignatureMessage as Uint8Array);


    return {
      message: {
        ...message,
        chainType: "SOL",
      },
      domain: {
        name: "",
        version: "",
        chainId: this.chainId,
        verifyingContract: inputs.verifyContract!,
      },
      signatured: signature,
    };
  }

  async generateAddOrderlyKeyMessage(
    inputs: AddOrderlyKeyInputs
  ): Promise<Message> {
    const [message, toSignatureMessage] = addOrderlyKeyMessage({
      ...inputs,
      chainId: this.chainId,
    });
    const signature = await this.signMessage(toSignatureMessage as Uint8Array);

    return {
      message: {
        ...message,
        chainType: "SOL",
      },
      signatured: signature,
    };
  }

  async generateSettleMessage(
    inputs: SettleInputs
  ): Promise<Message & { domain: SignatureDomain }> {
    const [message, toSignatureMessage] = settleMessage({
      ...inputs,
      chainId: this.chainId,
    });
    const signature = await this.signMessage(toSignatureMessage as Uint8Array);
    return {
      message: {
        ...message,
        chainType: "SOL",
      },
      domain: {
        name: "",
        version: "",
        chainId: this.chainId,
        verifyingContract: inputs.verifyContract!,
      },
      signatured: signature,
    };
  }

  async getBalance(): Promise<bigint> {
    return BigInt(0);
  }

  async call(
    address: string,
    method: string,
    params: any[],
    options?: {
      abi: any;
    }
  ) {
    // console.log('-- solanan call', {
    //   address,
    //   method,
    //   params,
    //   options,
    // })
    if (method === "balanceOf") {
      const usdcPublicKey = new PublicKey(address);
      const userPublicKey = new PublicKey(this._address);
      const userUSDCAccount = getUSDCAccounts(usdcPublicKey, userPublicKey);
      const connection = this.connection;

      const usdcamount = await getAccount(
        connection,
        userUSDCAccount,
        "confirmed"
      );
      return usdcamount.amount;
    }
    if (method === "allowance") {
      return MaxUint256;
    }
    return BigInt(0);
  }

  async sendTransaction(
    contractAddress: string,
    method: string,
    payload: {
      from: string;
      to?: string;
      data: any[];
      value?: bigint;
    },
    options: {
      abi: any;
    }
  ) {
    console.log("-- solanan sendTransaction", {
      contractAddress,
      method,
      payload,
      options,
    });
    if (method === "deposit") {
      return deposit({
        vaultAddress: contractAddress,
        userAddress: this._address,
        connection: this.connection,
        depositData: payload.data[0],
        sendTransaction: this._provider.sendTransaction,
      });
    }
  }

  async callOnChain(
    chain: API.NetworkInfos,
    address: string,
    method: string,
    params: any[],
    options: {
      abi: any;
    }
  ): Promise<any> {
    console.log("-- params ", {
      chain,
      address,
      method,
      params,
    });
    if (method === "getDepositFee") {
      return getDepositQuoteFee({
        vaultAddress: address,
        userAddress: this._address,
        connection: this.connection,
        depositData: params[1],
      });
    }
    return 0;
  }

  async pollTransactionReceiptWithBackoff(
    txHash: string,
    baseInterval?: number,
    maxInterval?: number,
    maxRetries?: number
  ): Promise<any> {
    return Promise.resolve({status: 1})
   }
}

export { DefaultSolanaWalletAdapter };
