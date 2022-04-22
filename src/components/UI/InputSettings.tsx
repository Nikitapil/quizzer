import React, { FC, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { changeQuestionAmount } from "../../redux/actionCreators";

export const InputSettings: FC = () => {
  const dispatch = useDispatch();

  const { questionsAmount, categoryQuestionCount, questionDificulty } =
    useTypedSelector((state) => state.main);

  const maxInputValue = useMemo(() => {
    if (questionDificulty === "easy") {
      return categoryQuestionCount.total_easy_question_count > 50
        ? 50
        : categoryQuestionCount.total_easy_question_count;
    } else if (questionDificulty === "medium") {
      return categoryQuestionCount.total_medium_question_count > 50
        ? 50
        : categoryQuestionCount.total_medium_question_count;
    } else if (questionDificulty === "hard") {
      return categoryQuestionCount.total_hard_question_count > 50
        ? 50
        : categoryQuestionCount.total_hard_question_count;
    } else {
      return categoryQuestionCount.total_question_count > 50
        ? 50
        : categoryQuestionCount.total_question_count;
    }
  }, [categoryQuestionCount, questionDificulty]);

  return (
    <div className="sttings__input">
      <label htmlFor="settings-form__amount">
        Set Amoun of questions (max: {maxInputValue})
      </label>
      <input
        id="settings-form__amount"
        type="number"
        value={questionsAmount}
        max={maxInputValue}
        min={1}
        onChange={(e) => dispatch(changeQuestionAmount(e.target.value))}
      />
    </div>
  );
};
