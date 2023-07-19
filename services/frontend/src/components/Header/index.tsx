// Core
import { useState, useEffect } from "react";
import { magic } from "plugins/magic";
import { getWeb3 } from "plugins/web3";
import { useWeb3 } from "contexts/Web3.context";
import { useUser } from "contexts/User.context";
import { useMoralis } from "react-moralis";

// Components
import AccountModal from "components/Modals/AccountModal";
import { DefaultButton } from "components/Buttons/DefaultButton";
import HeaderContainer from "./Container";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function Header() {
  const { Moralis } = useMoralis();
  const { setUser, user } = useUser();
  const { setWeb3 } = useWeb3();

  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState(false);

  const isLoggedIn = user;

  const connect = async () => {
    try {
      setDisabled(true);
      const accounts = await magic.wallet.connectWithUI();
      setDisabled(false);
      localStorage.setItem("user", accounts[0]);

      const web3 = await getWeb3();
      setWeb3(web3);
      setUser(accounts[0]);
      Moralis.enableWeb3();
    } catch (error) {
      setDisabled(false);
    }
  };

  const onCloseWalletModal = () => setOpenWalletModal(false);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const web3 = await getWeb3();

        setWeb3(web3);
      })();
      Moralis.enableWeb3();
    }
  }, [isLoggedIn]);

  return (
    <header>
      <nav>
        <HeaderContainer>
          <div className="relative z-10 flex items-center gap-16">
            <a href="/" aria-label="Home" className="">
              <span className="text-4xl font-bold text-blue-600">Easy</span>
              <span className="text-3xl font-light text-gray-700">
                Craft.ai
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <div className="col-span-1 flex w-full items-center justify-end gap-[8px] font-semibold text-green-400  ">
              {!isLoggedIn && (
                <DefaultButton
                  variant="outline"
                  color="gray"
                  className="lg:block"
                  onClick={() => {
                    {
                      !isLoggedIn ? connect() : setOpenWalletModal(true);
                    }
                  }}
                  disabled={disabled}
                >
                  Login
                </DefaultButton>
              )}
              {isLoggedIn && (
                <DefaultButton
                  variant="solid"
                  color="green"
                  className="rounded-lg lg:block"
                  onClick={() => {
                    {
                      !isLoggedIn ? connect() : setOpenWalletModal(true);
                    }
                  }}
                  disabled={disabled}
                >
                  <UserCircleIcon className="text-grey-500 h-6 w-full" />
                </DefaultButton>
              )}
            </div>
          </div>
          <AccountModal open={openWalletModal} onClose={onCloseWalletModal} />
        </HeaderContainer>
      </nav>
    </header>
  );
}

export default Header;
