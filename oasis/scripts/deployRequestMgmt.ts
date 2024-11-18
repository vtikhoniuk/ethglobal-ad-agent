const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const contractFactory = await ethers.getContractFactory("RequestMgmt");
  const contract = await contractFactory.deploy();

  console.log("Contract address:", await contract.getAddress());
}
  
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });