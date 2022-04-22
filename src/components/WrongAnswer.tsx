import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";

interface WrongAnswerProps {
  index: number;
  value: string;
  onChangeValue: (e: any) => void;
  onDeleteAnswer: (index: number) => void;
}

export const WrongAnswer: FC<WrongAnswerProps> = ({
  index,
  value,
  onChangeValue,
  onDeleteAnswer,
}) => {
  const deleteAnswer = () => {
    onDeleteAnswer(index);
  };

  return (
    <div>
      <label htmlFor={`wrong-answer_${index}`}>Wrong Answer {index + 1}:</label>
      <div className="wrong-answer__input">
        <input
          required
          autoComplete="off"
          id={`wrong-answer_${index}`}
          type="text"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        {index !== 0 && (
          <button
            type="button"
            className="wrong-answer__dell"
            onClick={deleteAnswer}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}
      </div>
    </div>
  );
};
