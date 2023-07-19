import { EthNetworkConfiguration, Magic } from "magic-sdk";
import { Networks } from "utils/networks";

const formattedNetwork = (): EthNetworkConfiguration => {
  const network = localStorage.getItem("network");
  switch (network) {
    case Networks.Polygon:
      return {
        rpcUrl: process.env.REACT_APP_POLYGON_RPC_URL as string,
        chainId: 80001,
      };
    default:
      return {
        rpcUrl: process.env.REACT_APP_SEPOLIA_RPC_URL as string,
        chainId: 11155111,
      };
  }
};

export const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY as string, {
  network: formattedNetwork(),
});
