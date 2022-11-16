// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.0;

/* import "@openzeppelin/contracts/access/Ownable.sol"; */
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ShameCoin
 * @dev You don't want this coin
 */
contract ShameCoin is ERC20("ShameCoin", "SHAME") {

    address immutable administrator;
    mapping(address => bool) approvedAddresses;

    modifier onlyAdmin() {
        if (msg.sender == administrator) {
            _;
        } 
        else {
            revert("You're not the admin :P")
        }

    }

    constructor() {
        administrator = msg.sender;
        _mint(administrator, 1000);
    }

    function decimals() public view virtual override returns(uint8) {
        return 0;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(amount == 1, "Can only transfer one coin at a time");   

        if (msg.sender == administrator) {
            _mint(recipient, 1);
            return true;
        }
        else {
            _mint(msg.sender, 1);
            return true;
        }
    }

    function burn(address burnFor) external onlyAdmin {
        if (approvedAddresses[burnFor]) {
            _burn(burnFor, 1);
        }
    }

    function approveAdminBurn() external {
        approvedAddresses[msg.sender] = true;
    }
}
