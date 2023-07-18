// Core
import React from "react";
import { useUser } from "contexts/User.context";

// Components
import Container from "components/Container";

type HeaderContainerProps = {
  children: React.ReactNode;
};
export default function HeaderContainer(props: HeaderContainerProps) {
  const { community } = useUser();

  if (!community) {
    return (
      <Container className="relative z-50 flex justify-between py-8">
        {props.children}
      </Container>
    );
  }

  return (
    <div className="rmx-auto relative z-50 flex justify-between px-4 py-8 sm:px-6 lg:px-8">
      {props.children}
    </div>
  );
}
