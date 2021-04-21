require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-truffle5");

const fs = require("fs");
const home = require("os").homedir();
const keyfile = require("path").join(home, ".cheapethkey");
const cheapKey = fs.readFileSync(keyfile, { encoding: "utf8" });

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.0",
	settings: {
		optimizer: {
			enabled: true,
			runs: 1000
		}
	},
	contractSizer: {
		alphaSort: true,
		runOnCompile: true,
		disambiguatePaths: true,
	},
	gasReporter: {
		currency: "GBP",
		coinmarketcap: "4026ff1b-9b45-44e4-bd64-c734f65de978",
		gasPrice: 100,
	},
	networks: {
		cheapeth: {
	      url: "https://node.cheapeth.org/rpc",
	      accounts: [cheapKey],
	    },
		hardhat: {
			chainId: 1337,
		}
	}
};
