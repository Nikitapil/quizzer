import React, { FC } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import "../../styles/modal.scss";
import { Message } from "./Message";
interface ModalFrameProps {
  title: string;
  closeModal: () => void;
}
export const ModalFrame: FC<ModalFrameProps> = ({
  children,
  title,
  closeModal,
}) => {
  const { authError } = useTypedSelector((state) => state.user);
  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close-btn" onClick={closeModal}>
          &#10008;
        </button>
        <h2 className="modal__title">{title}</h2>
        {children}
      </div>
      {authError && <Message className="error-message" message={authError} />}
    </div>
  );
};
