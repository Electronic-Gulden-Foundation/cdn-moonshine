// https://en.bitcoin.it/wiki/List_of_address_prefixes
const networks = {
	canadaecoin: {
		messagePrefix: '\x19Canada eCoin Signed Message:\n',
		bech32: 'cdn',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x1c,
		scriptHash: 0x05,
		wif: 0x9C
	},
	auroracoin: {
		messagePrefix: "\x1bAuroracoin Signed Message:\n",
		bech32: 'aur',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x17,
		scriptHash: 0x5,
		wif: 0xb0
	},
	bitcoin: {
		messagePrefix: '\x18Bitcoin Signed Message:\n',
		bech32: 'bc',
		bip32: {
			public: 0x0488b21e,
			private: 0x0488ade4
		},
		pubKeyHash: 0x00,
		scriptHash: 0x05,
		wif: 0x80
	},
	litecoin: {
		messagePrefix: '\x19Litecoin Signed Message:\n',
		bech32: 'ltc',
		bip32: {
			public: 0x019da462,
			private: 0x019d9cfe
		},
		pubKeyHash: 0x30,
		scriptHash: 0x32,
		wif: 0xb0
	}
};

//Max amount of BTC/LTC.
const maxCoins = {
	canadaecoin: 11250000000000000,
	bitcoin: 2100000000000000,
	litecoin: 8400000000000000,
	auroracoin: 2331805500000000,
};

//Returns an array of all available coins from the networks object.
const availableCoins = Object.keys(networks).map(coin => coin);

const supportsRbf = {
	bitcoin: true,
	litecoin: false,
	canadaecoin: false,
	auroracoin: true
};

const zeroValueItems = {
	bitcoin: 0,
	litecoin: 0,
	canadaecoin: 0,
	auroracoin: 0,
	timestamp: null
};

const arrayTypeItems = {
	bitcoin: [],
	litecoin: [],
	canadaecoin: [],
	auroracoin: [],
	timestamp: null
};

const objectTypeItems = {
	bitcoin: {},
	litecoin: {},
	canadaecoin: {},
	auroracoin: {},
	timestamp: null
};

const defaultWalletShape = {
	id: "",
	name: "",
	type: "default",
	addresses: arrayTypeItems,
	addressIndex: zeroValueItems,
	changeAddresses: arrayTypeItems,
	changeAddressIndex: zeroValueItems,
	utxos: arrayTypeItems,
	transactions: arrayTypeItems,
	blacklistedUtxos: arrayTypeItems,
	confirmedBalance: zeroValueItems,
	unconfirmedBalance: zeroValueItems,
	lastUpdated: zeroValueItems,
	hasBackedUpWallet: false,
	walletBackupTimestamp: "",
	keyDerivationPath: {
		bitcoin: "84",
		bitcoinTestnet: "84",
		litecoin: "44",
		litecoinTestnet: "44",
		canadaecoin: "44",
		auroracoin: "44"
	},
	coinTypePath: {
		bitcoin: "0",
		bitcoinTestnet: "1",
		litecoin: "2",
		litecoinTestnet: "1",
		canadaecoin: "34",
		auroracoin: "85"
	},
	addressType: { //Accepts bech32, segwit, legacy
		bitcoin: "bech32",
		bitcoinTestnet: "bech32",
		litecoin: "legacy",
		litecoinTestnet: "legacy",
		canadaecoin: "legacy",
		auroracoin: "legacy"
	},
	rbfData: objectTypeItems
};

const getCoinImage = (coin = "bitcoin") => {
	try {
		coin = coin.toLowerCase();
		coin = coin.replace("testnet", "");

		switch (coin) {
			case "bitcoin":
				return require(`../assets/ecoins/bitcoin.png`);
			case "litecoin":
				return require(`../assets/ecoins/litecoin.png`);
			case "canadaecoin":
				return require(`../assets/canadaecoin.png`);	
			case "auroracoin":
				return require(`../assets/ecoins/auroracoin.png`);		
			default:
				return require(`../assets/ecoins/canadaecoin.png`);
		}
	} catch (e) {
		return require(`../assets/canadaecoin.png`);
	}
};

const getCoinData = ({ selectedCrypto = "canadaecoin", cryptoUnit = "CDN" }) => {
	try {
		let acronym = "CDN";
		let satoshi = "bit";
		let oshi = "bits";
		let blockTime = 5; //min
		switch (selectedCrypto) {
			case "bitcoin":
				satoshi = "satoshi";
				acronym = cryptoUnit === "satoshi" ? "sats" : "BTC";
				oshi = "sats";
				blockTime = 10;
				color = "#f7931a";
				return { acronym, label: "Bitcoin", crypto: "BTC", satoshi, oshi, blockTime, color };
			case "litecoin":
				satoshi = "litoshi";
				oshi = "lits";
				acronym = cryptoUnit === "satoshi" ? "lits" : "LTC";
				blockTime = 2.5;
				color = "#444444";
				return { acronym, label: "Litecoin", crypto: "LTC", satoshi, oshi, blockTime, color };
			case "canadaecoin":
				return { 
					acronym: cryptoUnit === "satoshi" ? "bits" : "CDN", 
					label: "Canada eCoin", 
					crypto: "CDN", 
					satoshi: "bit", 
					oshi: "bits", 
					blockTime: 5,
					color: "#90191c"
				};				
			case "auroracoin":
				satoshi = "satoshi";
				oshi = "sats";
				acronym = cryptoUnit === "satoshi" ? "sats" : "AUR";
				blockTime = 300;
				color = "#0A6C5E";
				return { acronym, label: "Auroracoin", crypto: "AUR", satoshi, oshi, blockTime, color };
			default:
				acronym = cryptoUnit === "satoshi" ? "bits" : "BTC";
				return { acronym, label: "Canada eCoin", crypto: "CDN", satoshi, oshi, blockTime };
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	networks,
	availableCoins,
	defaultWalletShape,
	maxCoins,
	supportsRbf,
	zeroValueItems,
	arrayTypeItems,
	getCoinImage,
	getCoinData
};
