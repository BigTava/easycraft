export enum Networks {
  Hardhat = "Hardhat",
  Sepolia = "Ethereum (Sepolia)",
  Goerli = "Ethereum (Goerli)",
  Polygon = "Polygon (Mumbai)",
  Optimism = "Optimism (Goerli)",
}

export enum SupportedChainId {
  SEPOLIA = 11155111,
  HARDHAT = 31337,
}

export const CHAIN_IDS_TO_NETWORKS = {
  [SupportedChainId.SEPOLIA]: Networks.Sepolia,
  [SupportedChainId.HARDHAT]: Networks.Hardhat,
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}
