import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const config: HardhatUserConfig = {
  solidity: "0.8.21",
  networks: {
    sepolia: {
      url: process.env.AlchemyUrl,
      accounts: [`${process.env.Key}`]
    },
  },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
  
};


export default config;


