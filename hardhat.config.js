// require("@nomicfoundation/hardhat-toolbox");

// /** @type import('hardhat/config').HardhatUserConfig */
// module.exports = {
//   solidity: "0.8.17",
// };

require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");
const { mnemonic } = require('./secrets.json');
require('hardhat-abi-exporter');
console.log(mnemonic)
require('dotenv').config()

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
/*
module.exports = {
  solidity: "0.8.0",
  //optimizer: {enabled: process.env.DEBUG ? false : true},
  settings: {
    //optimizer: {enabled: process.env.DEBUG ? false : true},
  
  
      
    
  
  }


};
*/
module.exports = {
  defaultNetwork: "mainnet",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
   
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
 
 gas: 10000000,   //vesting
     // gas: 1000000,
     gasPrice: 10000000000, //vesting
    
     accounts: ['f7ef7cf04b934ed9b860f9779ec5d36a76afb0ed63d8a432a7e1d48453fed78f']//2

  
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/c3950d5fe0814e3e9bd30ba0fcd21aa2",
      chainId:4,
      // //gasLimit: 85000,
      // gasPrice: 20000000000,
      gas: 2100000,
      gasPrice: 8000000000,
      
     // accounts: ['39e1ef38afe8cb08116cbb3a8c03b8c57c6254ca839a9df9f948babf542cb3c3'],
      accounts: ['f7ef7cf04b934ed9b860f9779ec5d36a76afb0ed63d8a432a7e1d48453fed78f']
      
      //gasLimit:2100000,
      //gasPrice: 2100000
    }
  },
  etherscan: {
    /*
    graph init --contract-name Token \
--index-events \
--product subgraph-studio \
--from-contract 0xA217aCeB90FAbC5A45797989CC40333E3a3f8Cb7  */
    //0xA217aCeB90FAbC5A45797989CC40333E3a3f8Cb7
    //0xA217aCeB90FAbC5A45797989CC40333E3a3f8Cb7
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/npx hardhat  verify --network testnet
  
   apiKey: "A3mfHwyq5rtn8Vm9OO5bD0pxlB6H0bqZ",
   node: 'https://bsc.getblock.io/${network}/?'
  },


  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }
};
