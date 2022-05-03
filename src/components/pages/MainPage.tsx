import React, { FC, useEffect } from "react";
import { SelectSettings } from "../UI/SelectSettings";
import "../../styles/mainpage.scss";
import { difficulties, questionTypesArray } from "../../mock/options";
import {
  fetchCategories,
  setCategories,
  setDifficulty,
  setType,
} from "../../redux/actionCreators";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { InputSettings } from "../UI/InputSettings";
import { useNavigate } from "react-router-dom";

export const MainPage: FC = () => {
  const dispatch = useDispatch();
  const { categories, categoriesLoading, categoriesError } = useTypedSelector(
    (state) => state.main
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigate("/questions");
  };

  return (
    <main className="mainpage__container container">
      <h1 className="mainpage__title">Quizzer</h1>
      {categoriesError && (
        <div className="error">
          Oops! categories is unavailable, try reload the page
        </div>
      )}

      <form className="settings-form" onSubmit={submitHandler}>
        <SelectSettings
          id="questionCategory"
          label="Select Category"
          options={categories}
          action={setCategories}
        />
        <SelectSettings
          id="questionDificulty"
          label="Select Difficulty"
          options={difficulties}
          action={setDifficulty}
        />
        <SelectSettings
          id="questionType"
          label="Select question Type"
          options={questionTypesArray}
          action={setType}
        />
        <InputSettings />
        <button
          disabled={categoriesLoading}
          type="submit"
          className="settings-form__submit"
          data-testid='open-questions'
        >
          Get Started
        </button>
      </form>
    </main>
  );
};
