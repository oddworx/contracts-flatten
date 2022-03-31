import { ethers, Wallet } from "ethers";
import MerkleTree from "merkletreejs";
import { GoldenPass__factory } from "./contracts";
import { Genzee__factory } from "./contracts/factories/Genzee__factory";
import { OddworxStaking__factory } from "./contracts/factories/OddworxStaking__factory";
import { Oddworx__factory } from "./contracts/factories/Oddworx__factory";
import { wallets } from "./wallets";

// Addresses if we use the `deployAll` function
// they should always be the same
export const contractAddress = {
  genzee: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  oddworx: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
  staking: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  golden: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
}

export const provider = new ethers.providers.StaticJsonRpcProvider(
  "http://localhost:8545"
);
export const deployer = new Wallet(wallets[0].privateKey, provider);

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

const getMerkleRoot = () => {
  const keccak256 = ethers.utils.keccak256;
  const toUtf8Bytes = ethers.utils.toUtf8Bytes;

  const leavesUnhashed = wallets.slice(5).map(({ address }) => {
    return `${address.toLowerCase()}:10`;
  });

  const leaves = leavesUnhashed.map((x) => keccak256(toUtf8Bytes(x)));
  const tree = new MerkleTree(leaves, keccak256, {
    sortLeaves: true,
    sortPairs: true,
    hashLeaves: false,
  });
  const root = tree.getHexRoot();
  return root;
};

export const deployGoldenPass = async (staking: string, genzee: string) => {
  // TODO: Merkle root with wallets
  const merkleRoot = getMerkleRoot();
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
