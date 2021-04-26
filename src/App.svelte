<script>
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Tracks from "./Tracks.svelte";

  import { ethStore } from './utils/web3-store';

  const enable = () => ethStore.setProvider("https://node.cheapeth.org/rpc")
  const enableBrowser = () => ethStore.setBrowserProvider()

  onMount(async () => {
    await enable();
    await enableBrowser();
  });

</script>

<main>
  <h1>😻 Headphone Kitty Cat</h1>
  <Header />
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

  .text-center {
    text-align: center;
  }

  :global(.code) {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.05);
    color: rgba(0, 0, 0, 0.5);
    padding: 8px;
    font-family: monospace;
  }
</style>
