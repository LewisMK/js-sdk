export const customChains = {
  mainnet: [
    {
      dexs: ["woofi"],
      network_infos: {
        name: "Mantle",
        public_rpc_url: "https://rpc.ankr.com/mantle",
        chain_id: 5000,
        currency_symbol: "MNT",
        bridge_enable: false,
        mainnet: true,
        explorer_base_url: "https://mantlescan.xyz/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router: null,
        woofi_dex_depositor: "0x4E21a65A9F4672EF2cdfb7FA6B0f1e39d6e4E50e",
        bridgeless: true,
        shortName: "mantle",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "MNT",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8",
          symbol: "WMNT",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0xdEAddEaDdeadDEadDEADDEAddEADDEAddead1111",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x201EBa5CC46D216Ce6DC03F6a759e8E766e956aE",
          symbol: "USDT",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x09Bc4E0D864854c6aFB6eB9A9cdF58aC190D0dF9",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          display_name: "USDC.e",
          precision: 2,
        },
      ],
      name: "mantle",
    },
    {
      dexs: ["woofi"],
      network_infos: {
        name: "Base",
        public_rpc_url: "https://mainnet.base.org",
        chain_id: 8453,
        currency_symbol: "ETH",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://basescan.org/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: null,
        bridgeless: true,
        shortName: "base",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x4200000000000000000000000000000000000006",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
          symbol: "USDbC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          display_name: "USDC",
          precision: 2,
        },
      ],
      name: "base",
    },
    {
      dexs: [],
      network_infos: {
        name: "Ethereum",
        public_rpc_url: "https://rpc.ankr.com/eth",
        chain_id: 1,
        currency_symbol: "ETH",
        bridge_enable: false,
        mainnet: true,
        explorer_base_url: "https://etherscan.io/",
        est_txn_mins: 4,
        woofi_dex_cross_chain_router: null,
        woofi_dex_depositor: null,
        bridgeless: true,
        shortName: "ethereum",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: false,
          precision: 4,
        },
        {
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: false,
          display_name: "USDC",
          precision: 2,
        },
      ],
      name: "ethereum",
    },
    {
      dexs: ["uni_swap", "velodrome", "woofi"],
      network_infos: {
        name: "Optimism",
        public_rpc_url: "https://mainnet.optimism.io",
        chain_id: 10,
        currency_symbol: "ETH",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://optimistic.etherscan.io/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: "0x4E21a65A9F4672EF2cdfb7FA6B0f1e39d6e4E50e",
        bridgeless: true,
        shortName: "optimism",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x4200000000000000000000000000000000000006",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
          symbol: "WBTC",
          decimals: 8,
          woofi_dex_precision: 5,
          swap_enable: true,
          precision: 5,
        },
        {
          address: "0x4200000000000000000000000000000000000042",
          symbol: "OP",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58",
          symbol: "USDT",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
          symbol: "USDC.e",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          display_name: "USDC",
          precision: 2,
        },
      ],
      name: "optimism",
    },
    {
      dexs: ["uni_swap", "sushi_swap", "curve", "woofi"],
      network_infos: {
        name: "Arbitrum",
        public_rpc_url: "https://arb1.arbitrum.io/rpc",
        chain_id: 42161,
        currency_symbol: "ETH",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://arbiscan.io/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: "0x4E21a65A9F4672EF2cdfb7FA6B0f1e39d6e4E50e",
        bridgeless: true,
        shortName: "arbitrum",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
          symbol: "WBTC",
          decimals: 8,
          woofi_dex_precision: 5,
          swap_enable: true,
          precision: 5,
        },
        {
          address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
          symbol: "ARB",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
          symbol: "USDT",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          display_name: "USDC",
          precision: 2,
        },
        {
          address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
          symbol: "USDC.e",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
      ],
      name: "arbitrum",
    },
    {
      dexs: ["uni_swap", "quick_swap", "sushi_swap", "woofi"],
      network_infos: {
        name: "Polygon",
        public_rpc_url: "https://polygon-rpc.com",
        chain_id: 137,
        currency_symbol: "MATIC",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://polygonscan.com/",
        est_txn_mins: 20,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: "0x4E21a65A9F4672EF2cdfb7FA6B0f1e39d6e4E50e",
        bridgeless: true,
        shortName: "polygon",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "MATIC",
          decimals: 18,
          woofi_dex_precision: 1,
          swap_enable: true,
          precision: 1,
        },
        {
          address: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
          symbol: "WMATIC",
          decimals: 18,
          woofi_dex_precision: 1,
          swap_enable: true,
          precision: 1,
        },
        {
          address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
          symbol: "WBTC",
          decimals: 8,
          woofi_dex_precision: 5,
          swap_enable: true,
          precision: 5,
        },
        {
          address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
          symbol: "USDT",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          symbol: "USDC.e",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          display_name: "USDC",
          precision: 2,
        },
      ],
      name: "polygon",
    },
    {
      dexs: ["pancake_swap", "mdex", "bi_swap", "woofi"],
      network_infos: {
        name: "BNB Chain",
        public_rpc_url: "https://bsc-dataseed.binance.org",
        chain_id: 56,
        currency_symbol: "BNB",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://bscscan.com/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: null,
        bridgeless: false,
        shortName: "bsc",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "BNB",
          decimals: 18,
          woofi_dex_precision: 3,
          swap_enable: true,
          precision: 3,
        },
        {
          address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
          symbol: "WBNB",
          decimals: 18,
          woofi_dex_precision: 3,
          swap_enable: true,
          precision: 3,
        },
        {
          address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
          symbol: "BTCB",
          decimals: 18,
          woofi_dex_precision: 5,
          swap_enable: true,
          precision: 5,
        },
        {
          address: "0x55d398326f99059fF775485246999027B3197955",
          symbol: "USDT",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
          symbol: "USDC",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: false,
          precision: 2,
        },
      ],
      name: "bsc",
    },
    {
      dexs: ["trader_joe", "pangolin", "sushi_swap", "curve", "woofi"],
      network_infos: {
        name: "Avalanche",
        public_rpc_url: "https://api.avax.network/ext/bc/C/rpc",
        chain_id: 43114,
        currency_symbol: "AVAX",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://snowtrace.io/",
        est_txn_mins: 3,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: null,
        bridgeless: false,
        shortName: "avax",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "AVAX",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
          symbol: "WAVAX",
          decimals: 18,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
          symbol: "WETH.e",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x152b9d0FdC40C096757F570A51E494bd4b943E50",
          symbol: "BTC.b",
          decimals: 8,
          woofi_dex_precision: 5,
          swap_enable: true,
          precision: 5,
        },
        {
          address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
          symbol: "USDT",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
        {
          address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
      ],
      name: "avax",
    },
    {
      dexs: ["woofi"],
      network_infos: {
        name: "Linea",
        public_rpc_url: "https://rpc.linea.build",
        chain_id: 59144,
        currency_symbol: "ETH",
        bridge_enable: true,
        mainnet: true,
        explorer_base_url: "https://lineascan.build/",
        est_txn_mins: 2,
        woofi_dex_cross_chain_router:
          "0xac8951A442fe70342f9597044B7b7657D5ad55ec",
        woofi_dex_depositor: null,
        bridgeless: false,
        shortName: "linea",
      },
      token_infos: [
        {
          address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
          symbol: "ETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f",
          symbol: "WETH",
          decimals: 18,
          woofi_dex_precision: 4,
          swap_enable: true,
          precision: 4,
        },
        {
          address: "0x176211869cA2b568f2A7D4EE941E073a821EE1ff",
          symbol: "USDC",
          decimals: 6,
          woofi_dex_precision: 2,
          swap_enable: true,
          precision: 2,
        },
      ],
      name: "linea",
    },
  ],
  testnet: [
    {
      network_infos: {
        name: "Arbitrum Sepolia",
        shortName: "Arbitrum Sepolia",
        public_rpc_url:
          "https://arbitrum-sepolia.blockpi.network/v1/rpc/public",
        chain_id: 421614,
        currency_symbol: "ETH",
        bridge_enable: true,
        mainnet: false,
        explorer_base_url: "https://sepolia.arbiscan.io",
        est_txn_mins: null,
      },
      token_infos: [
        {
          symbol: "USDC",
          address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
          decimals: 6,
          swap_enable: true,
        },
      ],
    },
  ],
};