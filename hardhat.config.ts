import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config({ path: `.env` });

const config: HardhatUserConfig = {
  solidity: "0.8.26",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.public.blastapi.io`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    ganache: {
      url: "http://127.0.0.1:8545",
      accounts: [
        "0x88c0f7b75bc32c3c83a40e38c11cdfb7189fa35a977751c16f1251c4e313e49f",
      ],
    },
  },
};

export default config;
