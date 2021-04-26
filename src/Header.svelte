<script>
  import { config } from "./config";

  import { ethStore, erc20, selectedAccount, web3, connected } from "./utils/web3-store";

  const getEtherBalance = async (account) => {
    const balance = await $erc20.methods.balanceOf(account).call();
    return $web3.utils.fromWei(balance, "ether");
  };

  $: account = $selectedAccount || "0x0000000000000000000000000000000000000000";
  $: balance = $connected ? getEtherBalance(account) : 0;
</script>

<header>
  <p>KTYCAT ERC721 contract: <span class="code">{config.erc721Address}</span></p>
  <p>KTYCAT ERC20 contract: <span class="code">{config.erc20Address}</span></p>
  <p>Connected Account: <span class="code">{account}</span></p>
  <p>
    Account Balance (KTYCAT): <span class="code"
      >{#await balance then value}{value}{/await}</span
    >
  </p>
  <p><u>Get KTYCAT tokens from cheapswap.io</u></p>
</header>
