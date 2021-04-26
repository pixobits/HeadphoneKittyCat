const BN = require("bn.js");
const { expect, use } = require("chai");
const chaiAsPromised = require("chai-as-promised");

use(require("chai-bn")(BN));
use(chaiAsPromised);

const Erc721 = artifacts.require("ERC721_KittyCat");
const Erc20 = artifacts.require("ERC20_KittyCat");

describe("Erc721", function () {
  let erc721, erc20, accounts, owner, buyer;

  beforeEach(async () => {
    erc721 = await Erc721.new();
    const initialSupply = web3.utils.toWei("10", "ether");
    erc20 = await Erc20.new(initialSupply);
    accounts = await web3.eth.getAccounts();
    owner = accounts[0];
    buyer = accounts[1];
    minter = accounts[2];


    const approveValue = web3.utils.toWei("1", "ether");
    await erc20.transfer(buyer, approveValue);
    await erc20.transfer(minter, approveValue);

    await erc20.approve(erc721.address, approveValue, { from: buyer });
    await erc721.initKtyCat(erc20.address);
  });

  it("@mintTrack", async () => {
    const promise = erc721.mintTrack("kitty", "cat ft(headphones)", "http://none");
    expect(promise).to.not.be.rejectedWith(Error);
  });

  it("@buyTrack", async () => {
    const ownerBalanceStart = await erc20.balanceOf(minter);
    console.log("Start", ownerBalanceStart.toString());

    const value = web3.utils.toWei("0.1", "ether");
    await erc721.mintTrack("kitty", "cat ft(headphones)", "http://none", { from: minter });
    await erc721.buyTrack("1", { from: buyer, value });

    const ownerBalance = await erc20.balanceOf(minter);
    console.log("End", ownerBalance.toString());

    const buyerBalance = await erc20.balanceOf(buyer);
    console.log("End", buyerBalance.toString());
  });
});
