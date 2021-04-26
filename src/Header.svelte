<script>
  import { config } from "./config";

  import {
    ethStore,
    erc20,
    selectedAccount,
    web3,
    connected,
  } from "./utils/web3-store";

  const getEtherBalance = async (account) => {
    const balance = await $erc20.methods.balanceOf(account).call();
    return $web3.utils.fromWei(balance, "ether");
  };

  const getEtherAllowance = async (account) => {
    const balance = await $erc20.methods
      .allowance(account, config.erc721Address)
      .call();
    return $web3.utils.fromWei(balance, "ether");
  };

  $: account = $selectedAccount || "0x0000000000000000000000000000000000000000";
  $: balance = $connected ? getEtherBalance(account) : 0;
  $: allowance = $connected ? getEtherAllowance(account) : 0;

  const approve = async (account, amount) => {
    return $erc20.methods
      .approve(config.erc721Address, amount)
      .send({ from: account });
  };

  const handleApprove = async () => {
    const amount = $web3.utils.toWei(await balance, "ether");
    await approve(account, amount);
  };
</script>

<header>
  <p>
    KTYCAT ERC721 contract: <span class="code">{config.erc721Address}</span>
  </p>
  <p>KTYCAT ERC20 contract: <span class="code">{config.erc20Address}</span></p>
  <p>Connected Account: <span class="code">{account}</span></p>
  <p>
    Account Balance (KTYCAT): <span class="code"
      >{#await balance then value}{value}{/await}</span
    >
  </p>
  <p>
    Allowance (KTYCAT): <span class="code"
      >{#await allowance then value}{value}{/await}</span
    >
  </p>
  {#await allowance then value}
    {#if value <= 0}
      <p>To spend your KTYCAT you need to approve KTYCAT_ERC721 as a spender</p>
      <button on:click={handleApprove}>Approve</button>
    {/if}
  {/await}
  <p>
    <a href="https://cheapswap.io/" target="_blank"
      >Get KTYCAT tokens from cheapswap.io</a
    >
  </p>
</header>
