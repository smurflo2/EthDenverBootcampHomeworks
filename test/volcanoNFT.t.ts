import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { VolcanoNFT } from "../contracts/VolcanoNFT.sol";

describe("VolcanoNFT", function() {
    let volcanoNFT: any,
        volcanoCoin: any,
        owner: SignerWithAddress,
        addr1: SignerWithAddress,
        addr2: SignerWithAddress;

    const deployVolcanoNft = async () => {
        const VolcanoNFTDeployer = await ethers.getContractFactory("VolcanoNFT");
        volcanoNFT = await VolcanoNFTDeployer.deploy();
    };

    const deployVolcanoCoin = async () => {
        const VolcanoCoinDeployer = await ethers.getContractFactory("VolcanoCoin");
        volcanoCoin = await VolcanoCoinDeployer.deploy();
    };

    beforeEach(async () => {
        await deployVolcanoNft();

        [owner, addr1, addr2] = await ethers.getSigners();
    });

    describe("Basic NFT things", () => {
        it("Should be able to be minted", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.ownerMint(addr1.address);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(1);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);
        });
        it("Should be able to mint multiple", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.ownerMint(addr1.address);
            await volcanoNFT.ownerMint(addr1.address);
            await volcanoNFT.ownerMint(addr2.address);

            expect(await volcanoNFT.ownerOf(0)).to.equal(addr1.address);
            expect(await volcanoNFT.ownerOf(1)).to.equal(addr1.address);
            expect(await volcanoNFT.ownerOf(2)).to.equal(addr2.address);
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(2);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(1);
        });
        it("Should be able to be transferred", async () => {
            expect(await volcanoNFT.balanceOf(addr1.address)).to.equal(0);
            expect(await volcanoNFT.balanceOf(addr2.address)).to.equal(0);

            await volcanoNFT.ownerMint(addr1.address);

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

    describe("HW11", () => {
        it("Should fail to mint if insufficient ETH supplied", async () => {
            await expect(volcanoNFT.mintWithEth(addr1.address)).to.be.revertedWith(
                "Mint price is 0.01 ETH"
            );
        });
        it("Should mint if 0.1 ETH supplied", async () => {
            await expect(
                volcanoNFT.mintWithEth(addr1.address, {
                    value: ethers.utils.parseEther("0.01"),
                })
            ).to.not.be.reverted;
        });
        it("Should mint if more than 0.1 ETH supplied", async () => {
            await expect(
                volcanoNFT.mintWithEth(addr1.address, {
                    value: ethers.utils.parseEther("22"),
                })
            ).to.not.be.reverted;
        });
        it("Should mint for non-owner if ETH is supplied", async () => {
            await expect(
                volcanoNFT.connect(addr1).mintWithEth(addr1.address, {
                    value: ethers.utils.parseEther("0.01"),
                })
            ).to.not.be.reverted;
        });
        /* it("Should be minted for 1000 VolcanoCoin", async () => {
                await deployVolcanoCoin();
    
                await volcanoCoin.transfer(2000, addr1.address);
                console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
                console.log("owner balance", await volcanoCoin.balances(owner.address));
                console.log("addr1 balance", await volcanoCoin.balances(addr1.address));
    
                await volcanoNFT
                    .connect(addr1)
                    .mintWithVolcanoCoin(addr1.address, 1001, volcanoCoin.address);
                console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
                console.log("owner balance", await volcanoCoin.balances(owner.address));
                console.log("addr1 balance", await volcanoCoin.balances(addr1.address));
            }); */
    });
});
