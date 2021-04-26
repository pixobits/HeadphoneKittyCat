import Web3 from "web3/dist/web3.min.js";

import { config } from "../config";
import { derived, writable } from "svelte/store";

export const createStore = () => {
  let erc20;

  const { subscribe, set } = writable({
    connected: false,
    accounts: [],
  });

  const init = () => {
    window.ethereum.autoRefreshOnNetworkChange = false;
  };

  const getErc20 = async () => {
    if (!erc20) {
      erc20 = await new Web3.eth.Contract(config.erc20Abi, config.erc20Addr);
    }
    return erc20;
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

  const updateAccounts = async () => {
    const resp = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    set({ accounts: resp });
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
    window.ethereum.on("accountsChanged", updateAccounts);
    window.ethereum.on("chainChanged", updateAccounts);
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
    getErc20,
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
  if(!$ethStore.instance) return null;
  return new $ethStore.instance.eth.Contract(config.erc20Abi, config.erc20Address);
});

export const chainId = derived(ethStore, ($ethStore) => $ethStore.chainId);

export const web3 = derived(ethStore, ($ethStore) => {
  if (!$ethStore.instance) return { utils: Web3.utils, version: Web3.version };
  return $ethStore.instance;
});

