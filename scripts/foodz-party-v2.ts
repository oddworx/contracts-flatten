import { contractAddress } from "./common";
import { FoodzPartyV2__factory } from "./contracts";
import { deployer } from "./deploy";

export const connected = () => {
  return FoodzPartyV2__factory.connect(contractAddress.foodz, deployer);
}