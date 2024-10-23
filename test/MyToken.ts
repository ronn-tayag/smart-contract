import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("MyToken : Mint and Transfer", function () {
  async function deployContract() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const contract = await MyToken.deploy();
    const provider = hre.ethers.provider;

    return { provider, contract, owner, otherAccount };
  }

  describe("It should have address and balance", function () {
    it("Owner must be equal to  0xf39...2266", async function () {
      const { owner } = await loadFixture(deployContract);
      expect(owner.address).to.equal(
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      );
    });
    it("Owner have balance greater than zero", async function () {
      const { contract, owner } = await loadFixture(deployContract);
      const balance = await contract.balanceOf(owner.address);
      expect(balance).to.greaterThan(0);
    });
    it("Should be equal to 0x70...C8", async function () {
      const { otherAccount } = await loadFixture(deployContract);
      expect(otherAccount.address).to.equal(
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
      );
    });
    it("0x70997970...79C8 starting balance to 0", async function () {
      const { contract, otherAccount } = await loadFixture(deployContract);
        const balance = await contract.balanceOf(otherAccount.address);
      expect(balance).to.equal(0);
    });
  });

  describe("Mint", function () {
    it("It should increase the owners balance", async function () {
      const { contract, owner, otherAccount } = await loadFixture(
        deployContract
      );
      var beforeContractBalance = await contract.balanceOf(owner.address);
      const amount = hre.ethers.parseUnits("100", 18);
      await contract.mint(owner.address, amount);
      const afterContractBalance = await contract.balanceOf(owner.address);
      expect(afterContractBalance).to.be.greaterThan(beforeContractBalance);
    });
  });
  describe("It should transfer", function () {
    it("It should decrease owners", async function () {
      const { contract, owner, otherAccount } = await loadFixture(
        deployContract
      );
      var contractBalance = await contract.balanceOf(owner.address);
      const amount = hre.ethers.parseUnits("100", 18);

      await contract.transfer(otherAccount.address, amount);
      const beforeContractBalance = await contract.balanceOf(owner.address);

      expect(beforeContractBalance).to.be.lessThan(contractBalance);
    });
    it("It should increase otherAccount", async function () {
      const { contract, otherAccount } = await loadFixture(
        deployContract
      );
      var contractBalance = await contract.balanceOf(otherAccount.address);
      const amount = hre.ethers.parseUnits("100", 18);

      await contract.transfer(otherAccount.address, amount);
      const beforeContractBalance = await contract.balanceOf(
        otherAccount.address
      );

      expect(beforeContractBalance).to.be.greaterThan(contractBalance);
    });
  });
});
