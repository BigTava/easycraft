import { contractAddresses } from "./addresses";

export const assets = [
  { value: "ECO", label: "ECO Mock" },
  { value: "DAI", label: "DAI Mock" },
  { value: "WETH", label: "WETH Mock" },
  { value: "USDC", label: "USDC Mock" },
];

export const assetToAddress = (chainId: string) => ({
  ECO: contractAddresses[chainId]["erc20Mock"],
  WETH: contractAddresses[chainId]["weth"],
});

export const getAddressFromAsset = (asset: string, chainId: string) =>
  assetToAddress(chainId)[asset];
