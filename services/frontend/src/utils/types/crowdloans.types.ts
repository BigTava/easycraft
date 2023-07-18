import { BigNumber } from "ethers";

export type Campaign = {
  creator: string;
  apy: BigNumber;
  goal: BigNumber;
  pledged: BigNumber;
  startAt: BigNumber;
  endAt: BigNumber;
  claimed: boolean;
};

export const crowdloanStateToLabel = {
  0: "Open",
  1: "Launched",
  2: "Completed",
};
