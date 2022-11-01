import { expect } from "chai";
import { ethers } from "hardhat";

describe("VolcanoNFT", function() {
    let VolcanoNFTDeployer, volcanoNFT, owner, addr1, addr2;

    beforeEach(async () => {
        // Deploy a new instance of the contract
        VolcanoNFTDeployer = await ethers.getContractFactory("VolcanoNFT");
        volcanoNFT = await VolcanoNFTDeployer.deploy();

        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe("Basic NFT things", () => {
        it("Should be able to be minted", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.mint(addr1.address);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);
        });
        it("Should be able to mint multiple", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.mint(addr1.address);
            await volcanoNFT.mint(addr1.address);
            await volcanoNFT.mint(addr2.address);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await volcanoNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await volcanoNFT.ownerOf(2)).to.equal(addr2.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(2);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(1);
        });
        it("Should be able to be transferred", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.mint(addr1.address);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT
                .connect(addr1)
                .transferFrom(addr1.address, addr2.address, 0);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr2.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(1);
        });
    });
});
