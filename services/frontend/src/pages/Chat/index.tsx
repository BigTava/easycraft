import { useState, ReactText } from "react";
import { ContractTransaction } from "ethers";
import { useMutation } from "@tanstack/react-query";
import { useWeb3Contract } from "react-moralis";
import { useUser } from "contexts/User.context";
import { useWeb3 } from "contexts/Web3.context";
import { isSupportedChain } from "utils/networks";
import { toast } from "react-toastify";
import axios from "axios";
import clsx from "clsx";

// Components
import { DefaultButton } from "components/Buttons/DefaultButton";

// Utils
import marketPlaceAbi from "utils/abis/marketPlace.json";
import { MatchedOrder } from "utils/types/matchedOrder.types";

// Assets
import logoHugging from "assets/huggingFace.png";
import logoCeramic from "assets/ceramic.png";
import logoFilecoin from "assets/filecoin.png";
import logoFlashbots from "assets/flashbots.png";
import logoGnosis from "assets/gnosis.png";

const Landing = () => {
  const [step, setStep] = useState<number>(0);
  const [currentUserPrompt, setCurrentUserPrompt] = useState<string>("You: ");
  const [messages, setMessages] = useState<string[]>([]);
  const [orderArgs, setOrderArgs] = useState<MatchedOrder>({
    orderId: "",
    capacityId: "",
    amount: 0,
  });

  const { user } = useUser();
  const { web3 } = useWeb3();

  const mutation = useMutation(
    (newOrder: { order: string; decentralized_computation: boolean }) => {
      return axios.post("http://localhost:8000/api/orders", newOrder);
    }
  );

  const { runContractFunction: matchCapacity } = useWeb3Contract({
    abi: marketPlaceAbi,
    contractAddress: "0x52e58C6c37095187652a95138f58C9dc29e63537",
    functionName: "matchCapacity",
    params: {
      _orderId: orderArgs!.orderId,
      _capacityId: orderArgs!.capacityId,
      _amount: orderArgs!.amount,
    },
  });

  const handlePayment = async () => {
    if (!user) {
      return toast.warn("Please Login!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }

    if (!isSupportedChain(await web3.eth.getChainId())) {
      return toast.warn("Please connect to a correct network!", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }

    const id = toast.loading("Please wait...", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
    await matchCapacity({
      onSuccess: (tx: any) => handleSuccess(id, tx),
      onError: (error) => handleError(id, error),
    });
  };

  const handleSuccess = async (toastId: ReactText, tx: ContractTransaction) => {
    await tx.wait();

    toast.update(toastId, {
      render: "Order on the way!",
      type: toast.TYPE.SUCCESS,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
  };

  const handleError = (toastId: ReactText, error: any) => {
    /* eslint-disable no-console */
    console.error(error);
    toast.update(toastId, {
      render: "Error confirming order!",
      type: toast.TYPE.ERROR,
      position: "top-right",
      isLoading: false,
      autoClose: 1000,
    });
  };

  const onClickSend = async () => {
    setMessages([...messages, `You: ${currentUserPrompt}`]);
    mutation.mutate(
      { order: currentUserPrompt, decentralized_computation: step === 1 },
      {
        onSuccess: async (data) => {
          setMessages([
            ...messages,
            `You: ${currentUserPrompt}`,
            `AI: ${data.data.message}`,
          ]);
          setStep(step + 1);

          if (step === 1) {
            setOrderArgs(data.data);
          }
        },
        onError: (error) => {
          setMessages([
            ...messages,
            `You: ${currentUserPrompt}`,
            `AI: Ooops, Please try again!`,
          ]);
          console.log(error);
        },
      }
    );
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <section>
        <section className="w-500px h-500px my-20 mx-auto mb-5 overflow-hidden rounded-xl bg-gray-200 shadow-lg">
          <section className="h-4/5 overflow-y-scroll p-5">
            {messages.map((message, idx) => (
              <p
                key={idx}
                className="mt-4 overflow-ellipsis rounded-xl bg-[#1b6a9f] p-4 text-white"
              >
                {message}
              </p>
            ))}
          </section>
          <section className="flex justify-between p-5">
            <input
              type="text"
              id="inputField"
              placeholder="Type your message..."
              className="mr-5 w-4/5 overflow-ellipsis rounded-full border-none p-2 pl-5 text-lg focus:outline-none"
              onChange={(e) => setCurrentUserPrompt(e.target.value)}
            />
            <DefaultButton
              type="button"
              color="gray"
              onClick={onClickSend}
              className="w-1/5 rounded-full"
              disabled={mutation.isLoading}
            >
              Send
            </DefaultButton>
          </section>
        </section>
        {step === 2 && (
          <div className=" text-center">
            <p className="mb-5 text-center">🥳 Your request is ready!</p>
            <DefaultButton
              className="w-1/6 rounded-full"
              onClick={async () => await handlePayment()}
            >
              Pay
            </DefaultButton>
          </div>
        )}
        <div className="relative mt-8 lg:col-span-7 xl:col-span-6">
          <p className="text-center text-sm font-semibold text-gray-900 lg:text-left">
            Powered by
          </p>
          <ul
            role="list"
            className="mx-auto mt-8 flex flex-wrap justify-center gap-x-10 gap-y-8 lg:mx-0 lg:justify-start"
          >
            {[["Gnosis", logoGnosis]].map(([name, logo, className]) => (
              <li
                key={name}
                className={clsx("flex text-center align-middle", className)}
              >
                <img src={logo} alt={name} className="h-8" />
              </li>
            ))}
            {[
              ["HuggingFace", logoHugging],
              ["Filecoin", logoFilecoin],
              ["Ceramic", logoCeramic],
              ["Flashbots", logoFlashbots],
            ].map(([name, logo, className]) => (
              <li key={name} className={clsx("flex", className)}>
                <img src={logo} alt={name} className="h-16" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
};

export default Landing;
