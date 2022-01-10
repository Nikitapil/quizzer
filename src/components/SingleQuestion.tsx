import React, { FC, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { incrementScore } from "../redux/actionCreators";
import { IQuestion } from "../types/questionTypes";
import { decodeHTML } from "../utils/decodeHtml";

interface SingleQuestionProps {
  question: IQuestion;
  nextQuestion: () => void;
}

export const SingleQuestion: FC<SingleQuestionProps> = ({
  question,
  nextQuestion,
}) => {
  const [answered, setAnswered] = useState(false);
  const dispatch = useDispatch();
  const { score } = useTypedSelector((state) => state.question);

  const answers = useMemo(() => {
    return [...question.incorrect_answers, question.correct_answer].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  const getClass = useCallback(
    (answer: string) => {
      if (!answered) {
        return;
      } else if (answer === question.correct_answer) {
        return "correct";
      } else {
        return "incorrect";
      }
    },
    [answered]
  );

  const checkAnswer = (answer: string) => {
    setAnswered(true);
    if (answer === question.correct_answer) {
      dispatch(incrementScore(score + 1));
    }
    setTimeout(() => {
      nextQuestion();
    }, 2500);
  };

  return (
    <div className="single-question">
      <h2 className="single-question__title">
        {decodeHTML(question.question)}
      </h2>
      <ul className="single-question__anwers">
        {answers.map((answer) => {
          return (
            <li
              onClick={() => checkAnswer(answer)}
              className={`single-question__anwers-item ${getClass(answer)}`}
              key={answer}
            >
              {decodeHTML(answer)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
