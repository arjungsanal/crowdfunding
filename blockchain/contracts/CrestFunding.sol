// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title CrowdFunding
 * @dev Create and manage crowdfunding campaigns
 */
contract CrowdFunding is Ownable, ReentrancyGuard {
    struct Campaign {
        string id;               // UUID from your database
        address payable creator;  // Campaign creator's wallet address
        uint256 goal;            // Funding goal in wei
        uint256 deadline;        // Campaign deadline timestamp
        uint256 amountCollected; // Total amount collected so far
        bool goalReached;        // Has the goal been reached?
        bool fundsClaimed;       // Have the funds been claimed?
        bool isActive;           // Is the campaign active?
    }
    
    // Mapping from campaign ID (UUID) to Campaign
    mapping(string => Campaign) public campaigns;
    
    // Array to store all campaign IDs
    string[] public campaignIds;
    
    // Events
    event CampaignCreated(string id, address creator, uint256 goal, uint256 deadline);
    event DonationReceived(string campaignId, address donor, uint256 amount);
    event FundsClaimed(string campaignId, address recipient, uint256 amount);
    event CampaignStatusChanged(string campaignId, bool isActive);
    
    /**
     * @dev Create a new campaign
     * @param _id UUID from your database
     * @param _creator Address of the campaign creator
     * @param _goal Funding goal in wei
     * @param _durationInDays Campaign duration in days
     */
    function createCampaign(
        string memory _id,
        address payable _creator,
        uint256 _goal,
        uint256 _durationInDays
    ) external onlyOwner {
        require(_goal > 0, "Goal must be greater than zero");
        require(_durationInDays > 0, "Duration must be greater than zero");
        require(campaigns[_id].creator == address(0), "Campaign ID already exists");
        
        uint256 deadline = block.timestamp + (_durationInDays * 1 days);
        
        Campaign memory newCampaign = Campaign({
            id: _id,
            creator: _creator,
            goal: _goal,
            deadline: deadline,
            amountCollected: 0,
            goalReached: false,
            fundsClaimed: false,
            isActive: true
        });
        
        campaigns[_id] = newCampaign;
        campaignIds.push(_id);
        
        emit CampaignCreated(_id, _creator, _goal, deadline);
    }
    
    /**
     * @dev Donate to a campaign
     * @param _id Campaign ID
     */
    function donate(string memory _id) external payable nonReentrant {
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.creator != address(0), "Campaign does not exist");
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp <= campaign.deadline, "Campaign deadline has passed");
        require(msg.value > 0, "Donation amount must be greater than zero");
        
        campaign.amountCollected += msg.value;
        
        // Check if goal is reached
        if (!campaign.goalReached && campaign.amountCollected >= campaign.goal) {
            campaign.goalReached = true;
        }
        
        emit DonationReceived(_id, msg.sender, msg.value);
    }
    
    /**
     * @dev Claim funds from a successful campaign
     * @param _id Campaign ID
     */
    function claimFunds(string memory _id) external nonReentrant {
        Campaign storage campaign = campaigns[_id];
        
        require(campaign.creator != address(0), "Campaign does not exist");
        require(msg.sender == campaign.creator, "Only the creator can claim funds");
        require(campaign.goalReached, "Funding goal not reached");
        require(!campaign.fundsClaimed, "Funds already claimed");
        
        campaign.fundsClaimed = true;
        
        uint256 amount = campaign.amountCollected;
        
        // Transfer funds to the creator
        (bool sent, ) = campaign.creator.call{value: amount}("");
        require(sent, "Failed to send funds");
        
        emit FundsClaimed(_id, campaign.creator, amount);
    }
    
    /**
     * @dev Get campaign details
     * @param _id Campaign ID
     */
    function getCampaign(string memory _id) external view returns (
        address creator,
        uint256 goal,
        uint256 deadline,
        uint256 amountCollected,
        bool goalReached,
        bool fundsClaimed,
        bool isActive
    ) {
        Campaign memory campaign = campaigns[_id];
        require(campaign.creator != address(0), "Campaign does not exist");
        
        return (
            campaign.creator,
            campaign.goal,
            campaign.deadline,
            campaign.amountCollected,
            campaign.goalReached,
            campaign.fundsClaimed,
            campaign.isActive
        );
    }
    
    /**
     * @dev Toggle campaign active status
     * @param _id Campaign ID
     * @param _isActive New active status
     */
    function toggleCampaignStatus(string memory _id, bool _isActive) external onlyOwner {
        Campaign storage campaign = campaigns[_id];
        require(campaign.creator != address(0), "Campaign does not exist");
        
        campaign.isActive = _isActive;
        
        emit CampaignStatusChanged(_id, _isActive);
    }
    
    /**
     * @dev Get all campaign IDs
     */
    function getAllCampaignIds() external view returns (string[] memory) {
        return campaignIds;
    }
    
    /**
     * @dev Get count of campaigns
     */
    function getCampaignCount() external view returns (uint256) {
        return campaignIds.length;
    }
}