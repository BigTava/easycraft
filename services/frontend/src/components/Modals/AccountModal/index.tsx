// Core
import React, { useEffect, useState } from "react";
import { useUser } from "contexts/User.context";
import { useWeb3 } from "contexts/Web3.context";

// Components
import CardLabel from "components/Cards/MagicCard/Label";
import Card from "components/Cards/MagicCard";
import CardHeader from "components/Cards/MagicCard/Header";
import DefaultModal from "components/Modals/DefaultModal";

// Assets
import Loading from "assets/images/loading.svg";

// Utils
import { Networks } from "utils/networks";
import { logout } from "utils/logout";

type WalletModalPros = {
  open: boolean;
  onClose: () => void;
};

const AccountModal = (props: WalletModalPros) => {
  const { user, setUser } = useUser();
  const { web3, setWeb3 } = useWeb3();

  const [balance, setBalance] = useState("...");
  const [copied, setCopied] = useState("Copy");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const network = localStorage.getItem("network");
  const tokenSymbol = network === Networks.Polygon ? "MATIC" : "ETH";

  const copy = () => {
    if (user && copied === "Copy") {
      setCopied("Copied!");
      navigator.clipboard.writeText(user);
      setTimeout(() => {
        setCopied("Copy");
      }, 1000);
    }
  };

  const getBalance = async () => {
    if (user && web3) {
      try {
        const balance = await web3.eth.getBalance(user);
        setBalance(web3.utils.fromWei(balance));
      } catch (error) {
        /*eslint-disable no-console */
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (!web3 || !user) return;
    getBalance();
  }, [web3, user]);

  return (
    <DefaultModal showModal={props.open} closeFunction={props.onClose}>
      <Card id="">
        <CardHeader id="wallet">Wallet</CardHeader>
        <CardLabel
          leftHeader="Status"
          rightAction={
            <div
              onClick={() => {
                logout(setWeb3, setUser);
                props.onClose();
              }}
            >
              Disconnect
            </div>
          }
          isDisconnect
        />
        <div className="flex-row">
          <div className="green-dot" />
          <div className="connected">Connected</div>
        </div>
        <div className="divider" />
        <CardLabel
          leftHeader="Address"
          rightAction={<div onClick={copy}>{copied}</div>}
        />
        <div className="code">{user}</div>
        <div className="divider" />
        <CardLabel
          style={{ height: "20px" }}
          leftHeader="Balance"
          rightAction={
            isRefreshing ? (
              <div className="loading-container">
                <img className="loading" alt="loading" src={Loading} />
              </div>
            ) : (
              <div
                onClick={() => {
                  setIsRefreshing(true);
                  setTimeout(() => {
                    setIsRefreshing(false);
                  }, 500);
                  getBalance();
                }}
              >
                Refresh
              </div>
            )
          }
        />
        <div className="code">
          {balance.substring(0, 7)} {tokenSymbol}
        </div>
      </Card>
    </DefaultModal>
  );
};

export default AccountModal;
