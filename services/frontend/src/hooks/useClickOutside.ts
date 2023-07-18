import { useEffect, useRef, useState } from "react";

const useClickOutside = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (showPopup && ref.current && !ref.current.contains(e.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showPopup]);

  return {
    ref,
    showPopup,
    setShowPopup,
  };
};

export default useClickOutside;
