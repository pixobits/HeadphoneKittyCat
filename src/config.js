import abi from "./nftContractAbi";

const ceth = {
  networkId: 777,
  networkRpcUrl: "https://node.cheapeth.org/rpc",
  networkName: "cheapeth",
};

const hardhat = {
  networkId: 1337,
  networkRpcUrl: "http://127.0.0.1:8545",
  networkName: "hardhat",
};

const networkConfig = ceth;

export const config = {
	nftContractAddress: "0x5BbaA357B96F10b924A40a3A5a5A7E098a3648e8",
	nftContractAbi: abi,
	trackValue: "100000000000000000", // 0.1 ether
	...networkConfig
}