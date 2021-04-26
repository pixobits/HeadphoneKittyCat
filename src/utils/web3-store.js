import Web3 from "web3/dist/web3.min.js";

import { config } from "../config";
import { derived, writable } from "svelte/store";

export const createStore = () => {
  const { subscribe, set } = writable({
    connected: false,
    accounts: [],
  });

  const init = () => {
    window.ethereum.autoRefreshOnNetworkChange = false;
  };

  const setProvider = async (provider) => {
    init();
    const instance = new Web3(provider);
    const chainId = await instance.eth.getChainId();
    set({
      provider,
      providerType: "String",
      connected: true,
      chainId,
      accounts: [null],
      instance,
    });
  };

  const setBrowserProvider = async () => {
    if (!window.ethereum) {
      throw new Error(
        "Please autorized browser extension (Metamask or similar)"
      );
    }
    const res = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    window.ethereum.on("accountsChanged", setBrowserProvider);
    window.ethereum.on("chainChanged", setBrowserProvider);
    set({
      provider: window.ethereum,
      providerType: "Browser",
      connected: true,
      chainId: window.ethereum.chainId,
      accounts: res,
      instance: new Web3(window.ethereum),
    });
  };

  return {
    setBrowserProvider,
    setProvider,
    subscribe,
  };
};

export const ethStore = createStore();

export const selectedAccount = derived(ethStore, ($ethStore) =>
  $ethStore.accounts.length ? $ethStore.accounts[0] : null
);

export const connected = derived(ethStore, ($ethStore) => $ethStore.connected);

export const erc20 = derived(ethStore, ($ethStore) => {
  if (!$ethStore.instance) return null;
  return new $ethStore.instance.eth.Contract(
    config.erc20Abi,
    config.erc20Address
  );
});

export const erc721 = derived(ethStore, ($ethStore) => {
  if (!$ethStore.instance) return null;
  return new $ethStore.instance.eth.Contract(
    config.erc721Abi,
    config.erc721Address
  );
});

export const chainId = derived(ethStore, ($ethStore) => $ethStore.chainId);

export const web3 = derived(ethStore, ($ethStore) => {
  if (!$ethStore.instance) return { utils: Web3.utils, version: Web3.version };
  return $ethStore.instance;
});
