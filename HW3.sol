// SPDX-License-Identifier: None

pragma solidity 0.8.17;


contract HW3_BootcampContract {

    uint256 number;
    address deployer;

    constructor() {
        deployer = msg.sender;
    }

    // Write an external function to return dEaD address if called by the deployer, otherwise return deployer's address
    function getDeployerAddress() external view returns (address) {
        if (msg.sender == deployer) {
            return 0x000000000000000000000000000000000000dEaD;
        }
        return deployer;
    }



    function store(uint256 num) public {
        number = num;
    }


    function retrieve() public view returns (uint256){
        return number;
    }
}
