//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721_KittyCat is ERC721, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _trackIds;

  IERC20 private _kittyCatToken;

  // Value of track in KTYCAT
  uint256 private constant _trackValue = 0.1 ether;

  struct Track {
    string name;
    string artist;
    string uri;
  }

  // map track ID to track structs
  mapping(uint256 => Track) private _trackMetas;

  // map trackId to original minter
  mapping(uint256 => address) private _trackMinters;

  event MintTrack(uint256 tokenId, string artist, string name, string uri);

  event BuyTrack(uint256 tokenId, address addr, uint256 timestamp);

  constructor() ERC721("KittyCat", "KTYCAT") {}

  function initKtyCat(address erc20Addr) external onlyOwner {
    _kittyCatToken = IERC20(erc20Addr);
  }

  function mintTrack(
    string memory artist,
    string memory name,
    string memory uri
  ) external {
    _trackIds.increment();
    uint256 trackId = _trackIds.current();
    _mint(msg.sender, trackId);
    _setTokenMeta(trackId, artist, name, uri);
    _trackMinters[trackId] = msg.sender;
    emit MintTrack(trackId, artist, name, uri);
  }

  function buyTrack(uint256 trackId) external payable {
    require(msg.value >= _trackValue);
    require(_exists(trackId));
    _kittyCatToken.transferFrom(msg.sender, owner(), _trackValue - 0.05 ether);
    _kittyCatToken.transferFrom(
      msg.sender,
      _trackMinters[trackId],
      _trackValue - 0.05 ether
    );
    _safeTransfer(ownerOf(trackId), msg.sender, trackId, "");
    emit BuyTrack(trackId, msg.sender, block.timestamp);
  }

  function _setTokenMeta(
    uint256 trackId,
    string memory artist,
    string memory name,
    string memory uri
  ) private {
    Track memory track = Track(artist, name, uri);
    _trackMetas[trackId] = track;
  }
}
