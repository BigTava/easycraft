// Core
import React from "react";

// Components
import Container from "components/Container";

type HeaderContainerProps = {
  children: React.ReactNode;
};
export default function HeaderContainer(props: HeaderContainerProps) {
  return (
    <Container className="relative z-50 flex justify-between py-8">
      {props.children}
    </Container>
  );
}
