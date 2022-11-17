import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";

const ERC20ABI = require("../erc20.abi.json");

const binanceAddress = "0x28c6c06298d514db089934071355e5743bf21d60";
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const uniswapAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564";

describe("UniSwap", function() {
    let daiContract: ethers.Contract;
    let usdcContract: ethers.Contract;

    beforeEach(async () => {
        daiContract = new ethers.Contract(daiAddress, ERC20ABI, ethers.provider);
        usdcContract = new ethers.Contract(usdcAddress, ERC20ABI, ethers.provider);

        // [admin, addr1, addr2] = await ethers.getSigners();
    });

    describe("Interact with UniSwap", () => {
        it("imporsonate Binance", async () => {
            const impersonatedSigner = await ethers.getImpersonatedSigner(
                binanceAddress
            );

            // check balance of USDC + DAI
            const initialDaiBalance = await daiContract.balanceOf(binanceAddress);
            const initialUsdcBalance = await usdcContract.balanceOf(binanceAddress);

            console.log("🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥");
            console.log("initialDaiBalance:", initialDaiBalance);
            console.log("initialUsdcBalance:", initialUsdcBalance);

            // swap with UniSwap
            const amountToSwap = 1000;
            // await impersonatedSigner.sendTransaction({ to: uniswapAddress }); // ...TODO

            // recheck balance
            const actualDaiBalance = await daiContract.balanceOf(binanceAddress);
            const actualUsdcBalance = await usdcContract.balanceOf(binanceAddress);

            // TODO this math isn't going to work (BigNumber - number)
            /* const expectedDaiBalance = initialDaiBalance - amountToSwap;
                  const expectedUsdcBalance = initialUsdcBalance + amountToSwap; // assumes 1:1 swap
      
                  expect(actualDaiBalance).to.equal(expectedDaiBalance);
                  expect(actualUsdcBalance).to.equal(expectedUsdcBalance); */
        });
    });
});
