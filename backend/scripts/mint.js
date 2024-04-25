// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

TOKEN_CONTRACT_ADDRESS = "0xe585f7eCA52db1dd9C0ed1D65A7690A944868CC3"; // ZKT
PRIVATE_KEY = process.env.PRIVATE_KEY;
ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

async function main() {
    
    const provider = new ethers.providers.AlchemyProvider(
        "arbitrumsepolia",
        ALCHEMY_API_KEY
      );
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const tokenboundClient = new TokenboundClient({ signer, chainId: 5 });

    const tokenId = 1; // this is a sample value, use proper ID for production
    const [owner] = await ethers.getSigners();
    const zkCraft = await ethers.getContractAt('zkCraft', zkCraftAddress);
    let tx = await zkCraft.safeMint(owner.address, tokenId);
    await tx.wait(3);

    console.log(
        `zkCraft NFT with tokenId ${tokenId} has been minted to ${await zkCraft.ownerOf(tokenId)}` 
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});