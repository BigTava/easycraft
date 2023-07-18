// Core
import { Outlet, Navigate } from "react-router-dom";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { useUser } from "contexts/User.context";
import { useQuery } from "@tanstack/react-query";

// Utils
import { communityFactoryAbi } from "utils/abis";
import { contractAddresses } from "utils/addresses";
import { isZeroAddress } from "utils/ethers";

// Components
import AppLayout from "components/Layouts/AppLayout";

const Prefecth = () => {
  const { setCommunity, community } = useUser();
  const { chainId: chainIdHex } = useMoralis();

  const chainId: string = parseInt(chainIdHex!).toString() ?? "11155111";

  const { runContractFunction: getCommunity } = useWeb3Contract({
    abi: communityFactoryAbi,
    contractAddress: contractAddresses[chainId][
      "communityFactory"
    ] as `0x${string}`,
    functionName: "getCommunity",
    params: {},
  });

  const { data } = useQuery({
    queryKey: ["Community"],
    queryFn: async function () {
      const result = await getCommunity();
      const address = result?.toString();

      if (!isZeroAddress(address!)) {
        setCommunity(address);
      }

      return address;
    },
  });

  return !!community || !isZeroAddress(data!) ? (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ) : (
    <Navigate to="/create-community" replace />
  );
};

export default Prefecth;
