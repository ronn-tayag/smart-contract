import hre from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    const Token = await hre.ethers.getContractFactory("MyToken");
    const token = Token.attach(String(process.env.CONTRACT_ID)); 

    const [owner] = await hre.ethers.getSigners();
    console.log("owner", owner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
