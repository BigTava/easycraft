import Web3 from "web3";
import { getProvider } from "./provider";

export const getWeb3 = async () => {
  const provider = await getProvider();
  return new Web3(provider);
};
