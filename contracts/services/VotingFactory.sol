// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "./VotingSystem.sol";

contract FactoryVotingSystem {

    address [] public voteList;

    event CreateVoteSuccessful(address indexed voteAddress, address indexed creator);


    function createVoteSystem() external {
        VotingSystem newVote = new VotingSystem();
        voteList.push(address(newVote));
        emit CreateVoteSuccessful(address(newVote), msg.sender);
    }

    function getVoteList() external view returns (address [] memory) {
        return voteList;
    }
}






