export type SolanaVault = {
  "version": "0.1.0",
  "name": "solana_vault",
  "instructions": [
    {
      "name": "initVault",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitVaultParams"
          }
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "enforcedOptions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "allowedBroker",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "allowedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositParams",
          "type": {
            "defined": "DepositParams"
          }
        },
        {
          "name": "oappParams",
          "type": {
            "defined": "OAppSendParams"
          }
        }
      ],
      "returns": {
        "defined": "MessagingReceipt"
      }
    },
    {
      "name": "initOapp",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lzReceiveTypes",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitOAppParams"
          }
        }
      ]
    },
    {
      "name": "resetOapp",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinitOapp",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ReinitOAppParams"
          }
        }
      ]
    },
    {
      "name": "resetVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinitVault",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ReinitVaultParams"
          }
        }
      ]
    },
    {
      "name": "setBroker",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "allowedBroker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetBrokerParams"
          }
        }
      ]
    },
    {
      "name": "setToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "allowedToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetTokenParams"
          }
        }
      ]
    },
    {
      "name": "setOrderDelivery",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetOrderDeliveryParams"
          }
        }
      ]
    },
    {
      "name": "oappQuote",
      "accounts": [
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "enforcedOptions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppQuoteParams"
          }
        }
      ],
      "returns": {
        "defined": "MessagingFee"
      }
    },
    {
      "name": "lzReceive",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "userDepositWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultDepositWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppLzReceiveParams"
          }
        }
      ]
    },
    {
      "name": "lzReceiveTypes",
      "accounts": [
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppLzReceiveParams"
          }
        }
      ],
      "returns": {
        "vec": {
          "defined": "oapp::endpoint_cpi::LzAccount"
        }
      }
    },
    {
      "name": "setRateLimit",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetRateLimitParams"
          }
        }
      ]
    },
    {
      "name": "setDelegate",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetDelegateParams"
          }
        }
      ]
    },
    {
      "name": "transferAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TransferAdminParams"
          }
        }
      ]
    },
    {
      "name": "setPeer",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetPeerParams"
          }
        }
      ]
    },
    {
      "name": "setEnforcedOptions",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "enforcedOptions",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetEnforcedOptionsParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "enforcedOptions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "send",
            "type": "bytes"
          },
          {
            "name": "sendAndCall",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "oAppConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endpointProgram",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "oAppLzReceiveTypesAccounts",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oappConfig",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "peer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "rateLimiter",
            "type": {
              "option": {
                "defined": "RateLimiter"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "allowedBroker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "allowedToken",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenDecimals",
            "type": "u8"
          },
          {
            "name": "allowed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultAuthority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed for the vault authority PDA"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "depositNonce",
            "type": "u64"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "inboundNonce",
            "type": "u64"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VaultDepositParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "userAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "srcChainId",
            "type": "u128"
          },
          {
            "name": "tokenAmount",
            "type": "u128"
          },
          {
            "name": "srcChainDepositNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LzMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgType",
            "type": "u8"
          },
          {
            "name": "payload",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "InitOAppParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "endpointProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "OAppLzReceiveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "srcEid",
            "type": "u32"
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "guid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "message",
            "type": "bytes"
          },
          {
            "name": "extraData",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "AccountWithdrawSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "receiver",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "chainId",
            "type": "u64"
          },
          {
            "name": "withdrawNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultWithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "receiver",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u128"
          },
          {
            "name": "chainId",
            "type": "u128"
          },
          {
            "name": "withdrawNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppQuoteParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "to",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "options",
            "type": "bytes"
          },
          {
            "name": "message",
            "type": {
              "option": "bytes"
            }
          },
          {
            "name": "payInLzToken",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ReinitOAppParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "endpointProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetDelegateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "delegate",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetEnforcedOptionsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "send",
            "type": "bytes"
          },
          {
            "name": "sendAndCall",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "SetPeerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "peer",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "SetRateLimitParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "refillPerSecond",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "capacity",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TransferAdminParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "DepositParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "userAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppSendParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nativeFee",
            "type": "u64"
          },
          {
            "name": "lzTokenFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitVaultParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "ReinitVaultParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "depositNonce",
            "type": "u64"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "inboundNonce",
            "type": "u64"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "SetBrokerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "SetOrderDeliveryParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "nonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SetTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "RateLimiter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "capacity",
            "type": "u64"
          },
          {
            "name": "tokens",
            "type": "u64"
          },
          {
            "name": "refillPerSecond",
            "type": "u64"
          },
          {
            "name": "lastRefillTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unauthorized"
          },
          {
            "name": "InvalidSender"
          },
          {
            "name": "InvalidOptions"
          },
          {
            "name": "InvalidEndpointProgram"
          },
          {
            "name": "RateLimitExceeded"
          },
          {
            "name": "WithdrawFailed"
          },
          {
            "name": "InvalidInboundNonce"
          }
        ]
      }
    },
    {
      "name": "MsgType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          },
          {
            "name": "RebalanceBurn"
          },
          {
            "name": "RebalanceMint"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "SetAllowedBroker",
      "fields": [
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "ResetAllowedBroker",
      "fields": [
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "SetAllowedToken",
      "fields": [
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "mintAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ResetAllowedToken",
      "fields": [
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "mintAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "Deposited",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "Withdrawn",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "VaultDeposited",
      "fields": [
        {
          "name": "accountId",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "userAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "srcChainId",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "srcChainDepositNonce",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "VaultWithdrawn",
      "fields": [
        {
          "name": "accountId",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "sender",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "receiver",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u128",
          "index": false
        },
        {
          "name": "chainId",
          "type": "u128",
          "index": false
        },
        {
          "name": "withdrawNonce",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "OAppSent",
      "fields": [
        {
          "name": "guid",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "dstEid",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "OAppReceived",
      "fields": [
        {
          "name": "guid",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "srcEid",
          "type": "u32",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InsufficientFunds",
      "msg": "Deposited funds are insufficient for withdrawal"
    },
    {
      "code": 6001,
      "name": "UserInfoBelongsToAnotherUser",
      "msg": "User info pda belongs to another user"
    },
    {
      "code": 6002,
      "name": "BrokerNotAllowed",
      "msg": "Broker is not allowed"
    },
    {
      "code": 6003,
      "name": "TokenNotAllowed",
      "msg": "Token is not allowed"
    },
    {
      "code": 6004,
      "name": "InvalidAccountId",
      "msg": "AccountId is invalid"
    },
    {
      "code": 6005,
      "name": "InvalidVaultOwner",
      "msg": "Vault owner is not the same as the payer"
    }
  ]
};

export const IDL: SolanaVault = {
  "version": "0.1.0",
  "name": "solana_vault",
  "instructions": [
    {
      "name": "initVault",
      "accounts": [
        {
          "name": "signer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitVaultParams"
          }
        }
      ]
    },
    {
      "name": "deposit",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "userTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "enforcedOptions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "allowedBroker",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "allowedToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "depositParams",
          "type": {
            "defined": "DepositParams"
          }
        },
        {
          "name": "oappParams",
          "type": {
            "defined": "OAppSendParams"
          }
        }
      ],
      "returns": {
        "defined": "MessagingReceipt"
      }
    },
    {
      "name": "initOapp",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "lzReceiveTypes",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "InitOAppParams"
          }
        }
      ]
    },
    {
      "name": "resetOapp",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinitOapp",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ReinitOAppParams"
          }
        }
      ]
    },
    {
      "name": "resetVault",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "reinitVault",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "ReinitVaultParams"
          }
        }
      ]
    },
    {
      "name": "setBroker",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "allowedBroker",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetBrokerParams"
          }
        }
      ]
    },
    {
      "name": "setToken",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "allowedToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetTokenParams"
          }
        }
      ]
    },
    {
      "name": "setOrderDelivery",
      "accounts": [
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetOrderDeliveryParams"
          }
        }
      ]
    },
    {
      "name": "oappQuote",
      "accounts": [
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "enforcedOptions",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppQuoteParams"
          }
        }
      ],
      "returns": {
        "defined": "MessagingFee"
      }
    },
    {
      "name": "lzReceive",
      "accounts": [
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "user",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "CHECK"
          ]
        },
        {
          "name": "userDepositWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultDepositWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "eventAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "program",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppLzReceiveParams"
          }
        }
      ]
    },
    {
      "name": "lzReceiveTypes",
      "accounts": [
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "OAppLzReceiveParams"
          }
        }
      ],
      "returns": {
        "vec": {
          "defined": "oapp::endpoint_cpi::LzAccount"
        }
      }
    },
    {
      "name": "setRateLimit",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetRateLimitParams"
          }
        }
      ]
    },
    {
      "name": "setDelegate",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetDelegateParams"
          }
        }
      ]
    },
    {
      "name": "transferAdmin",
      "accounts": [
        {
          "name": "admin",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "oappConfig",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "TransferAdminParams"
          }
        }
      ]
    },
    {
      "name": "setPeer",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "peer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetPeerParams"
          }
        }
      ]
    },
    {
      "name": "setEnforcedOptions",
      "accounts": [
        {
          "name": "admin",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "enforcedOptions",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "oappConfig",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "SetEnforcedOptionsParams"
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "enforcedOptions",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "send",
            "type": "bytes"
          },
          {
            "name": "sendAndCall",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "oAppConfig",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "endpointProgram",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "oAppLzReceiveTypesAccounts",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "oappConfig",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "peer",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "address",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "rateLimiter",
            "type": {
              "option": {
                "defined": "RateLimiter"
              }
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "allowedBroker",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "allowedToken",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenDecimals",
            "type": "u8"
          },
          {
            "name": "allowed",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultAuthority",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "docs": [
              "Bump seed for the vault authority PDA"
            ],
            "type": "u8"
          },
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "depositNonce",
            "type": "u64"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "inboundNonce",
            "type": "u64"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "VaultDepositParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "userAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "srcChainId",
            "type": "u128"
          },
          {
            "name": "tokenAmount",
            "type": "u128"
          },
          {
            "name": "srcChainDepositNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "LzMessage",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "msgType",
            "type": "u8"
          },
          {
            "name": "payload",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "InitOAppParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "endpointProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "OAppLzReceiveParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "srcEid",
            "type": "u32"
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "nonce",
            "type": "u64"
          },
          {
            "name": "guid",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "message",
            "type": "bytes"
          },
          {
            "name": "extraData",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "AccountWithdrawSol",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "receiver",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u64"
          },
          {
            "name": "chainId",
            "type": "u64"
          },
          {
            "name": "withdrawNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "VaultWithdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "sender",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "receiver",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          },
          {
            "name": "fee",
            "type": "u128"
          },
          {
            "name": "chainId",
            "type": "u128"
          },
          {
            "name": "withdrawNonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppQuoteParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "to",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "options",
            "type": "bytes"
          },
          {
            "name": "message",
            "type": {
              "option": "bytes"
            }
          },
          {
            "name": "payInLzToken",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "ReinitOAppParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          },
          {
            "name": "endpointProgram",
            "type": {
              "option": "publicKey"
            }
          },
          {
            "name": "usdcHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "usdcMint",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetDelegateParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "delegate",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "SetEnforcedOptionsParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "send",
            "type": "bytes"
          },
          {
            "name": "sendAndCall",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "SetPeerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "peer",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          }
        ]
      }
    },
    {
      "name": "SetRateLimitParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "refillPerSecond",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "capacity",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "enabled",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "TransferAdminParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "DepositParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "accountId",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "userAddress",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "tokenAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppSendParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nativeFee",
            "type": "u64"
          },
          {
            "name": "lzTokenFee",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "InitVaultParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "ReinitVaultParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "dstEid",
            "type": "u32"
          },
          {
            "name": "depositNonce",
            "type": "u64"
          },
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "inboundNonce",
            "type": "u64"
          },
          {
            "name": "solChainId",
            "type": "u128"
          }
        ]
      }
    },
    {
      "name": "SetBrokerParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "brokerHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "SetOrderDeliveryParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "orderDelivery",
            "type": "bool"
          },
          {
            "name": "nonce",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "SetTokenParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mintAccount",
            "type": "publicKey"
          },
          {
            "name": "tokenHash",
            "type": {
              "array": [
                "u8",
                32
              ]
            }
          },
          {
            "name": "allowed",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "RateLimiter",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "capacity",
            "type": "u64"
          },
          {
            "name": "tokens",
            "type": "u64"
          },
          {
            "name": "refillPerSecond",
            "type": "u64"
          },
          {
            "name": "lastRefillTime",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "OAppError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Unauthorized"
          },
          {
            "name": "InvalidSender"
          },
          {
            "name": "InvalidOptions"
          },
          {
            "name": "InvalidEndpointProgram"
          },
          {
            "name": "RateLimitExceeded"
          },
          {
            "name": "WithdrawFailed"
          },
          {
            "name": "InvalidInboundNonce"
          }
        ]
      }
    },
    {
      "name": "MsgType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Deposit"
          },
          {
            "name": "Withdraw"
          },
          {
            "name": "RebalanceBurn"
          },
          {
            "name": "RebalanceMint"
          }
        ]
      }
    }
  ],
  "events": [
    {
      "name": "SetAllowedBroker",
      "fields": [
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "ResetAllowedBroker",
      "fields": [
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        }
      ]
    },
    {
      "name": "SetAllowedToken",
      "fields": [
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "mintAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "ResetAllowedToken",
      "fields": [
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "mintAccount",
          "type": "publicKey",
          "index": false
        }
      ]
    },
    {
      "name": "Deposited",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "Withdrawn",
      "fields": [
        {
          "name": "user",
          "type": "publicKey",
          "index": false
        },
        {
          "name": "amount",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "VaultDeposited",
      "fields": [
        {
          "name": "accountId",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "userAddress",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "srcChainId",
          "type": "u128",
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "srcChainDepositNonce",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "VaultWithdrawn",
      "fields": [
        {
          "name": "accountId",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "sender",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "receiver",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "brokerHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenHash",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "tokenAmount",
          "type": "u64",
          "index": false
        },
        {
          "name": "fee",
          "type": "u128",
          "index": false
        },
        {
          "name": "chainId",
          "type": "u128",
          "index": false
        },
        {
          "name": "withdrawNonce",
          "type": "u64",
          "index": false
        }
      ]
    },
    {
      "name": "OAppSent",
      "fields": [
        {
          "name": "guid",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "dstEid",
          "type": "u32",
          "index": false
        }
      ]
    },
    {
      "name": "OAppReceived",
      "fields": [
        {
          "name": "guid",
          "type": {
            "array": [
              "u8",
              32
            ]
          },
          "index": false
        },
        {
          "name": "srcEid",
          "type": "u32",
          "index": false
        }
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InsufficientFunds",
      "msg": "Deposited funds are insufficient for withdrawal"
    },
    {
      "code": 6001,
      "name": "UserInfoBelongsToAnotherUser",
      "msg": "User info pda belongs to another user"
    },
    {
      "code": 6002,
      "name": "BrokerNotAllowed",
      "msg": "Broker is not allowed"
    },
    {
      "code": 6003,
      "name": "TokenNotAllowed",
      "msg": "Token is not allowed"
    },
    {
      "code": 6004,
      "name": "InvalidAccountId",
      "msg": "AccountId is invalid"
    },
    {
      "code": 6005,
      "name": "InvalidVaultOwner",
      "msg": "Vault owner is not the same as the payer"
    }
  ]
};