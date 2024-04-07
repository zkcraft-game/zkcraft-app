const hre = require("hardhat");

async function main() {
	const Contract = await hre.ethers.getContractFactory("Zombok");
	const contract = await Contract.deploy();

	await contract.deployed();

	console.log("Zombok deployed to:", contract.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});