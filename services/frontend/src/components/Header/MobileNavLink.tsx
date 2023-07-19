// Core
import React, { ReactNode } from "react";

// Components
import { Popover } from "@headlessui/react";

type MobileNavLinkProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
  };

function MobileNavLink(props: MobileNavLinkProps) {
  return (
    <Popover.Button
      className="block text-base leading-7 tracking-tight text-gray-700"
      {...props}
    >
      {props.children}
    </Popover.Button>
  );
}

export default MobileNavLink;
