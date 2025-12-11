import { parseAbi } from 'viem';

// 1. Your Existing Asset (The Penthouse) - Keep this for the demo page
export const ASSET_TOKEN_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
export const ASSET_TOKEN_ABI = parseAbi([
  "function buyShares(uint256 numberOfShares) external payable",
  "function sharePrice() view returns (uint256)",
  "function assetPrice() view returns (uint256)",
  "function saleActive() view returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function owner() view returns (address)", 
  "function withdrawFunds() external",
  "function toggleSale() external",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function metadataURI() view returns (string)",
  "function depositRent() external payable",
"function claimRent() external",
"function getClaimableRent(address user) view returns (uint256)"
]);

// 2. NEW: The Factory Contract (Sepolia)
export const FACTORY_ADDRESS = "0x58B27EE6cFADCBeBBb9575c9B1136162840B42A0";

export const FACTORY_ABI = parseAbi([
  "function createAsset(string name, string symbol, uint256 assetPrice, uint256 sharePrice, string metadataURI) external",
  "event AssetCreated(address assetAddress, string name, string symbol, address owner)",
  "function getDeployedAssets() external view returns (address[])"
]);