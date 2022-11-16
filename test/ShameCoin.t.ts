import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("ShameCoin", function() {
    let ShameCoinDeployer: any,
        shameCoin: any,
        admin: SignerWithAddress,
        addr1: SignerWithAddress,
        addr2: SignerWithAddress;

    beforeEach(async () => {
        // Deploy a new instance of the contract
        ShameCoinDeployer = await ethers.getContractFactory("ShameCoin");
        shameCoin = await ShameCoinDeployer.deploy();

        [admin, addr1, addr2] = await ethers.getSigners();
    });

    describe("Deployment", () => {
        it("Should have decimals set to 0", async () => {
            expect(await shameCoin.decimals()).to.equal(0);
        });

        /* it("test", async () => {
                                            expect(await shameCoin.balanceOf(admin.address)).to.equal(10);
                                        }); */
    });

    describe("Transfers", () => {
        it("Admin can send one shame coin to other addresses", async () => {
            expect(await shameCoin.balanceOf(addr1.address)).to.equal(0);
            await shameCoin.transfer(addr1.address, 1);
            expect(await shameCoin.balanceOf(addr1.address)).to.equal(1);
            await shameCoin.transfer(addr1.address, 1);
            expect(await shameCoin.balanceOf(addr1.address)).to.equal(2);

            await shameCoin.transfer(addr2.address, 1);
            expect(await shameCoin.balanceOf(addr2.address)).to.equal(1);
        });
        it("Non-admin increases balance by one if they try to transfer", async () => {
            expect(await shameCoin.balanceOf(addr1.address)).to.equal(0);
            await shameCoin.connect(addr1).transfer(addr2.address, 1);
            expect(await shameCoin.balanceOf(addr1.address)).to.equal(1);
        });
    });
});
