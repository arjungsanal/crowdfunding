require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork:'sepolia',
  networks: {
    hardhat:{},
    sepolia: {
      url: 'https://ethereum-sepolia-rpc.publicnode.com',
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
  settings:{
    optimizer :{
      enabled:true,
      runs:200,
    },
  },
};