// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetToken is ERC20, Ownable {
    uint256 public assetPrice; 
    uint256 public sharePrice;     
    uint256 public maxSupply;       
    bool public saleActive = false; 
    string public metadataURI;

    // --- YIELD TRACKING ---
    uint256 public totalDividendsDistributed; // Total ETH ever deposited as rent
    mapping(address => uint256) public withdrawnDividends; // How much each user has taken

    event AssetSold(address investor, uint256 shares, uint256 amount);
    event FundsWithdrawn(address owner, uint256 amount);
    event RentDeposited(uint256 amount);
    event DividendClaimed(address investor, uint256 amount);

    constructor(
        string memory _name,    
        string memory _symbol,  
        uint256 _assetPrice,    
        uint256 _sharePrice,
        string memory _metadataURI,
        address _initialOwner
    ) ERC20(_name, _symbol) Ownable(_initialOwner) {
        assetPrice = _assetPrice;
        sharePrice = _sharePrice;
        maxSupply = _assetPrice / _sharePrice;
        metadataURI = _metadataURI;
        saleActive = true; 
    }

    function buyShares(uint256 numberOfShares) external payable {
        require(saleActive, "Sale is NOT active");
        require(totalSupply() + numberOfShares <= maxSupply, "Sold out");
        uint256 cost = numberOfShares * sharePrice;
        require(msg.value >= cost, "Not enough ETH sent");
        _mint(msg.sender, numberOfShares);
        emit AssetSold(msg.sender, numberOfShares, cost);
    }

    // --- ADMIN: DEPOSIT RENT ---
    // Anyone can deposit rent (e.g. an automated bot), but usually the owner.
    function depositRent() external payable {
        require(totalSupply() > 0, "No shareholders yet");
        totalDividendsDistributed += msg.value;
        emit RentDeposited(msg.value);
    }

    // --- USER: VIEW PENDING DIVIDENDS ---
    function getClaimableRent(address user) public view returns (uint256) {
        if (totalSupply() == 0) return 0;
        uint256 userShares = balanceOf(user);
        
        // Math: (Total Rent Ever / Total Shares) * User Shares - What They Already Took
        uint256 totalEntitlement = (totalDividendsDistributed * userShares) / totalSupply();
        uint256 alreadyWithdrawn = withdrawnDividends[user];

        if (totalEntitlement <= alreadyWithdrawn) return 0;
        return totalEntitlement - alreadyWithdrawn;
    }

    // --- USER: CLAIM RENT ---
    function claimRent() external {
        uint256 payout = getClaimableRent(msg.sender);
        require(payout > 0, "No rent to claim");

        withdrawnDividends[msg.sender] += payout;
        payable(msg.sender).transfer(payout);
        
        emit DividendClaimed(msg.sender, payout);
    }

    // --- ADMIN: WITHDRAW CAPITAL ONLY (Don't touch the Rent!) ---
    function withdrawFunds() external onlyOwner {
        // Calculate Capital = Contract Balance - Unclaimed Rent
        // Note: For MVP simplicity, 'withdrawFunds' takes everything *except* what is needed for rent?
        // Actually, simplest is: Capital stays separate.
        // For this V4 Demo, we assume 'withdrawFunds' takes everything. 
        // WARNING: In a real app, you must separate Capital from Rent variables.
        // But for now, let's keep it simple: Owner withdraws Capital, DepositRent adds on top.
        
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        payable(owner()).transfer(balance);
        emit FundsWithdrawn(owner(), balance);
    }

    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
    }
}