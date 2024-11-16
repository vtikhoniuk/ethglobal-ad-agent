import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { Address } from "cluster";

describe("Contract tests", function () {
  async function contract_deploy() {
    const [owner, brand, infl] = await ethers.getSigners();
    console.log("owner   -> " + owner.address);
    console.log("brand     -> " + brand.address);
    console.log("infl    -> " + infl.address);

    const contractFactory = await ethers.getContractFactory("CampaignMgmt");
    const contract = await contractFactory.connect(owner).deploy();
    await contract.waitForDeployment();

    console.log("Contract -> " + contract.target);

    return { owner, brand, infl, contract };
  }

  it("Contract test", async function () {
    const { owner, brand, infl, contract} = await loadFixture(contract_deploy);

    await expect(contract.connect(brand).createCampaign(infl, 1758382000, 1000, "http://localhost")).to.not.be.reverted;
    await expect(contract.connect(infl).performCampaign(1)).to.not.be.reverted;
    await expect(contract.connect(brand).approveCampaignResult(1)).to.not.be.reverted;
    await expect(contract.connect(brand).rejectCampaignResult(1)).to.be.reverted;
  })
})
