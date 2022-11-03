// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface IVolcanoCoin {
    function transfer(uint, address) external;
}

/**
 * @title VolcanoNFT
 * @dev homework things
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract VolcanoNFT is ERC721("VolcanoNFT", "VNFT"), Ownable {

    uint mintId = 0;

    constructor() {}

    function mint(address to) private {
        _safeMint(to, mintId);
        mintId += 1;
    }

    function ownerMint(address to) public onlyOwner {
        mint(to);
    }

    function mintWithEth(address to) public payable {
        require(msg.value >= 0.01 ether, "Mint price is 0.01 ETH");
        mint(to);
    }

    function mintWithVolcanoCoin(address to, uint amount, address volcanoCoinAddress) public {
        require(amount >= 1000, "Minimum of 1000 Volcano Coin required");

        IVolcanoCoin(volcanoCoinAddress).transfer(amount, owner());

        mint(to);
    }


    /* uint256 supply = 10000;
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
        require(balances[msg.sender] > amount, "Not enough VolcanoNFT to send");
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
    } */
}
