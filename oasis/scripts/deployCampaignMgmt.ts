const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const CampaignMgmtFactory = await ethers.getContractFactory("CampaignMgmt");
  const contract = await CampaignMgmtFactory.deploy();

  console.log("Contract address:", await contract.getAddress());
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });