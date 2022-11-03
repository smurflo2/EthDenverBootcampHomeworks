import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners(); // get first account in the list of generated accounts
    console.log(`Deploying contracts with the account: ${deployer.address}`);

    const balance = await deployer.getBalance();
    console.log(`Account Balance: ${balance.toString()}`);

    /* const DummyContract = await ethers.getContractFactory("DummyContract");
    const dummyContract = DummyContract.deploy(); */

    const VolcanoCoinDeployer = await ethers.getContractFactory("VolcanoCoin");
    const volcanoCoin = VolcanoCoinDeployer.deploy();

    console.log("Token deployed to:", volcanoCoin.address);
}

/*
async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

    const lockedAmount = ethers.utils.parseEther("1");
  
    const Lock = await ethers.getContractFactory("Lock");
    const lock = await Lock.deploy(unlockTime, { value: lockedAmount });
  
    await lock.deployed();

    console.log(
        `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
*/