# Asset Tokenization Platform

A decentralized Web3 platform that enables users to tokenize their real-world assets and sell fractional ownership through shares. Share prices dynamically adjust based on market demand using an automated market maker (AMM) bonding curve mechanism.

## Overview

This platform bridges traditional asset ownership with decentralized finance (DeFi) by allowing asset owners to list their assets and investors to purchase fractional shares. The system employs a dynamic pricing mechanism where share prices increase or decrease based on buying and selling activity.

## Key Features

### For Asset Owners
- **Asset Listing**: List real-world assets (real estate, art, collectibles, vehicles, etc.) on the blockchain
- **Fractional Ownership**: Divide asset ownership into tradeable shares
- **Liquidity**: Convert illiquid assets into liquid, tradeable tokens
- **Transparency**: All transactions and ownership records stored on-chain

### For Investors
- **Fractional Investment**: Purchase shares of high-value assets with minimal capital
- **Dynamic Pricing**: Share prices adjust automatically based on supply and demand
- **Portfolio Diversification**: Invest in multiple assets across different categories
- **Instant Trading**: Buy and sell shares 24/7 without intermediaries

### Core Mechanisms
- **Bonding Curve Pricing**: Automated price discovery using mathematical curves
- **Smart Contract Automation**: Trustless execution of all transactions
- **Transparent Price History**: Real-time tracking of share price movements
- **Decentralized Ownership**: No central authority controls asset shares

## How It Works

### 1. Asset Listing
Asset owners connect their Web3 wallet and list their assets by providing:
- Asset description and details
- Initial valuation
- Total number of shares
- Supporting documentation (images, certificates, appraisals)
- Verification requirements

### 2. Share Creation
The smart contract:
- Mints ERC-20 tokens representing fractional ownership
- Establishes the initial bonding curve parameters
- Sets the starting price per share
- Locks asset details on-chain

### 3. Trading Mechanism
When users buy shares:
- Price increases along the bonding curve
- Tokens are minted and transferred to the buyer
- Payment is processed through the smart contract

When users sell shares:
- Price decreases along the bonding curve
- Tokens are burned
- Payment is released to the seller

### 4. Price Discovery
The bonding curve formula (example):
```
Price = BasePrice × (1 + k × SharesSold)^n
```
Where:
- `BasePrice`: Initial share price
- `k`: Curve steepness factor
- `SharesSold`: Current number of sold shares
- `n`: Curve exponent

## Technology Stack

### Blockchain
- **Network**: Ethereum / Polygon 
- **Smart Contracts**: Solidity
- **Token Standard**: ERC-20 for shares, ERC-721 for asset NFTs

### Frontend
- **Framework**: React.js / Next.js
- **Web3 Integration**: ethers.js / web3.js
- **Wallet Connection**: WalletConnect, MetaMask
- **UI Library**: TailwindCSS / Material-UI

### Backend (if applicable)
- **API**: Node.js / Express
- **Database**: IPFS for metadata, MongoDB

### Development Tools
- **Smart Contract Development**: Hardhat / Foundry
- **Testing**: Chai, Mocha
- **Deployment**: Hardhat Deploy

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MetaMask or compatible Web3 wallet
- Network tokens for gas fees

### Installation

```bash
# Clone the repository
git clone https://github.com/Ayushkaranth/assetflow.git
cd assetflow

# Install dependencies
npm install

# Run tests
npm run test

# Start frontend development server
npm run dev
```

### Environment Variables
```
PRIVATE_KEY=your_wallet_private_key
RPC_URL=your_rpc_endpoint
ETHERSCAN_API_KEY=your_etherscan_api_key
NEXT_PUBLIC_CONTRACT_ADDRESS=deployed_contract_address
```

## Smart Contract Architecture

### Main Contracts

#### AssetFactory.sol
- Creates new asset listings
- Manages asset registry
- Handles asset verification

#### AssetShare.sol
- ERC-20 implementation for shares
- Bonding curve pricing logic
- Buy/sell functions
- Fee distribution

#### AssetNFT.sol
- ERC-721 representing the underlying asset
- Metadata storage
- Ownership verification

## Usage Examples

### Listing an Asset
```javascript
const asset = await assetFactory.listAsset(
  "Luxury Apartment Downtown",
  ethers.utils.parseEther("500000"), // $500k valuation
  10000, // 10,000 shares
  "ipfs://metadata-hash"
);
```

### Buying Shares
```javascript
const price = await assetShare.getBuyPrice(100); // Get price for 100 shares
await assetShare.buyShares(assetId, 100, { value: price });
```

### Selling Shares
```javascript
await assetShare.sellShares(assetId, 50); // Sell 50 shares
```

## Security Considerations

- ✅ Smart contracts audited by [Audit Firm Name]
- ✅ Multi-signature wallet for admin functions
- ✅ Rate limiting on critical operations
- ✅ Reentrancy protection
- ✅ Access control mechanisms
- ⚠️ Users should conduct their own due diligence on listed assets

## Roadmap

### Phase 1 (Current)
- [x] Core smart contract development
- [x] Basic UI/UX
- [x] Testnet deployment

### Phase 2
- [ ] Smart contract audit
- [ ] Mainnet deployment
- [ ] Asset verification system
- [ ] Mobile app

### Phase 3
- [ ] Multi-chain support
- [ ] Advanced analytics dashboard
- [ ] Secondary marketplace
- [ ] Governance token

### Phase 4
- [ ] Integration with real-world asset oracles
- [ ] Insurance mechanisms
- [ ] Staking rewards
- [ ] DAO governance

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Testing

```bash
# Run all tests
npm run test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
