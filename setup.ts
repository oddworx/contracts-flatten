import { wallets } from "./scripts/wallets";
import { deployAll } from "./scripts/deploy";
import * as Genzee from "./scripts/genzee";
import * as Oddworx from "./scripts/oddworx"
import { contractAddress } from "./scripts/common";
import { parseEther } from "ethers/lib/utils";

const main = async () => {
  await deployAll();
  
  await Genzee.startSale();
  await Genzee.mint(wallets[1], 20);

  await Oddworx.toggleAdmin(contractAddress.staking);
  await Oddworx.mint(wallets[1].address, parseEther("900"))

};

main();
