import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// Components
import { DefaultButton } from "components/Buttons/DefaultButton";

const Landing = () => {
  const [step, setStep] = useState<number>(0);
  const [currentUserPrompt, setCurrentUserPrompt] = useState<string>("You: ");
  const [messages, setMessages] = useState<string[]>([]);

  const mutation = useMutation(
    (newOrder: { order: string; decentralized_computation: boolean }) => {
      return axios.post("http://localhost:8000/api/orders", newOrder);
    }
  );

  const onClickSend = async () => {
    setMessages([...messages, `You: ${currentUserPrompt}`]);
    mutation.mutate(
      { order: currentUserPrompt, decentralized_computation: step === 3 },
      {
        onSuccess: (data) => {
          setMessages([
            ...messages,
            `You: ${currentUserPrompt}`,
            `AI: ${data.data.message}`,
          ]);
          setStep(step + 1);
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
            <DefaultButton className="w-1/6 rounded-full" onClick={() => {}}>
              Pay
            </DefaultButton>
          </div>
        )}
      </section>
    </main>
  );
};

export default Landing;
