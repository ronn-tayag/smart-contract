# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
Compile the project
npx hardhat compile

Deploy
npx hardhat run scripts/deploy.ts --network sepolia
npx hardhat run scripts/deploy.ts --network ganache

To run the test
npx hardhat test

To run ts node
npx ts-node script/mint.ts


To format the balance to more readable
hre.ethers.formatEther(balance)

To get the address balance
await hre.ethers.provider.getBalance(owner.address);

Parse the given string amount to BigInt
const amount = hre.ethers.parseUnits("1", 18);

Get balance base on contract
contract.balanceOf(address);