import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useError } from "../../hooks/useError";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setUserName } from "../../redux/actionCreators";
import AuthService from "../../Services/AuthService";
import { Message } from "../UI/Message";

export const Info = () => {
  const { userName, authError } = useTypedSelector((state) => state.user);
  const [name, setName] = useState("");
  const setAuthError = useError();
  const dispatch = useDispatch();

  useEffect(() => {
    setName(userName);
  }, [userName]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) {
      setAuthError("Please enter your name");
      return;
    }
    try {
      await AuthService.updateInfo({ name });
      dispatch(setUserName(name));
    } catch (error) {
      setAuthError("Oops something went wrong");
    }
  };

  return (
    <form className="info-form" onSubmit={submitHandler} data-testid='info-page'>
      <label htmlFor="name">Your name: </label>
      <input
        id="name"
        type="text"
        placeholder="Your name"
        value={name}
        onChange={onChangeHandler}
        className="info-form__input"
      />
      <button className="info-form__submit-btn">Change name</button>
      {authError && <Message className="error-message" message={authError} />}
    </form>
  );
};
