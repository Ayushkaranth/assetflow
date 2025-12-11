import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying Factory to Sepolia with account:", deployer.address);

  const AssetFactory = await hre.ethers.getContractFactory("AssetFactory");
  const factory = await AssetFactory.deploy();

  await factory.waitForDeployment();

  console.log(`Factory deployed to: ${factory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});