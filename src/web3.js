import Web3 from "web3";

import { config } from "./config";

export const web3 = new Web3(window.ethereum || config.networkRpcUrl);
window.ethereum.enable();

export const nftContract = new web3.eth.Contract(
  config.nftContractAbi,
  config.nftContractAddress
);

export const getAccount = () => {
  return new Promise((res, rej) => {
    web3.eth.getAccounts((error, accounts) => {
      if (error) {
        rej(error);
      }
      res(accounts[0]);
    });
  });
}

// mintTrack(string memory artist, string memory name, string memory uri)
export const mintTrack = async (artist, name, uri) => {
  const account = await getAccount();
  return nftContract.methods.mintTrack(artist, name, uri).send({ from: account });
} 

// buyTrack(uint256 trackId)
export const buyTrack = async (trackId) => {
  const account = await getAccount();
  return nftContract.methods.buyTrack(trackId).send({ from: account, value: config.trackValue });
}