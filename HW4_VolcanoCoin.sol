// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

/**
 * @title VolcanoCoin
 * @dev homework 4 things
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract VolcanoCoin {

    uint256 supply = 10000;
    address immutable owner;
    mapping(address => uint256) public balances;
    // 14: the other way is to create a public function for balances

    struct Payment {
        uint amount;
        address recipient;
    }
    mapping(address => Payment[]) public payments;

    event supplyIncreaseEvent(uint256 newSupply);
    event transferEvent(uint256 amount, address recipient);

    modifier onlyOwner {
        if (msg.sender == owner) {
            _;
        }
    }

    constructor() {
        owner = msg.sender;
        balances[owner] = supply;
    }

    function getSupply() public view returns (uint256) {
        return supply;
    }

    function increaseSupply() public onlyOwner {
        supply = supply + 1000;
        emit supplyIncreaseEvent(supply);
    }

    function transfer(uint256 amount, address recipient) public {
        require(balances[msg.sender] > amount, "Not enough VolcanoCoin to send");
        require(amount > 0, "Amount must be greater than 0");

        balances[msg.sender] = balances[msg.sender] - amount;
        balances[recipient] = balances[recipient] + amount;

        payments[msg.sender].push(Payment({amount: amount, recipient: recipient}));

        emit transferEvent(amount, recipient);
    }
    // 16a: We don't need the sender's address here because we already have access to it in msg.sender
    // 16b: If we had the sender's address as a parameter then someone could transfer tokens from an account that isn't theirs

    function getPaymentsArray(address _address) public view returns (Payment[] memory) {
        return payments[_address];
    }
}
