// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// imported ERC20 and Ownable contracts from the OpenZeppelin library
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
  * @title A unique token that can be used in different context (e.g. data or rental marketplace)
  * @dev all the functions from the ERC20 tokens standard are available
  * @author Kyle
  */
contract DummyContract is ERC20("DummyToken", "DumTkn"), Ownable {
    uint256 constant INITIAL_AMOUNT = 100;

    constructor() {}

    function setUp() external onlyOwner() {
        _mint(msg.sender, INITIAL_AMOUNT);
    }
}
