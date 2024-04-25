const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("hardhat");
require('dotenv').config();

// Get Alchemy App URL
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('arbitrumsepolia', ALCHEMY_API_KEY)

// Get contract ABI file
const contract = require("../artifacts/contracts/zkCraft.sol/zkCraft.json");

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x6eFD4987B586F4Af5C129fB7499b611CE754e56f'

// Create a contract instance
const zkCraft = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://plum-judicial-wildcat-910.mypinata.cloud/ipfs/QmQrMmA8kimmd8k6kugHK6JmQiakGLkgt7b9QjMGWR56CB?pinataGatewayToken=oScTOisOqAbJm1UnE7BEYIt65fdUFZXDXcw0xan3VBA6ahctwvTiUSkWFejhjpOe"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await zkCraft.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });