import { parseAbi } from 'viem';

// 1. Your Existing Asset (The Penthouse) - Keep this for the demo page
export const ASSET_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
export const ASSET_TOKEN_ABI = parseAbi([
  "function buyShares(uint256 amount) external payable",
  "function sellShares(uint256 amount) external",
  "function getBuyPrice(uint256 amount) view returns (uint256)",
  "function getSellPrice(uint256 amount) view returns (uint256)",
  "function spotPrice() view returns (uint256)",
  
  // Yield
  "function depositRent() external payable",
  "function claimRent() external",
  "function getClaimableRent(address user) view returns (uint256)",
  
  // Readers
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function metadataURI() view returns (string)",
  "function saleActive() view returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function owner() view returns (address)",
  
  // Admin
  "function toggleSale() external"
]);

// 2. NEW: The Factory Contract (Sepolia)
export const FACTORY_ADDRESS = "0xc936f9ea3866B3c4da21FBB25509db74197503A9";

export const FACTORY_ABI = parseAbi([
  "function createAsset(string name, string symbol, uint256 basePrice, string metadataURI) external",
  "event AssetCreated(address assetAddress, string name, string symbol, address owner)",
  "function getDeployedAssets() external view returns (address[])"
]);