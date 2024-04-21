require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY
module.exports = {
	solidity: {
		version: "0.8.9",
		settings: {
			optimizer: {
				enabled: true,
				runs: 1000,
				details: { yul: false },
			}
		}
	},
	allowUnlimitedContractSize: true,
	defaultNetwork: "calibrationnet",
	networks: {
		hardhat: {},
		ETH_MAINNET: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		ETH_SEPOLIA: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		calibrationnet: {
            chainId: 314159,
            url: "https://api.calibration.node.glif.io/rpc/v1",
            accounts: [`${process.env.PRIVATE_KEY}`],
        },
		ETH_GOERLI: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		}
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	},
};