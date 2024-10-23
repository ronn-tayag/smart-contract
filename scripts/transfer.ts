import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Connect to the Sepolia network via the Blast API
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  const contractAddress = `0xb35343a094bfCcead68149aEa1723e6A6e459a8b`; //String(process.env.CONTRACT_ID);

  const contractABI = [
    `function mint(address to, uint256 amount)`,
    "function transfer(address _to, uint256 _value)",
  ];

  const contract = new ethers.Contract(contractAddress, contractABI, wallet);
  const balance = await provider.getBalance(wallet.address);
  console.log("before balance", ethers.formatEther(balance), wallet.address);

  const amount = ethers.parseUnits("1000", 18);
  await contract.mint(wallet.address, amount);
  const balance2 = await provider.getBalance(wallet.address);
  console.log("after balance2", ethers.formatEther(balance2));

  
  // try {
  //   const amount = ethers.parseUnits("100", 18); 
  //   const recipient = "0x049d681AAA9130dFd97CBf5F0249F57544993C61";
  //   const tx = await contract.transfer(recipient, amount);
  //   console.log("Minting tokens... Transaction hash:", tx.hash);
  //   const receipt = await tx.wait();
  //   console.log("Transaction confirmed in block:", receipt.blockNumber);
  // } catch (error) {
  //   console.error("Error minting tokens:", error);
  // }
  // const newbalance = await provider.getBalance(wallet.address);
  // console.log("after newbalance", ethers.formatEther(newbalance));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
