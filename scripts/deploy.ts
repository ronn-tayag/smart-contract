import { ethers } from "hardhat";

async function main() {
  // Deploy the contract
  const MyToken = await ethers.getContractFactory("MyToken");

  // Deploy the contract
  const myToken = await MyToken.deploy();

  // Wait for the deployment transaction to be mined
  await myToken.deploymentTransaction()?.wait();

  console.log("MyToken deployed to:", await myToken?.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
