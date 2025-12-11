// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AssetToken.sol";

contract AssetFactory {
    // 1. Keep track of all deployed assets
    AssetToken[] public deployedAssets;

    event AssetCreated(address assetAddress, string name, string symbol, address owner);

    // 2. The function your UI will call
    function createAsset(
        string memory name,
        string memory symbol,
        uint256 assetPrice, // Total value (e.g. 100 ETH)
        uint256 sharePrice,  // Price per share (e.g. 0.01 ETH)
        string memory metadataURI
    ) external {
        // Create the new contract
        AssetToken newAsset = new AssetToken(
            name, 
            symbol, 
            assetPrice, 
            sharePrice, 
            metadataURI,
            msg.sender // The creator becomes the owner (Admin)
        );

        // Add to our list
        deployedAssets.push(newAsset);

        emit AssetCreated(address(newAsset), name, symbol, msg.sender);
    }

    // 3. Helper to get all assets for the Market Page
    function getDeployedAssets() external view returns (AssetToken[] memory) {
        return deployedAssets;
    }
}