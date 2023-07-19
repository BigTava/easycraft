// Core
import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "contexts/User.context";
import { getWeb3 } from "plugins/web3";
import { toast } from "react-toastify";
import { useMoralis } from "react-moralis";

// Utils
import { isSupportedChain } from "utils/networks";

const ProtectedRoute = () => {
  const { user } = useUser();
  const { chainId } = useMoralis();

  const getChainId = async () => {
    const web3 = await getWeb3();

    return await web3?.eth.getChainId();
  };

  useEffect(() => {
    if (!user) {
      toast.warn("Please Login!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
      return;
    }

    (async function () {
      if (!isSupportedChain(await getChainId()!)) {
        toast.warn("Please connect to a correct network!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    })();
  }, [user]);

  return !!user && isSupportedChain(Number(chainId)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
