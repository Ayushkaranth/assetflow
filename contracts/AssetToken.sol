// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AssetToken is ERC20, Ownable {
    string public metadataURI;
    
    // --- BONDING CURVE CONFIG ---
    uint256 public basePrice;  // Starting price (e.g. 0.001 ETH)
    uint256 public slope;      // How fast price rises (e.g. 0.00001 ETH)
    bool public saleActive = true;

    // --- YIELD TRACKING ---
    uint256 public totalDividendsDistributed;
    mapping(address => uint256) public withdrawnDividends;

    // Events
    event AssetBought(address indexed investor, uint256 shares, uint256 cost);
    event AssetSold(address indexed investor, uint256 shares, uint256 refund);
    event RentDeposited(uint256 amount);
    event DividendClaimed(address indexed investor, uint256 amount);

    constructor(
        string memory _name,    
        string memory _symbol,  
        uint256 _basePrice,    
        string memory _metadataURI,
        address _initialOwner
    ) ERC20(_name, _symbol) Ownable(_initialOwner) {
        basePrice = _basePrice;
        // We set a gentle slope: For every 100 shares bought, price goes up by 1% of base
        slope = _basePrice / 1000; 
        metadataURI = _metadataURI;
    }

    // --- PRICE CALCULATOR (The Math) ---
    // Formula: Cost = Integral of (base + slope*x)
    
    function getBuyPrice(uint256 amount) public view returns (uint256) {
        uint256 currentSupply = totalSupply();
        // Cost = amount * base + slope * (amount * currentSupply + (amount^2 + amount)/2)
        // Simplified Continuous: amount * base + (slope * ((S+A)^2 - S^2))/2
        uint256 cost = (amount * basePrice) + (slope * ((currentSupply + amount)**2 - currentSupply**2)) / 2;
        return cost;
    }

    function getSellPrice(uint256 amount) public view returns (uint256) {
        if (totalSupply() == 0) return 0;
        uint256 currentSupply = totalSupply();
        // Refund is calculating the area under the curve we are removing
        uint256 refund = (amount * basePrice) + (slope * (currentSupply**2 - (currentSupply - amount)**2)) / 2;
        return refund;
    }

    function spotPrice() public view returns (uint256) {
        return basePrice + (slope * totalSupply());
    }

    // --- TRADING FUNCTIONS ---

    function buyShares(uint256 amount) external payable {
        require(saleActive, "Trading Paused");
        require(amount > 0, "Amount > 0");
        
        uint256 cost = getBuyPrice(amount);
        require(msg.value >= cost, "Insufficient ETH sent");

        _mint(msg.sender, amount);
        emit AssetBought(msg.sender, amount, cost);

        // Refund dust (excess ETH)
        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }
    }

    function sellShares(uint256 amount) external {
        require(amount > 0, "Amount > 0");
        require(balanceOf(msg.sender) >= amount, "Not enough shares");

        uint256 refund = getSellPrice(amount);
        
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(refund); // Send ETH back to user from reserves
        
        emit AssetSold(msg.sender, amount, refund);
    }

    // --- YIELD FUNCTIONS (Same as before) ---
    
    function depositRent() external payable {
        totalDividendsDistributed += msg.value;
        emit RentDeposited(msg.value);
    }

    function getClaimableRent(address user) public view returns (uint256) {
        if (totalSupply() == 0) return 0;
        uint256 userShares = balanceOf(user);
        uint256 totalEntitlement = (totalDividendsDistributed * userShares) / totalSupply();
        uint256 alreadyWithdrawn = withdrawnDividends[user];
        if (totalEntitlement <= alreadyWithdrawn) return 0;
        return totalEntitlement - alreadyWithdrawn;
    }

    function claimRent() external {
        uint256 payout = getClaimableRent(msg.sender);
        require(payout > 0, "No yield");
        withdrawnDividends[msg.sender] += payout;
        payable(msg.sender).transfer(payout);
        emit DividendClaimed(msg.sender, payout);
    }

    function toggleSale() external onlyOwner {
        saleActive = !saleActive;
    }
    
    // Allow contract to receive ETH (for the bonding curve reserves)
    receive() external payable {}
}