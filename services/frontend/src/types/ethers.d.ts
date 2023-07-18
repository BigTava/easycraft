declare module "ethers" {
  export * from "ethers/lib/ethers";
}

declare module "@heroicons/react/24/solid" {
  import { FC, SVGAttributes } from "react";
  export const CheckIcon: FC<SVGAttributes<SVGElement>>;
}
