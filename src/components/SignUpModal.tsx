import React, { FC, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useError } from "../hooks/useError";
import { errorMessages } from "../mock/errorMessages";
import AuthService from "../Services/AuthService";

interface SignUpModalProps {
  closeModal: () => void;
}

export const SignUpModal: FC<SignUpModalProps> = ({ closeModal }) => {
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const checkAuth = useAuth();
  const setAuthError = useError();
  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signUpData.name) {
      setAuthError("Please enter your name");
      return;
    }
    try {
      setLoading(true);
      await AuthService.register(signUpData);
      setSignUpData({ email: "", password: "", name: "" });
      checkAuth();
      setLoading(false);
      closeModal();
    } catch (error: any) {
      const mess = errorMessages[error.code] || "Oops something went wrong";
      setAuthError(mess);
      setLoading(false);
    }
  };

  return (
    <form className="sign-modal" onSubmit={submitHandler}>
      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        placeholder="Enter email"
        value={signUpData.email}
        onChange={onInput}
      />
      <label htmlFor="password">Password:</label>
      <input
        id="password"
        type="password"
        placeholder="Enter password"
        value={signUpData.password}
        onChange={onInput}
      />
      <label htmlFor="name">Your Name:</label>
      <input
        id="name"
        type="text"
        placeholder="Enter your name"
        value={signUpData.name}
        onChange={onInput}
      />
      <div className="sign-modal__btns">
        <button
          type="button"
          onClick={closeModal}
          className="sign-cancel-btn"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="sign-submit-btn" disabled={loading}>
          Sign Up
        </button>
      </div>
    </form>
  );
};
