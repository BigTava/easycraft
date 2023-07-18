// Core
import { BigNumber } from "ethers";
import { DateTime } from "luxon";

export function BigNumberToDate(date: BigNumber) {
  const unix = Number(date as BigNumber);
  return DateTime.fromJSDate(new Date(unix * 1000)).toFormat("yyyy-MM-dd");
}
