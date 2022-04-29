import { wallets } from "./scripts/wallets";
import { deployAll } from "./scripts/deploy";
import * as Genzee from "./scripts/genzee";
import * as Oddworx from "./scripts/oddworx";
import * as OddworxStaking from "./scripts/oddworx-staking";
import * as GoldenPass from "./scripts/golden-pass";
import * as FoodzParty from "./scripts/foodz-party";
import * as FoodzPartyV2 from "./scripts/foodz-party-v2";
import { contractAddress } from "./scripts/common";
import { parseEther } from "ethers/lib/utils";

const main = async () => {
  await deployAll();

  await Genzee.startSale();
  await Genzee.mint(wallets[1])(20);
  await Genzee.setApproveForAll(wallets[1])(contractAddress.staking);

  await Oddworx.toggleAdmin(contractAddress.staking);
  await Oddworx.mint(wallets[1].address, parseEther("900"));

  await OddworxStaking.setupGenzees();
  await OddworxStaking.toggleGoldenPass();
  await OddworxStaking.stakeGenzees(wallets[1])(["1", "2", "3"]);

  await GoldenPass.setFoodzPartyAsController();
  await GoldenPass.setIsSaleActive(true);
  await GoldenPass.mint(wallets[1])(1, []);

  await FoodzParty.setIsSaleActive(true);
  await FoodzParty.setIsPresaleActive(true);

  const foodzPartyV2 = FoodzPartyV2.connected()
  foodzPartyV2.setIsMigrationActive(true)
  foodzPartyV2.setIsSaleActive(true)
  foodzPartyV2.setIsPassSaleActive(true)
};

main();
