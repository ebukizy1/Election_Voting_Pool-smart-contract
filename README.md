VotingSystem Contract
Description
The VotingSystem contract is responsible for creating and managing individual voting systems. It allows the owner to create elections, add candidates to those elections, vote for candidates, close elections, and calculate winners.

Functions
createVote: Creates a new election with a specified title and description.
addCandidate: Adds a candidate to a specific election.
voteCandidate: Allows users to vote for a candidate in an open election.
closeVote: Closes an open election, preventing further votes.
calculateWinner: Calculates the winner of a closed election.
getVotingList: Retrieves a list of all created elections.
getCandidateList: Retrieves a list of candidates for a specific election.
Usage
Deploy the VotingSystem contract on the Ethereum blockchain.
Use the provided functions to create elections, add candidates, vote, and manage the voting process.
FactoryVotingSystem Contract
Description
The FactoryVotingSystem contract serves as a factory for deploying multiple instances of the VotingSystem contract. It allows anyone to create new voting systems using the createVoteSystem function.

Functions
createVoteSystem: Deploys a new instance of the VotingSystem contract and tracks its address.
getVoteList: Retrieves a list of addresses for all deployed VotingSystem contracts.
Usage
Deploy the FactoryVotingSystem contract on the Ethereum blockchain.
Use the createVoteSystem function to deploy new instances of the VotingSystem contract.
Retrieve the addresses of deployed VotingSystem contracts using the getVoteList function.
Deployed Contract Addresses
FactoryVotingSystem: FactoryAddress

VotingSystem instances:

0xFe9B3cE47aB48d5E5d652C1fbe3772aE4f73Cfe1
0x44d9360dE15A90a82dB0DC1106b252dcd163DCE8
0x73dc025AC2F7Aa4f1cd4E118454D0369A9aDb87b

Ensure you replace 0x727308D8AB066f2480ba3F13F453762A12561c07 with the actual address of your FactoryVotingSystem contract.

For more details on contract usage, refer to the respective contract files and function documentation. If you encounter any issues, please consult the provided error messages in the ErrorMessage library.# Election_Voting_Pool-smart-contract
