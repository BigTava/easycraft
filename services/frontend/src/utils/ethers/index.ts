const { ethers } = require("ethers");

export const isZeroAddress = (address: String): Boolean => {
  return address === ethers.constants.AddressZero;
};

export const setProvider = async () => {};

export const isConnected = async () => {};

export const disconnectWallet = async () => {};
