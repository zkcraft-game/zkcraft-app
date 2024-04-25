const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

TOKEN_CONTRACT_ADDRESS = "0xe585f7eCA52db1dd9C0ed1D65A7690A944868CC3"; // ZKT
PRIVATE_KEY = process.env.PRIVATE_KEY;
ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const main = async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "Arbitrum",
    ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const tokenboundClient = new TokenboundClient({ signer, chainId: 421614 });

  // Retrieve address of TBA (without creation)
  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: TOKEN_CONTRACT_ADDRESS,
    tokenId: 1,
  });

  console.log(tokenBoundAccount); //0xe585f7eCA52db1dd9C0ed1D65A7690A944868CC3

  try {
    const createAccount = await tokenboundClient.createAccount({
      tokenContract: TOKEN_CONTRACT_ADDRESS,
      tokenId: 1,
    });

    console.log(createAccount);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  const executedCall = await tokenboundClient.executeCall({
    account: "<account_address>",
    to: "<recipient_address>",
    value: "<wei_value>",
    data: "<data>",
  });

  console.log(executedCall); //...
};

main();
