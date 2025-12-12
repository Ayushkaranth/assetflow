// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./AssetToken.sol";

contract AssetFactory {
    AssetToken[] public deployedAssets;
    event AssetCreated(address assetAddress, string name, string symbol, address owner);

    function createAsset(
        string memory name,
        string memory symbol,
        uint256 basePrice, // Starting price per share
        string memory metadataURI
    ) external {
        AssetToken newAsset = new AssetToken(
            name, 
            symbol, 
            basePrice, 
            metadataURI,
            msg.sender 
        );

        deployedAssets.push(newAsset);
        emit AssetCreated(address(newAsset), name, symbol, msg.sender);
    }

    function getDeployedAssets() external view returns (AssetToken[] memory) {
        return deployedAssets;
    }
}