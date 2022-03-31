import { goldenPassMerkleTree } from "./common";
import { GoldenPass__factory } from "./contracts";
import { Genzee__factory } from "./contracts/factories/Genzee__factory";
import { OddworxStaking__factory } from "./contracts/factories/OddworxStaking__factory";
import { Oddworx__factory } from "./contracts/factories/Oddworx__factory";
import { wallets } from "./wallets";

export const deployer = wallets[0]

export const deployGenzee = async () => {
  const factory = new Genzee__factory(deployer);
  const tx = await factory.deploy(
    await deployer.getAddress(),
    await deployer.getAddress()
  );
  await tx.deployed();
  return tx.address;
};

export const deployOddworx = async (genzee: string) => {
  const factory = new Oddworx__factory(deployer);
  const tx = await factory.deploy(genzee);
  await tx.deployed();
  return tx.address;
};

export const deployOddworxStaking = async (oddworx: string) => {
  const factory = new OddworxStaking__factory(deployer);
  const tx = await factory.deploy(oddworx);
  await tx.deployed();
  return tx.address;
};

export const deployGoldenPass = async (staking: string, genzee: string) => {
  const merkleRoot = goldenPassMerkleTree().getHexRoot();
  const uri = "golden://";
  const factory = new GoldenPass__factory(deployer);
  const tx = await factory.deploy(staking, genzee, uri, merkleRoot);
  await tx.deployed();
  return tx.address;
};

export const deployAll = async () => {
  const genzee = await deployGenzee();
  console.log("Genzee deployed at", genzee);
  const oddworx = await deployOddworx(genzee);
  console.log("Oddworx deployed at", oddworx);
  const staking = await deployOddworxStaking(oddworx);
  console.log("OddworxStaking deployed at", staking);
  const golden = await deployGoldenPass(staking, genzee);
  console.log("GoldenPass deployed at", golden);
};