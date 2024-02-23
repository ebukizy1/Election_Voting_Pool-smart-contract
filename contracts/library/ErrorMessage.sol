// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

library ErrorMessage {


    error ELECTION_IS_NOT_OPEN();  
    error INVALID_CANDIDATE_ID(); 
    error YOU_HAVE_ALREADY_VOTED_IN_THIS_ELECTION();
    error CANDIDATE_HAS_ALREADY_BEEN_VOTED_FOR();
}