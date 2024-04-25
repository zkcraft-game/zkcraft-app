require('dotenv').config();
const ethers = require('ethers');

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
const contractAddress = '0xe585f7eCA52db1dd9C0ed1D65A7690A944868CC3'

// Create a contract instance
const zkCraft = new ethers.Contract(contractAddress, abi, signer)

// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

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