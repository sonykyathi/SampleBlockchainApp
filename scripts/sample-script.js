// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const BigNumber = require('bignumber.js');
const web3 = require('web3');
const { ethers } = require("hardhat");
const { Contract } = require("ethers");

 async function main() {

  var now = new Date();
 
  
   const [deployer] = await ethers.getSigners();
 
   const Arts = await ethers.getContractFactory("ArtManagement")

//    const init = await Arts.deploy()
//     console.log(init)

  const contract = await Arts.attach(
      "0x04FAE71215cE6D825542b9A847218CC5008d2aaa" // The deployed contract address
   );
    //     const minwei = ethers.utils.parseUnits("100","ether")
    //    console.log(minwei);

 const reg = await contract.addArt('Hector',30,'Bactrian',true);
  console.log(reg,"adress changed ");


  const tx = await reg.wait()
  for(const event of tx.events){
   console.log(`Event ${event.event} with args ${event.args}`);
  }
    console.log(reg,'this is the true ')
 
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
