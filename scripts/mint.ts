import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // Connect to the Sepolia network via the Blast API
  const provider = new ethers.JsonRpcProvider(
    "https://eth-sepolia.public.blastapi.io"
  );

  // Create a wallet instance using your private key
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
    const balance = await provider.getBalance(wallet.address);
    
    console.log("wallet", wallet);
    console.log("balance", balance);

    // Replace with your contract address and ABI
    const contractAddress = String(process.env.CONTRACT_ID);
    const contractABI = [
        "function mint(address to, uint256 amount)",
    ];

    // Create a contract instance
    const contract = new ethers.Contract(contractAddress, contractABI, wallet);

    // Specify the recipient and amount to mint
    const recipient = "0x049d681AAA9130dFd97CBf5F0249F57544993C61"; // Replace with the address you want to mint tokens to
    const amount = ethers.parseUnits("100", 18); // Mint 100 tokens (adjust decimals as needed)

  // Mint tokens
  // try {
  //   const tx = await contract.mint(recipient, amount);
  //   console.log("Minting tokens... Transaction hash:", tx.hash);

  //   // Wait for the transaction to be confirmed
  //   const receipt = await tx.wait();
  //   console.log("Transaction confirmed in block:", receipt.blockNumber);
  // } catch (error) {
  //   console.error("Error minting tokens:", error);
  // }

  const newbalance = await provider.getBalance(wallet.address);
  console.log("balance", newbalance);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
