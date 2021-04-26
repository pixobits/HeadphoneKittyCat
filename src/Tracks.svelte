<script>
  import { playing } from "./utils/player-store.js";
  import { web3, connected, selectedAccount, erc721 } from "./utils/web3-store";

  // You would obviously do this on the server and likely want to connect to
  // your own node rather than relying on some other node to be honest.
  // For this POC we can just do this in the client but essentially to see if
  // somebody has payed for a track (NFT) you would just look through the event
  // history for that contract.
  const getPastBuyTrack = async () => {
    const resp = await $erc721.getPastEvents("BuyTrack", {
      fromBlock: 12240000,
      toBlock: "latest",
    });
    return resp.filter(
      (payment) =>
        payment.returnValues.addr.toLowerCase() === account.toLowerCase()
    );
  };

  const getTracks = async () => {
    const resp = await $erc721.getPastEvents("MintTrack", {
      fromBlock: 12240000,
      toBlock: "latest",
    });
    return resp.map((track) => ({
      ...track.returnValues,
    }));
  };

  $: account = $selectedAccount || "0x0000000000000000000000000000000000000000";
  $: bought = $selectedAccount ? getPastBuyTrack() : Promise.resolve([]);
  $: tracks = $connected ? getTracks() : Promise.resolve([]);

  const handleBuyTrack = (trackId) => () => {
    trackId = trackId.toString();
    const value = $web3.utils.toWei("0.1", "ether");
    $erc721.methods.buyTrack(trackId).send({ from: account, value });
  };

  const handlePlayTrack = (track) => () => {
    playing.set(track);
  };

  //const handleMintTrack = () => {
  //  $erc721.methods
  //    .mintTrack("Kitty", "Kitty Cat ft(headphones)", "http://fake-streaming")
  //    .send({ from: account });
  //};
</script>

{#await bought then bought}
  {#await tracks then tracks}
    {#each tracks as track, i}
      <div class="track">
        <p class="number">{track.tokenId}</p>
        <div class="content">
          <p class="name">{track.name}</p>
          <p class="artist">{track.artist}</p>
        </div>
        <div class="btn">
          {#if bought.find((item) => item.returnValues.tokenId === track.tokenId)}
            <u on:click={handlePlayTrack(track)}>Play</u>
          {:else}
            <u on:click={handleBuyTrack(track.tokenId)}>Buy</u>
          {/if}
        </div>
      </div>
    {/each}
  {/await}
{/await}

<style>
  .track {
    display: flex;
    flex-direction: row;
    padding: 10px;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.05);
    margin-bottom: 10px;
    border-radius: 8px;
    align-items: center;
  }

  .number {
    flex-grow: 0;
    padding: 10px;
    border-radius: 100%;
    margin-left: 10px;
    height: 0;
    width: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
  }

  .content {
    flex-grow: 1;
    margin-left: 20px;
  }

  .name {
    color: rgba(0, 0, 0, 0.9);
    font-size: 18px;
    margin: 0 0 5px 0;
    padding: 0;
  }

  .artist {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    margin: 0;
    padding: 0;
  }

  .btn {
    padding: 8px;
    margin-right: 10px;
    cursor: pointer;
  }
</style>
