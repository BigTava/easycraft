import React, { ReactNode } from "react";
import clsx from "clsx";

type ContainerProps = {
  className?: string;
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = (props) => {
  return (
    <div
      {...props}
      className={clsx(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Container;
