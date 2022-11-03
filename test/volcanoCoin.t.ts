import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("VolcanoCoin", function() {
    let VolcanoCoinDeployer: any,
        volcanoCoin: any,
        owner: SignerWithAddress,
        addr1: SignerWithAddress,
        addr2: SignerWithAddress;

    beforeEach(async () => {
        // Deploy a new instance of the contract
        VolcanoCoinDeployer = await ethers.getContractFactory("VolcanoCoin");
        volcanoCoin = await VolcanoCoinDeployer.deploy();

        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("Should have an initial supply of 10000", async () => {
            expect(await volcanoCoin.getSupply()).to.equal(10000);
        });
    });

    describe("Functions", () => {
        it("Should increase total supply by increments of 1000", async () => {
            expect(await volcanoCoin.getSupply()).to.equal(10000);
            await volcanoCoin.increaseSupply();
            expect(await volcanoCoin.getSupply()).to.equal(11000);
            await volcanoCoin.increaseSupply();
            expect(await volcanoCoin.getSupply()).to.equal(12000);
        });
    });

    describe("Security", () => {
        it("Only the owner should be able to increase supply", async () => {
            await expect(
                volcanoCoin.connect(addr1).increaseSupply()
            ).to.be.revertedWith("Ownable: caller is not the owner");
        });
    });
});
