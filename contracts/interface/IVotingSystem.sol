// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

interface IVotingSystem {

    function createVoteSystem() external;

    function getVoteList() external view returns (address [] memory);
    
}