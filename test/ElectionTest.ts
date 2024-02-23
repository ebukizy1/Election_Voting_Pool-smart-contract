import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect, assert } from "chai";
  import { ethers } from "hardhat";

  describe.only("Lock", function () {

    const deployElectionApplication = async ()=>{
            const voteTitle = "My new Election"; 
            const voteDescription = "all i need is you";
            const[owner, account1, account2] = await ethers.getSigners();

            const VotingSystem = await ethers.getContractFactory("VotingSystem");
            const elections = await VotingSystem.deploy();
          
            return {elections, owner, account1, account2, voteTitle, voteDescription};
        }

    describe("Deploy Election " , async () => {
        it("test that election can be created ", async ()=>{
            const voteTitle = "My new Election"; 
            const voteDescription = "all i need is you";

            const {elections} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();

            expect((await elections.getVotingList()).length).to.equal(1);

            });

        it("test vote system can add candidate ", async () => {
        
            const {elections, voteTitle, voteDescription} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();

            expect((await elections.getVotingList()).length).to.equal(1);

            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            expect(((await elections.getCandidateList(1)).length)).to.equal(1);
            });

    describe("Vote Candidate" , async () => {
        it("test that users have vote for candidate in election", async () => {
              
            const {elections, voteTitle, voteDescription,owner} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();
            
            expect((await elections.getVotingList()).length).to.equal(1);
            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            const voteTx =  await  elections.voteCandidate(1, 1);
            await voteTx.wait();
            
            const hasVoted = await elections.hasVote(owner.address);
            assert.isTrue(hasVoted); 

        });
        it("test that candidate have been voted for in an election", async() => {

            const {elections, voteTitle, voteDescription,owner} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();
            
            expect((await elections.getVotingList()).length).to.equal(1);
            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            const voteTx =  await  elections.voteCandidate(1, 1);
            await voteTx.wait();
            
            const hasVoted = await elections.hasVote(owner.address);
            assert.isTrue(hasVoted); 
            
            const candidateList = await elections.getCandidateList(1);
            expect(candidateList[0].isVotedFor).to.equal(true);

        });


    });


    describe("Voting Validations ", async () => {
        it("test that VoteSystem cannot add candidate when vote is close", async () => {
              
            const {elections, voteTitle, voteDescription} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();
    
            expect((await elections.getVotingList()).length).to.equal(1);
    
            const closeTx = await elections.closeVote(1);
            await closeTx.wait();
    
            await expect(elections.addCandidate(1, "Emmanuel2"))
            .to.be.revertedWithCustomError(elections, "ELECTION_IS_NOT_OPEN()");
                   
            });


        it("test that VoteSystem cannot add cannot vote when election is close", async () => {
            const {elections, voteTitle, voteDescription} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();
    
            expect((await elections.getVotingList()).length).to.equal(1);
    
             
            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            const closeTx = await elections.closeVote(1);
            await closeTx.wait();
    
            await  expect(elections.voteCandidate(1, 0))
            .to.be.revertedWithCustomError(elections,"ELECTION_IS_NOT_OPEN()");
            
                });

            });

        it("test that VoteSystem cannot be Cannot accept invalid ID", async () => {

            const {elections, voteTitle, voteDescription} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();

            expect((await elections.getVotingList()).length).to.equal(1);

         
            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            await  expect(elections.voteCandidate(1, 2))
            .to.be.revertedWithCustomError(elections, "INVALID_CANDIDATE_ID()");
        });

        it("test that VoteSystem can not vote user twice", async () => {
            const {elections, voteTitle, voteDescription} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();

            expect((await elections.getVotingList()).length).to.equal(1);

         
            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            await  elections.voteCandidate(1, 1); 

            await  expect(elections.voteCandidate(1, 1))
            .to.be.revertedWithCustomError(elections, "YOU_HAVE_ALREADY_VOTED_IN_THIS_ELECTION()");
        });

        describe("Check Winner", async () => {
        it("test that winner of election can be annouced", async () => {
            const {elections, voteTitle, voteDescription, account1, account2} = await loadFixture(deployElectionApplication);
            const createTx = await elections.createVote(voteTitle, voteDescription);
            await createTx.wait();

            expect((await elections.getVotingList()).length).to.equal(1);

            const candidateTx = await elections.addCandidate(1, "Emmanuel");
            await candidateTx.wait();

            const candidateTx2 = await elections.addCandidate(1, "Segun");
            await candidateTx2.wait();

            const candidateTx3 = await elections.addCandidate(1, "casweneey");
            await candidateTx3.wait();

            await elections.voteCandidate(1, 1);

            await elections.connect(account1).voteCandidate(1,2);

            await elections.connect(account2).voteCandidate(1,2);

            const closeTx = await elections.closeVote(1);
            await closeTx.wait();
    
           const winnerTx =  await elections.calculateWinner(1);
        
           expect(winnerTx).to.equal("Segun");

        });

        });

        
        });





  });