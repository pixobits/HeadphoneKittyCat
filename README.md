# Headphone Kitty Cat

### Dapp for sharing music tracks as NFTs

This is just a proof of concept to play around with "what else can we do with NFTs".
This idea would solve transparency issues in the music industry regarding royalties.

The basic idea is that each track is an NFT we store the original minter of the NFT in a
mapping. Then each time somebody purchases the NFT royalties are paid to the original minter
in this case the artist. We can track what addresses have purchased the NFT and only those
addresses will be able to listen to the track.

A centralised platform would still handle validating that an address has purchased the track
and delivering the track associated with the NFT to the client so we can maintain the security
of the stream as we do with traditional platforms. You could also associate a timeout with each
NFT purchase to emulate a monthly subscription for example.

For the purpose of this proof of concept the validation that a track (NFT) has been purchased
Is done in the client. In reality you would want to sync your own node and do the validation on
the server. You would also probably want to get the address to sign a random string each time
they want to listen to a track.

There are two contracts:

- ERC20 token $KTYCAT used to purchase access to tracks
- ERC721 NFT used to represent a single track.

Both these contracts are deployed on the cheapeth network
- erc20: `0x73b1736107bC2Bf1eD9EE10397a6c19321A011c8`
- erc721: `0x5E6b712dEb7605fD0C40B9e1abb4EE1ba5d514E1`

The site is built and deployed to: [gerald.host/ktycat](https://gerald.host/ktycat)

Make sure you meta mask is connected to cheapeth: [view wallet setup](https://cheapeth.org/metamask.html)

You can get KTYCAT from cheapswap [here](https://cheapswap.io/#/swap/0x73b1736107bC2Bf1eD9EE10397a6c19321A011c8)

<img width="600" alt="headphone-kitty-cat" src="https://user-images.githubusercontent.com/23342939/116082263-1c4ace80-a693-11eb-9205-5341713770b4.png">

## Get it running

run frontend

```
$ npm run dev
```

compile contracts

```
$ npx hardhat compile
```

deploy contracts

```
$ npx hardhat run scripts/erc20-kitty-cat.js
```

Once the erc20 contract is deployed grab the address and update the `scripts/erc721-kitty-cat.js` file. Then you can deploy that one too.

```
$ npx hardhat run scripts/erc721-kitty-cat.js
```
