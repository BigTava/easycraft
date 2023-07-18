import { useState } from "react";

// Components
import { DefaultButton } from "components/Buttons/DefaultButton";

const Landing = () => {
  const [showPayButton] = useState(false);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
      <section>
        <section className="w-500px h-500px my-20 mx-auto overflow-hidden rounded-xl bg-gray-200 shadow-lg">
          <section
            className="h-4/5 overflow-y-scroll p-5"
            id="chatHistory"
          ></section>
          <section className="flex justify-between p-5">
            <input
              type="text"
              id="inputField"
              placeholder="Type your message..."
              className="mr-5 w-4/5 rounded-full border-none p-2 pl-5 text-lg focus:outline-none"
              onChange={() => {}}
            />
            <DefaultButton
              type="button"
              color="gray"
              onClick={() => {}}
              className="w-1/5 rounded-full"
            >
              Send
            </DefaultButton>
          </section>
        </section>
        {showPayButton && <DefaultButton onClick={() => {}}>Pay</DefaultButton>}
      </section>
    </main>
  );
};

export default Landing;
