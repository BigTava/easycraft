export enum Networks {
  Hardhat = "Hardhat",
  Sepolia = "Ethereum (Sepolia)",
  Goerli = "Ethereum (Goerli)",
  Polygon = "Polygon (Mumbai)",
  Optimism = "Optimism (Goerli)",
  Gnosis = "Gnosis",
}

export enum SupportedChainId {
  CHIADO = 10200,
}

export const CHAIN_IDS_TO_NETWORKS = {
  [SupportedChainId.CHIADO]: Networks.Gnosis,
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];

export function isSupportedChain(
  chainId: number | null | undefined
): chainId is SupportedChainId {
  return !!chainId && !!SupportedChainId[chainId];
}
