import { Wallet } from "ethers";
import { contractAddress } from "./common";
import { FoodzParty__factory } from "./contracts";
import { deployer } from "./deploy";

export const setIsPresaleActive = async (isPresaleActive: boolean) => {
  const foodz = FoodzParty__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsSaleActive(isPresaleActive);
};

export const setIsSaleActive = async (isSaleActive: boolean) => {
  const foodz = FoodzParty__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsSaleActive(isSaleActive);
};

export const setIsPassSaleActive = async (isPassSaleActive: boolean) => {
  const foodz = FoodzParty__factory.connect(contractAddress.foodz, deployer);
  await foodz.setIsPassSaleActive(isPassSaleActive);
};

export const mintSingle = (caller: Wallet) => {
  const foodz = FoodzParty__factory.connect(contractAddress.foodz, caller);
  const value = foodz.SALE_SINGLE_PRICE();
  return async () => {
    await foodz.mintSingle({ value });
  };
};

export const mintTriple = (caller: Wallet) => {
  const foodz = FoodzParty__factory.connect(contractAddress.foodz, caller);
  const value = foodz.SALE_TRIPLE_PRICE();
  return async () => {
    await foodz.mintTriple({ value });
  };
};
