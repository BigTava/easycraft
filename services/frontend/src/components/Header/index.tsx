// Core
import { useState, useEffect } from "react";
import { magic } from "plugins/magic";
import { getWeb3 } from "plugins/web3";
import { useWeb3 } from "contexts/Web3.context";
import { useUser } from "contexts/User.context";
import { useMoralis } from "react-moralis";
import { useNavigate } from "react-router-dom";

// Components
import logo from "assets/images/EcoVerse-logo.png";
import NavLinks from "components/Header/NavLinks";
import AccountModal from "components/Modals/AccountModal";
import { DefaultButton } from "components/Buttons/DefaultButton";
import HeaderContainer from "./Container";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export function Header() {
  const navigate = useNavigate();
  const { Moralis } = useMoralis();
  const { setUser, user, community } = useUser();
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
      navigate("/dashboard");
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
            <a href="/" aria-label="Home">
              <img className="" src={logo} alt="logo" width="160px"></img>
            </a>
            {!community && (
              <NavLinks
                labels={[
                  ["Discover", "#discover"],
                  ["Invest", "open-crowdloans", "APY > 10%"],
                  ["Roadmap", "roadmap"],
                ]}
              />
            )}
          </div>
          <div className="flex items-center gap-6">
            <div className="col-span-1 flex w-full items-center justify-end gap-[8px] font-semibold text-green-400  ">
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
                {!isLoggedIn ? "Login" : "My Account"}
              </DefaultButton>
              {isLoggedIn && (
                <DefaultButton
                  variant="solid"
                  color="green"
                  className="lg:block"
                  onClick={() => navigate("/dashboard")}
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
