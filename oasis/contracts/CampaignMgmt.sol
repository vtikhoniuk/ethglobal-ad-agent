// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
//import "hardhat/console.sol";

contract CampaignMgmt {

    mapping(uint256 => Campaign) public campaigns;
    uint64 private _campaignsCounter;

    enum CampaignStatus {
        campaignCreated,
        campaignPerformed,
        campaignResultApproved,
        campaignResultRejected
    }

    struct Campaign {
        address brandAddr; // brand address to book campaign
        address influencerAddr; // influencer address to book campaign
        uint256 releaseDate; //dateAds for booking ads campaign (the 1st second of the dateAds)
        uint256 price; //how much paid in total by brand in USDC
        string link;
        CampaignStatus status;
    }

    /**** ERRORS ****/
    error UnauthorizedError();
    error InvalidStateError(uint256 campaignID, CampaignStatus current);

    /**** EVENTS ****/
    event CampaignCreated(uint256 campaignId, Campaign campaign);
    event CampaignUpdated(uint256 campaignId, CampaignStatus status);

    /**** MODIFIERS ****/
    modifier onlyBrand(uint256 campaignID) {
        if (campaigns[campaignID].brandAddr != msg.sender)
            revert UnauthorizedError();
        _;
    }

    modifier onlyInfluencer(uint256 campaignID) {
        if (campaigns[campaignID].influencerAddr != msg.sender)
            revert UnauthorizedError();
        _;
    }

    /**** EXTERNAL ****/
    function createCampaign(
        address influencerAddr,
        uint256 releaseDate,
        uint256 price,
        string calldata link
    ) external {
        
        require(price > 0, "Zero price");

        _campaignsCounter++;
        uint256 campaignID = _campaignsCounter;

        campaigns[campaignID] = Campaign({
            brandAddr: msg.sender,
            influencerAddr: influencerAddr,
            releaseDate: releaseDate,
            price: price,
            status: CampaignStatus.campaignCreated,
            link: link
        });

        emit CampaignCreated(campaignID, campaigns[campaignID]);
    }

    function performCampaign(uint256 campaignID) public onlyInfluencer(campaignID) {
        Campaign storage c = campaigns[campaignID];

        if (c.status != CampaignStatus.campaignCreated) revert InvalidStateError(campaignID, c.status);

        c.status = CampaignStatus.campaignPerformed;

        emit CampaignUpdated(campaignID, c.status);
    }

    function approveCampaignResult(uint256 campaignID) public onlyBrand(campaignID) {
        Campaign storage c = campaigns[campaignID];

        if (c.status != CampaignStatus.campaignPerformed) revert InvalidStateError(campaignID, c.status);

        c.status = CampaignStatus.campaignResultApproved;

        emit CampaignUpdated(campaignID, c.status);
    }

    function rejectCampaignResult(uint256 campaignID) public onlyBrand(campaignID) {
        Campaign storage c = campaigns[campaignID];

        if (c.status != CampaignStatus.campaignPerformed) revert InvalidStateError(campaignID, c.status);

        c.status = CampaignStatus.campaignResultRejected;

        emit CampaignUpdated(campaignID, c.status);
    }
}