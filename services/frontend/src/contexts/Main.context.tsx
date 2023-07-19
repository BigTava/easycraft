import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

type MainContextProps = {
  landingView: string;
  setLandingView: Function;
  setShowContactModal: Function;
  showContactModal: boolean;
  windowWidth: number;
};

type MainProviderProps = {
  children: ReactNode;
};

export const MainContext = createContext({} as MainContextProps);

const MainProvider: FC<MainProviderProps> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [landingView, setLandingView] = useState<"deposit" | "borrow">(
    "deposit"
  );
  const [showContactModal, setShowContactModal] = useState<boolean>(false);

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <MainContext.Provider
      value={{
        landingView,
        setLandingView,
        setShowContactModal,
        showContactModal,
        windowWidth,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainProvider;
