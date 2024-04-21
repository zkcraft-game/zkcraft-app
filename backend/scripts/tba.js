const { TokenboundClient } = require("@tokenbound/sdk");
const { ethers } = require("hardhat");
require("dotenv").config();

TOKEN_CONTRACT_ADDRESS = "0xB5f051231832B15002838BB7e11db437771E5e61"; // ZOM
PRIVATE_KEY = process.env.PRIVATE_KEY;
ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const main = async () => {
  const provider = new ethers.providers.AlchemyProvider(
    "calibrationnet",
    ALCHEMY_API_KEY
  );
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);

  const tokenboundClient = new TokenboundClient({ signer, chainId: 5 });

  // Retrieve address of TBA (without creation)
  const tokenBoundAccount = tokenboundClient.getAccount({
    tokenContract: TOKEN_CONTRACT_ADDRESS,
    tokenId: 1,
  });

  console.log(tokenBoundAccount); //0x027EaEa51DD9de494D9A82f3C8a7cB54967dA4D6

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
