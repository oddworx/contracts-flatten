import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { OddworxStaking__factory } from "./contracts/factories/OddworxStaking__factory";
import { deployer } from "./deploy";

export const setupGenzees = async () => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    deployer
  );
  await oddworx.toggleNftInterface(contractAddress.genzee);
};

export const toggleGoldenPass = async () => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    deployer
  );
  await oddworx.toggleAdmin(contractAddress.golden);
};

export const stakeGenzees = async (owner: Wallet, ids: string[]) => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    owner
  );
  await oddworx.stakeNfts(contractAddress.genzee, ids);
};

export const unstakeGenzees = async (owner: Wallet, ids: string[]) => {
  const oddworx = OddworxStaking__factory.connect(
    contractAddress.staking,
    owner
  );
  await oddworx.unstakeNfts(contractAddress.genzee, ids);
};
