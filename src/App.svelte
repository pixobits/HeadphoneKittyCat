<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Tracks from "./Tracks.svelte";
  import Player from "./Player.svelte";

  import { ethStore, chainId } from "./utils/web3-store";
  $: console.log($chainId);

  const enable = () => ethStore.setProvider("https://node.cheapeth.org/rpc");
  const enableBrowser = () => ethStore.setBrowserProvider();

  onMount(async () => {
    await enable();
    await enableBrowser();
  });
</script>

<main>
  {#if $chainId !== 777}
    <p class="notice">Make sure you are connected to the cheapeth network</p>
  {/if}
  {#if !window.ethereum}
    <p class="notice">Make sure you have meta mask installed</p>
  {/if}
  <h1><img class="logo" src="/logo.png" />Headphone Kitty Cat</h1>
  <p>
    <a href="https://github.com/GeraldHost/HeadphoneKittyCat" target="_blank"
      >What is this? Read the README.md</a
    >
  </p>
  <Header />
  <h2>Now Playing</h2>
  <Player />
  <h2>Tracks</h2>
  <Tracks />
</main>

<style>
  main {
    padding: 1em;
    max-width: 640px;
    margin: 0 auto;
  }

  h1,
  h2 {
    color: #ff3e00;
    text-transform: uppercase;
    font-weight: 100;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2em;
  }

  .logo {
    display: inline-block;
    width: 50px;
    vertical-align: middle;
    margin-right: 15px;
  }

  :global(.code) {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.5);
    padding: 8px;
    font-family: monospace;
  }

  .notice {
    background: #ffcc4c;
    border-radius: 4px;
    color: black;
    padding: 10px;
  }
</style>
