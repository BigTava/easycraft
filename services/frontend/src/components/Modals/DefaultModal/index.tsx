import React, { ReactNode, useEffect, useRef } from "react";

export type ModalProps = {
  showModal: boolean;
  children?: ReactNode;
  closeFunction: () => void;
  className?: string;
  onClickClose?: () => void;
  onClickConfirm?: () => void;
  confirmButtonText?: string;
};

const DefaultModal: React.FC<ModalProps> = (props: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      props.closeFunction();
    }
  };

  useEffect(() => {
    if (props.showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.showModal]);

  if (!props.showModal) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75`}
    >
      <div
        ref={modalRef}
        className={`absolute top-2/5 left-1/2 w-1/4 -translate-y-1/2 -translate-x-1/2 transform content-center rounded-lg bg-white p-8 shadow-2xl ${props.className}`}
      >
        <button
          className="absolute top-0 right-2 p-2 text-black"
          onClick={props.closeFunction}
        >
          X
        </button>
        <div className="sm:py-6">{props.children}</div>

        {props.onClickConfirm && (
          <div className="mt-4 flex items-center justify-end space-x-3">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={props.onClickClose}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={props.onClickConfirm}
            >
              {props.confirmButtonText ?? "Confirm"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultModal;
