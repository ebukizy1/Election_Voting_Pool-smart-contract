// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "../library/ErrorMessage.sol";

contract VotingSystem {
    using ErrorMessage for *;

    address private owner;

    mapping(uint => Election) public usersElection;
    mapping(address => bool) public hasVote;

    uint count;

    constructor(){
        owner = msg.sender;
    }

    struct Candidate {
        string name;
        bool isVotedFor;
        uint voteCount;
    }

    enum ElectionStatus {
        Open, Close
    }

    struct Election {
        uint electionId;
        string voteTitle;
        string voteDescription;
        uint createdTime;
        Candidate[] candidates;
        ElectionStatus status;
    }

    Election[] electionList;

    modifier onlyOwner (){
        require(owner == msg.sender, "only owner permitted");
        _;
    }


    function createVote(string memory _voteTitle, string memory _voteDescription) external onlyOwner {
        uint newId = count + 1;

        Election storage _newElection = usersElection[newId];
        _newElection.electionId = newId;
        _newElection.voteTitle = _voteTitle;
        _newElection.voteDescription = _voteDescription;
        _newElection.createdTime = block.timestamp;
        _newElection.status = ElectionStatus.Open;

        electionList.push(_newElection);
        count += 1;
    }


function addCandidate(uint _id, string memory _candidateName) external onlyOwner {
    Election storage election = usersElection[_id];

    if(election.status != ElectionStatus.Open){
        revert ErrorMessage.ELECTION_IS_NOT_OPEN();
    }

    Candidate memory newCandidate;
    newCandidate.name = _candidateName;

    // Push the new candidate to the existing array in the mapping
    election.candidates.push(newCandidate);

}




    function voteCandidate(uint _electionId, uint _candidateId) external {

        if(usersElection[_electionId].status != ElectionStatus.Open){
            revert ErrorMessage.ELECTION_IS_NOT_OPEN();
        }

        if(hasVote[msg.sender]){
            revert ErrorMessage.YOU_HAVE_ALREADY_VOTED_IN_THIS_ELECTION();
        }


        Election storage election = usersElection[_electionId];

        if(_candidateId > election.candidates.length){
            revert ErrorMessage.INVALID_CANDIDATE_ID();
        }

        Candidate storage selectedCandidate = election.candidates[_candidateId - 1];

        selectedCandidate.voteCount += 1;
        selectedCandidate.isVotedFor = true;
        hasVote[msg.sender] = true;
    }


    function closeVote(uint _electionId) external onlyOwner{
        Election storage election = usersElection[_electionId];
        require(election.status == ElectionStatus.Open, "Election is not open");
        // Mark the election as closed
        election.status = ElectionStatus.Close;
    }
    

    function calculateWinner(uint _electionId) external view  onlyOwner returns (string memory winnerName) {
        Election storage election = usersElection[_electionId];
        require(election.status == ElectionStatus.Close, "Election is not closed");

        uint maxVotes = 0;
        uint winningCandidateId;

        // Find the candidate with the maximum number of votes
        for (uint i = 0; i < election.candidates.length; i++) {
            if (election.candidates[i].voteCount > maxVotes) {
                maxVotes = election.candidates[i].voteCount;
                winningCandidateId = i;
            }
        }
        require(maxVotes > 0, "No votes recorded");
        // Return the name of the winning candidate
        return election.candidates[winningCandidateId].name;
    }


    function getVotingList() external view returns (Election[] memory){
        return electionList;
    }

    function getCandidateList(uint _electionId) external view returns (Candidate[] memory) {
        Election storage election = usersElection[_electionId];
    // require(election.status == ElectionStatus.Close, "Election is not closed");

    return election.candidates;
}

}
    

