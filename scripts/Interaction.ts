import { ethers } from "hardhat";

async function main() {


    const FactoryAddress = "0x727308D8AB066f2480ba3F13F453762A12561c07";

    const factoryContract = await ethers.getContractAt("IVotingSystem", FactoryAddress);
    
    const createVoteSystemTx = await factoryContract.createVoteSystem();
    await createVoteSystemTx.wait();



    const addressListTx = await factoryContract.getVoteList();
    console.log(addressListTx)
  


//   console.log(`Factory address of the contract ${addressListTx}`);
  }

  //0x615f6C02Ed70e850Ccf515aA4a3dBc4000b9032B
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
