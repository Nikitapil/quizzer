import { FC } from "react";
import "../../styles/errormessage.scss";

interface MessageProps {
  message: string;
  className: string;
}

export const Message: FC<MessageProps> = ({ message, className }) => {
  return <div className={className} data-testid='message'>{message}</div>;
};
