import { HardhatUserConfig } from "hardhat/config";
import '@oasisprotocol/sapphire-hardhat';
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const ETH_PRIVATE_KEY = process.env.ETH_PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    'sapphire-testnet': {
      // This is Testnet! If you want Mainnet, add a new network config item.
      url: "https://testnet.sapphire.oasis.io",
      accounts: [`0x${ETH_PRIVATE_KEY}`],
      chainId: 0x5aff,
    },
    hardhat: {
      forking: {
        url: "https://rpc-amoy.polygon.technology/",
        enabled: process.env.MAINNET_FORKING_ENABLED === "true",
      },
    },
  },
};

export default config;
