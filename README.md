# Headphone Kitty Cat

Dapp for sharing music as NFTs

ERC20 token $kittycat used to purchase access to tracks

ERC721 NFT used to represent a single track. when a single track is puchased the original minter is paid their royalties. The purchaser is then able to listen to the track. we can probably have a mapping something like `mapping(address => mapping(uint256 => uint256))` mapping the address of a purchaser to token ID to timestamp of purchase.


<img width="600" alt="headphone-kitty-cat" src="https://user-images.githubusercontent.com/23342939/116082263-1c4ace80-a693-11eb-9205-5341713770b4.png">
