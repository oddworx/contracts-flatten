import { wallets } from "./scripts/wallets";
import { deployAll } from "./scripts/deploy";
import * as Genzee from "./scripts/genzee";

const main = async () => {
  await deployAll();
  await Genzee.startSale();
  await Genzee.mint(wallets[1], 20);
};

main();
