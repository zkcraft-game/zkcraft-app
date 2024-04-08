const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

TOKEN_CONTRACT_ADDRESS = "0x184f5e01C8aCab8C40fC68a8B4c408b3e2d17bC7"; // TT
PRIVATE_KEY = process.env.PRIVATE_KEY;
ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const main = async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "goerli",
    ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const tokenboundClient = new TokenboundClient({ signer, chainId: 5 });

  // Retrieve address of TBA (without creation)
  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: TOKEN_CONTRACT_ADDRESS,
    tokenId: 1,
  });

  console.log(tokenBoundAccount); //0x148065ae43beC6D4C9aA2a75EC5f282553c5a1c8

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
