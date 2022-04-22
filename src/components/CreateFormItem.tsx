import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { WrongAnswer } from "./WrongAnswer";

interface ICreateFormItem {
  question: string;
  rightAnswer: string;
  wrongAnswers: string[];
  index: number;
  onChangeQuestion: (val: string) => void;
  onChangeRightAnswer: (val: string) => void;
  onAddItem: () => void;
  onChangeWrongAnswer: (idx: number, val: string) => void;
  onDeleteQuestion: (index: number) => void;
  onDeleteWrongAnswer: (Windex: number) => void;
}

export const CreateFormItem: FC<ICreateFormItem> = ({
  question,
  rightAnswer,
  wrongAnswers,
  index,
  onChangeQuestion,
  onChangeRightAnswer,
  onChangeWrongAnswer,
  onAddItem,
  onDeleteQuestion,
  onDeleteWrongAnswer,
}) => {
  const deleteQuestion = () => {
    onDeleteQuestion(index);
  };

  const deleteWrongAnswer = (Windex: number) => {
    onDeleteWrongAnswer(Windex);
  };

  return (
    <fieldset className="question-field">
      {index > 2 && (
        <button
          type="button"
          className="question-field-del"
          onClick={deleteQuestion}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      <legend>Question #{index + 1}</legend>
      <label htmlFor="question">Question:</label>
      <input
        autoComplete="off"
        required
        id="question"
        type="text"
        value={question}
        onChange={(e) => onChangeQuestion(e.target.value)}
      />
      <label htmlFor="right-answer">Right Answer:</label>
      <input
        autoComplete="off"
        required
        id="right-answer"
        type="text"
        value={rightAnswer}
        onChange={(e) => onChangeRightAnswer(e.target.value)}
      />
      {wrongAnswers.map((answ, Windex) => {
        return (
          <WrongAnswer
            onDeleteAnswer={deleteWrongAnswer}
            index={Windex}
            value={wrongAnswers[Windex]}
            onChangeValue={(val) => onChangeWrongAnswer(Windex, val)}
            key={Windex}
          />
        );
      })}
      {wrongAnswers.length < 4 && (
        <button
          type="button"
          className="question-field-add"
          onClick={onAddItem}
        >
          Add Answer
        </button>
      )}
    </fieldset>
  );
};
