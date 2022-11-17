import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.17",
    networks: {
        hardhat: {
            chainId: 31337,
            forking: {
                url: "https://mainnet.infura.io/v3/ffe44e4700ca40ed9193f2dd9540eb28",
            },
        },
    },
};

export default config;
