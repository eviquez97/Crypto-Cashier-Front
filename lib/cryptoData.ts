// Comprehensive cryptocurrency data organized by blockchain and categories

export interface CryptoCurrency {
  symbol: string
  name: string
  chain: string
  decimals: number
  logo?: string
  category: 'major' | 'stablecoin' | 'defi' | 'meme' | 'gaming' | 'layer2' | 'ai' | 'privacy' | 'other'
}

export const CRYPTOCURRENCIES: CryptoCurrency[] = [
  // MAJOR CRYPTOCURRENCIES
  { symbol: 'BTC', name: 'Bitcoin', chain: 'BTC', decimals: 8, category: 'major' },
  { symbol: 'ETH', name: 'Ethereum', chain: 'ETH', decimals: 18, category: 'major' },
  { symbol: 'BNB', name: 'BNB', chain: 'BEP20', decimals: 18, category: 'major' },
  { symbol: 'ADA', name: 'Cardano', chain: 'ADA', decimals: 6, category: 'major' },
  { symbol: 'SOL', name: 'Solana', chain: 'SOL', decimals: 9, category: 'major' },
  { symbol: 'XRP', name: 'Ripple', chain: 'XRP', decimals: 6, category: 'major' },
  { symbol: 'DOT', name: 'Polkadot', chain: 'DOT', decimals: 10, category: 'major' },
  { symbol: 'DOGE', name: 'Dogecoin', chain: 'DOGE', decimals: 8, category: 'major' },
  { symbol: 'AVAX', name: 'Avalanche', chain: 'AVAX', decimals: 18, category: 'major' },
  { symbol: 'SHIB', name: 'Shiba Inu', chain: 'ETH', decimals: 18, category: 'major' },
  { symbol: 'MATIC', name: 'Polygon', chain: 'MATIC', decimals: 18, category: 'major' },
  { symbol: 'LTC', name: 'Litecoin', chain: 'LTC', decimals: 8, category: 'major' },
  { symbol: 'ATOM', name: 'Cosmos', chain: 'ATOM', decimals: 6, category: 'major' },
  { symbol: 'LINK', name: 'Chainlink', chain: 'ETH', decimals: 18, category: 'major' },
  { symbol: 'UNI', name: 'Uniswap', chain: 'ETH', decimals: 18, category: 'major' },
  { symbol: 'TRX', name: 'TRON', chain: 'TRON', decimals: 6, category: 'major' },

  // STABLECOINS
  { symbol: 'USDT', name: 'Tether', chain: 'ETH', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'TRON', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'ETH', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'TRON', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'BUSD', name: 'Binance USD', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'BUSD', name: 'Binance USD', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'DAI', name: 'Dai Stablecoin', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'TUSD', name: 'TrueUSD', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'FRAX', name: 'Frax', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'LUSD', name: 'Liquity USD', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'SUSD', name: 'Synthetix USD', chain: 'ETH', decimals: 18, category: 'stablecoin' },
  { symbol: 'GUSD', name: 'Gemini Dollar', chain: 'ETH', decimals: 2, category: 'stablecoin' },
  { symbol: 'USDP', name: 'Pax Dollar', chain: 'ETH', decimals: 18, category: 'stablecoin' },

  // ETHEREUM TOKENS
  { symbol: 'WETH', name: 'Wrapped Ethereum', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', chain: 'ETH', decimals: 8, category: 'defi' },
  { symbol: 'AAVE', name: 'Aave', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'COMP', name: 'Compound', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'MKR', name: 'Maker', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'SNX', name: 'Synthetix', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'YFI', name: 'Yearn Finance', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'CRV', name: 'Curve DAO Token', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'SUSHI', name: 'SushiSwap', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: '1INCH', name: '1inch', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'BAL', name: 'Balancer', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'REN', name: 'Ren', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'KNC', name: 'Kyber Network', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'ZRX', name: '0x Protocol', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'BAT', name: 'Basic Attention Token', chain: 'ETH', decimals: 18, category: 'defi' },
  { symbol: 'ENJ', name: 'Enjin Coin', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'MANA', name: 'Decentraland', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'SAND', name: 'The Sandbox', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'AXS', name: 'Axie Infinity', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'ILV', name: 'Illuvium', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'GALA', name: 'Gala', chain: 'ETH', decimals: 8, category: 'gaming' },
  { symbol: 'CHZ', name: 'Chiliz', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'FLOW', name: 'Flow', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'IMX', name: 'Immutable X', chain: 'ETH', decimals: 18, category: 'gaming' },

  // BSC (BEP20) TOKENS
  { symbol: 'CAKE', name: 'PancakeSwap', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'BUSD', name: 'Binance USD', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'BEP20', decimals: 18, category: 'stablecoin' },
  { symbol: 'ETH', name: 'Ethereum', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'BTCB', name: 'Bitcoin BEP2', chain: 'BEP20', decimals: 8, category: 'defi' },
  { symbol: 'ADA', name: 'Cardano', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'DOT', name: 'Polkadot', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'LINK', name: 'Chainlink', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'UNI', name: 'Uniswap', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'LTC', name: 'Litecoin', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'XRP', name: 'Ripple', chain: 'BEP20', decimals: 18, category: 'defi' },
  { symbol: 'DOGE', name: 'Dogecoin', chain: 'BEP20', decimals: 8, category: 'defi' },
  { symbol: 'SHIB', name: 'Shiba Inu', chain: 'BEP20', decimals: 18, category: 'meme' },
  { symbol: 'FLOKI', name: 'Floki', chain: 'BEP20', decimals: 9, category: 'meme' },
  { symbol: 'BABYDOGE', name: 'Baby Doge Coin', chain: 'BEP20', decimals: 9, category: 'meme' },
  { symbol: 'SAFEMOON', name: 'SafeMoon', chain: 'BEP20', decimals: 9, category: 'meme' },

  // TRON (TRC20) TOKENS
  { symbol: 'TRX', name: 'TRON', chain: 'TRON', decimals: 6, category: 'major' },
  { symbol: 'USDT', name: 'Tether', chain: 'TRON', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'TRON', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDD', name: 'Decentralized USD', chain: 'TRON', decimals: 18, category: 'stablecoin' },
  { symbol: 'JST', name: 'JUST', chain: 'TRON', decimals: 18, category: 'defi' },
  { symbol: 'SUN', name: 'SUN', chain: 'TRON', decimals: 18, category: 'defi' },
  { symbol: 'WIN', name: 'WINkLink', chain: 'TRON', decimals: 6, category: 'gaming' },
  { symbol: 'BTT', name: 'BitTorrent', chain: 'TRON', decimals: 18, category: 'other' },
  { symbol: 'NFT', name: 'APENFT', chain: 'TRON', decimals: 6, category: 'other' },

  // POLYGON TOKENS
  { symbol: 'MATIC', name: 'Polygon', chain: 'MATIC', decimals: 18, category: 'layer2' },
  { symbol: 'WETH', name: 'Wrapped Ethereum', chain: 'MATIC', decimals: 18, category: 'defi' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'MATIC', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'MATIC', decimals: 6, category: 'stablecoin' },
  { symbol: 'DAI', name: 'Dai Stablecoin', chain: 'MATIC', decimals: 18, category: 'stablecoin' },
  { symbol: 'QUICK', name: 'Quickswap', chain: 'MATIC', decimals: 18, category: 'defi' },
  { symbol: 'AAVE', name: 'Aave', chain: 'MATIC', decimals: 18, category: 'defi' },
  { symbol: 'CRV', name: 'Curve DAO Token', chain: 'MATIC', decimals: 18, category: 'defi' },

  // AVALANCHE TOKENS
  { symbol: 'AVAX', name: 'Avalanche', chain: 'AVAX', decimals: 18, category: 'major' },
  { symbol: 'WAVAX', name: 'Wrapped AVAX', chain: 'AVAX', decimals: 18, category: 'defi' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'AVAX', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'AVAX', decimals: 6, category: 'stablecoin' },
  { symbol: 'JOE', name: 'Trader Joe', chain: 'AVAX', decimals: 18, category: 'defi' },
  { symbol: 'PNG', name: 'Pangolin', chain: 'AVAX', decimals: 18, category: 'defi' },

  // SOLANA TOKENS
  { symbol: 'SOL', name: 'Solana', chain: 'SOL', decimals: 9, category: 'major' },
  { symbol: 'USDC', name: 'USD Coin', chain: 'SOL', decimals: 6, category: 'stablecoin' },
  { symbol: 'USDT', name: 'Tether', chain: 'SOL', decimals: 6, category: 'stablecoin' },
  { symbol: 'RAY', name: 'Raydium', chain: 'SOL', decimals: 6, category: 'defi' },
  { symbol: 'SRM', name: 'Serum', chain: 'SOL', decimals: 6, category: 'defi' },
  { symbol: 'MNGO', name: 'Mango', chain: 'SOL', decimals: 6, category: 'defi' },
  { symbol: 'ORCA', name: 'Orca', chain: 'SOL', decimals: 6, category: 'defi' },
  { symbol: 'STEP', name: 'Step Finance', chain: 'SOL', decimals: 9, category: 'defi' },

  // CARDANO TOKENS
  { symbol: 'ADA', name: 'Cardano', chain: 'ADA', decimals: 6, category: 'major' },
  { symbol: 'AGI', name: 'SingularityNET', chain: 'ADA', decimals: 8, category: 'ai' },
  { symbol: 'DANA', name: 'Ardana', chain: 'ADA', decimals: 6, category: 'defi' },
  { symbol: 'MIN', name: 'MinSwap', chain: 'ADA', decimals: 9, category: 'defi' },

  // AI TOKENS
  { symbol: 'FET', name: 'Fetch.ai', chain: 'ETH', decimals: 18, category: 'ai' },
  { symbol: 'AGI', name: 'SingularityNET', chain: 'ETH', decimals: 8, category: 'ai' },
  { symbol: 'OCEAN', name: 'Ocean Protocol', chain: 'ETH', decimals: 18, category: 'ai' },
  { symbol: 'GRT', name: 'The Graph', chain: 'ETH', decimals: 18, category: 'ai' },
  { symbol: 'RLC', name: 'iExec RLC', chain: 'ETH', decimals: 9, category: 'ai' },
  { symbol: 'NMR', name: 'Numeraire', chain: 'ETH', decimals: 18, category: 'ai' },

  // PRIVACY TOKENS
  { symbol: 'XMR', name: 'Monero', chain: 'XMR', decimals: 12, category: 'privacy' },
  { symbol: 'ZEC', name: 'Zcash', chain: 'ZEC', decimals: 8, category: 'privacy' },
  { symbol: 'DASH', name: 'Dash', chain: 'DASH', decimals: 8, category: 'privacy' },
  { symbol: 'SCRT', name: 'Secret', chain: 'SCRT', decimals: 6, category: 'privacy' },
  { symbol: 'ZEN', name: 'Horizen', chain: 'ZEN', decimals: 8, category: 'privacy' },

  // LAYER 2 TOKENS
  { symbol: 'MATIC', name: 'Polygon', chain: 'MATIC', decimals: 18, category: 'layer2' },
  { symbol: 'OP', name: 'Optimism', chain: 'OP', decimals: 18, category: 'layer2' },
  { symbol: 'ARB', name: 'Arbitrum', chain: 'ARB', decimals: 18, category: 'layer2' },
  { symbol: 'LRC', name: 'Loopring', chain: 'ETH', decimals: 18, category: 'layer2' },
  { symbol: 'IMX', name: 'Immutable X', chain: 'ETH', decimals: 18, category: 'layer2' },

  // MEME COINS
  { symbol: 'DOGE', name: 'Dogecoin', chain: 'DOGE', decimals: 8, category: 'meme' },
  { symbol: 'SHIB', name: 'Shiba Inu', chain: 'ETH', decimals: 18, category: 'meme' },
  { symbol: 'FLOKI', name: 'Floki', chain: 'ETH', decimals: 9, category: 'meme' },
  { symbol: 'BABYDOGE', name: 'Baby Doge Coin', chain: 'ETH', decimals: 9, category: 'meme' },
  { symbol: 'SAFEMOON', name: 'SafeMoon', chain: 'ETH', decimals: 9, category: 'meme' },
  { symbol: 'PEPE', name: 'Pepe', chain: 'ETH', decimals: 18, category: 'meme' },
  { symbol: 'WOJAK', name: 'WOJAK', chain: 'ETH', decimals: 18, category: 'meme' },
  { symbol: 'BONK', name: 'Bonk', chain: 'SOL', decimals: 5, category: 'meme' },

  // GAMING TOKENS
  { symbol: 'ENJ', name: 'Enjin Coin', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'MANA', name: 'Decentraland', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'SAND', name: 'The Sandbox', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'AXS', name: 'Axie Infinity', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'ILV', name: 'Illuvium', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'GALA', name: 'Gala', chain: 'ETH', decimals: 8, category: 'gaming' },
  { symbol: 'CHZ', name: 'Chiliz', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'FLOW', name: 'Flow', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'IMX', name: 'Immutable X', chain: 'ETH', decimals: 18, category: 'gaming' },
  { symbol: 'WAXP', name: 'WAX', chain: 'WAX', decimals: 8, category: 'gaming' },
  { symbol: 'TLM', name: 'Alien Worlds', chain: 'BSC', decimals: 4, category: 'gaming' },
  { symbol: 'SLP', name: 'Smooth Love Potion', chain: 'ETH', decimals: 0, category: 'gaming' },

  // ADDITIONAL POPULAR TOKENS
  { symbol: 'NEAR', name: 'NEAR Protocol', chain: 'NEAR', decimals: 24, category: 'other' },
  { symbol: 'FTM', name: 'Fantom', chain: 'FTM', decimals: 18, category: 'other' },
  { symbol: 'ALGO', name: 'Algorand', chain: 'ALGO', decimals: 6, category: 'other' },
  { symbol: 'VET', name: 'VeChain', chain: 'VET', decimals: 18, category: 'other' },
  { symbol: 'ICP', name: 'Internet Computer', chain: 'ICP', decimals: 8, category: 'other' },
  { symbol: 'FIL', name: 'Filecoin', chain: 'FIL', decimals: 18, category: 'other' },
  { symbol: 'THETA', name: 'Theta Network', chain: 'THETA', decimals: 18, category: 'other' },
  { symbol: 'EOS', name: 'EOS', chain: 'EOS', decimals: 4, category: 'other' },
  { symbol: 'XTZ', name: 'Tezos', chain: 'XTZ', decimals: 6, category: 'other' },
  { symbol: 'HBAR', name: 'Hedera', chain: 'HBAR', decimals: 8, category: 'other' },
  { symbol: 'EGLD', name: 'Elrond', chain: 'EGLD', decimals: 18, category: 'other' },
  { symbol: 'KLAY', name: 'Klaytn', chain: 'KLAY', decimals: 18, category: 'other' },
  { symbol: 'ZIL', name: 'Zilliqa', chain: 'ZIL', decimals: 12, category: 'other' },
  { symbol: 'IOTA', name: 'IOTA', chain: 'IOTA', decimals: 6, category: 'other' },
  { symbol: 'NEO', name: 'NEO', chain: 'NEO', decimals: 8, category: 'other' },
  { symbol: 'WAVES', name: 'Waves', chain: 'WAVES', decimals: 8, category: 'other' },
  { symbol: 'QTUM', name: 'Qtum', chain: 'QTUM', decimals: 8, category: 'other' },
  { symbol: 'ONT', name: 'Ontology', chain: 'ONT', decimals: 9, category: 'other' },
  { symbol: 'ICX', name: 'ICON', chain: 'ICX', decimals: 18, category: 'other' },
  { symbol: 'ZEN', name: 'Horizen', chain: 'ZEN', decimals: 8, category: 'other' },
]

export const CHAINS = [
  { value: 'BTC', label: 'Bitcoin (BTC)', icon: '₿' },
  { value: 'ETH', label: 'Ethereum (ETH)', icon: 'Ξ' },
  { value: 'BEP20', label: 'Binance Smart Chain (BSC)', icon: '🔶' },
  { value: 'TRON', label: 'TRON (TRC20)', icon: '🔴' },
  { value: 'MATIC', label: 'Polygon (MATIC)', icon: '🔷' },
  { value: 'AVAX', label: 'Avalanche (AVAX)', icon: '🔺' },
  { value: 'SOL', label: 'Solana (SOL)', icon: '☀️' },
  { value: 'ADA', label: 'Cardano (ADA)', icon: '🔵' },
  { value: 'DOT', label: 'Polkadot (DOT)', icon: '⚫' },
  { value: 'LTC', label: 'Litecoin (LTC)', icon: 'Ł' },
  { value: 'XRP', label: 'Ripple (XRP)', icon: '💧' },
  { value: 'DOGE', label: 'Dogecoin (DOGE)', icon: '🐕' },
  { value: 'SHIB', label: 'Shiba Inu (SHIB)', icon: '🐕‍🦺' },
  { value: 'XMR', label: 'Monero (XMR)', icon: '🔒' },
  { value: 'DASH', label: 'Dash (DASH)', icon: '💎' },
  { value: 'ZEC', label: 'Zcash (ZEC)', icon: '⚡' },
  { value: 'NEAR', label: 'NEAR Protocol (NEAR)', icon: '🌐' },
  { value: 'FTM', label: 'Fantom (FTM)', icon: '👻' },
  { value: 'ALGO', label: 'Algorand (ALGO)', icon: '🧮' },
  { value: 'VET', label: 'VeChain (VET)', icon: '🔗' },
  { value: 'ICP', label: 'Internet Computer (ICP)', icon: '🌍' },
  { value: 'FIL', label: 'Filecoin (FIL)', icon: '📁' },
  { value: 'THETA', label: 'Theta Network (THETA)', icon: '🎬' },
  { value: 'EOS', label: 'EOS (EOS)', icon: '🔸' },
  { value: 'XTZ', label: 'Tezos (XTZ)', icon: '🧿' },
  { value: 'HBAR', label: 'Hedera (HBAR)', icon: '🌿' },
  { value: 'EGLD', label: 'Elrond (EGLD)', icon: '⭐' },
  { value: 'KLAY', label: 'Klaytn (KLAY)', icon: '🎯' },
  { value: 'ZIL', label: 'Zilliqa (ZIL)', icon: '⚡' },
  { value: 'IOTA', label: 'IOTA (IOTA)', icon: '🔗' },
  { value: 'NEO', label: 'NEO (NEO)', icon: '🔵' },
  { value: 'WAVES', label: 'Waves (WAVES)', icon: '🌊' },
  { value: 'QTUM', label: 'Qtum (QTUM)', icon: '💎' },
  { value: 'ONT', label: 'Ontology (ONT)', icon: '🔗' },
  { value: 'ICX', label: 'ICON (ICX)', icon: '🔷' },
]

export const getCurrenciesByChain = (chain: string) => {
  return CRYPTOCURRENCIES.filter(crypto => crypto.chain === chain)
}

export const getPopularCurrencies = () => {
  return CRYPTOCURRENCIES.filter(crypto => crypto.category === 'major' || crypto.category === 'stablecoin')
}

export const getCurrenciesByCategory = (category: string) => {
  return CRYPTOCURRENCIES.filter(crypto => crypto.category === category)
}
