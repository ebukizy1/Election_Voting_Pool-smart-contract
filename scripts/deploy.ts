import { ethers } from "hardhat";

async function main() {



  const FactoryContract = await ethers.deployContract("FactoryVotingSystem");
  await FactoryContract.waitForDeployment();


  console.log(`Factory address of the contract ${FactoryContract.target}`);
  }

  // 0x727308D8AB066f2480ba3F13F453762A12561c07

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
