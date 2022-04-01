import { BigNumberish } from "ethers";
import { contractAddress } from "./common";
import { Oddworx__factory } from "./contracts/factories/Oddworx__factory";
import { deployer } from "./deploy";

export const toggleAdmin = async (address: string) => {
  const oddworx = Oddworx__factory.connect(contractAddress.oddworx, deployer);
  await oddworx.toggleAdminContract(address);
};

export const mint = async (to: string, amount: BigNumberish) => {
  const oddworx = Oddworx__factory.connect(contractAddress.oddworx, deployer);
  await oddworx.mint(to, amount);
};