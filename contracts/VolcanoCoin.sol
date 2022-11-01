// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title VolcanoCoin
 * @dev homework things
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract VolcanoCoin is Ownable {

    uint256 supply = 10000;
    mapping(address => uint256) public balances;
    // 14: the other way is to create a public function for balances

    struct Payment {
        uint amount;
        address recipient;
    }
    mapping(address => Payment[]) payments;

    event supplyIncreaseEvent(uint256 newSupply);
    event transferEvent(uint256 amount, address recipient);

    constructor() {
        balances[msg.sender] = supply;
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

        recordPayment(msg.sender, recipient, amount);

        emit transferEvent(amount, recipient);
    }
    // 16a: We don't need the sender's address here because we already have access to it in msg.sender
    // 16b: If we had the sender's address as a parameter then someone could transfer tokens from an account that isn't theirs

    // HW7: What's the difference between this and making the 'payments' mapping public?
    //        This gets you an array of payments and works even if no payements have been made to the specified account
    //        The public mappying requires passing an index too and will fail if given an invalid index (i.e. if no payments have been made yet)
    function getPaymentRecords(address _address) public view returns (Payment[] memory) {
        return payments[_address];
    }

    function recordPayment(address _sender, address _recipient, uint256 _amount) private {
        payments[_sender].push(Payment({amount: _amount, recipient: _recipient}));
    }
}
