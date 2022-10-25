


//interface ITreasureChest {
  //  function GetTreasure(address) external;
//}

//string treasure_contract = '0x97b0658844af9b08ed0e826e30417448400abae2';

// TreasureChest contract: 0x18acF9DEB7F9535F4848a286b68C729AAc55697a

/*
contract ClaimTreasure {

    event TreasureClaimed(string);

    function callTreasureContract(address _address) external {
        ITreasureChest(_address).GetTreasure(msg.sender);
    }
    // change this string literal to be the name of your team
    // Implement the functions from the interface
    // Your claimTreasure function should emit
    // the event TreasureClaimed with teamName as an argument

    function claimTreasure(string calldata teamName) public {
        address treasure_contract = 0x18acF9DEB7F9535F4848a286b68C729AAc55697a;

        //ITreasureChest('0x97b0658844af9b08ed0e826e30417448400abae2').GetTreasure(teamName);
        ITreasureChest(treasure_contract).GetTreasure(0x971ed3B1D66A445d20e75EdE714e64f00e9cAFF8);

        // callTreasureContract(treasure_contract);

        emit TreasureClaimed(teamName);
    }
}
*/

// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

interface ITreasureChest {
    function GetTreasure(address) external;
}

contract ClaimTreasure {
	function callTreasureContract(address _address) external {
		ITreasureChest(_address).GetTreasure(msg.sender);
	}
}
