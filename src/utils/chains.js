export default [
	{
		"name": "Ethereum Mainnet",
		"chainId": 1,
		"shortName": "eth",
		"chain": "ETH",
		"network": "mainnet",
		"networkId": 1,
		"nativeCurrency": {"name":"Ether","symbol":"ETH","decimals":18},
		"rpc": ["https://mainnet.infura.io/v3/${INFURA_API_KEY}","https://api.mycryptoapi.com/eth"],
		"faucets": [],
		"infoURL": "https://ethereum.org"
	},
	{
		"name": "Cheapeth Mainnet",
		"chainId": 1,
		"shortName": "ceth",
		"chain": "CETH",
		"network": "mainnet",
		"networkId": 777,
		"nativeCurrency": {"name":"Ether","symbol":"ETH","decimals":18},
		"rpc": ["https://node.cheapeth.org/rpc"],
		"faucets": [],
		"infoURL": "https://cheapeth.org"
	}
];