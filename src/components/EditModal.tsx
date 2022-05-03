import React, { FC, useEffect, useState } from "react";
import { IQuizData } from "../types/questionTypes";
import { CreateFormItem } from "./CreateFormItem";

interface EditModalProps {
  quizDataFrom: IQuizData | null;
  submitHandler: (quizData: IQuizData) => void;
}

export const EditModal: FC<EditModalProps> = ({
  quizDataFrom,
  submitHandler,
}) => {
  const [quizData, setQuizData] = useState({
    quizeName: "",
    isPrivate: false,
    questions: [
      {
        question: "",
        correct_answer: "",
        incorrect_answers: [""],
      },
      {
        question: "",
        correct_answer: "",
        incorrect_answers: [""],
      },
      {
        question: "",
        correct_answer: "",
        incorrect_answers: [""],
      },
    ],
  });

  useEffect(() => {
    setQuizData(quizDataFrom!);
  }, [quizDataFrom]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitHandler(quizData);
  };
  const onChangeWrongAnswer = (qIndex: number, idx: number, val: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((item, index) => {
        if (index === qIndex) {
          item.incorrect_answers = item.incorrect_answers.map((ans, i) => {
            if (i === idx) {
              return val;
            }
            return ans;
          });
        }
        return item;
      }),
    });
  };

  const onAddAnswer = (idx: number) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((item, index) => {
        if (index === idx) {
          item.incorrect_answers.push("");
        }
        return item;
      }),
    });
  };

  const onAddQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          question: "",
          correct_answer: "",
          incorrect_answers: [""],
        },
      ],
    });
  };

  const onChangeQuizName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizData({
      ...quizData,
      quizeName: e.target.value,
    });
  };

  const onChangeQuestion = (idx: number, val: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q, index) => {
        if (index === idx) {
          q.question = val;
        }
        return q;
      }),
    });
  };

  const onChangeRightAnswer = (idx: number, val: string) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((q, index) => {
        if (index === idx) {
          q.correct_answer = val;
        }
        return q;
      }),
    });
  };

  const onChangePrivacy = () => {
    setQuizData({
      ...quizData,
      isPrivate: !quizData.isPrivate,
    });
  };

  const onDeleteQuestion = (index: number) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.filter((_, idx) => idx !== index),
    });
  };

  const onDeleteWrongAnswer = (idx: number, windex: number) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((item, index) => {
        if (index === idx) {
          item.incorrect_answers = item.incorrect_answers.filter(
            (_, aindex) => aindex !== windex
          );
        }
        return item;
      }),
    });
  };
  return (
    <form className="create-form" onSubmit={onSubmit} data-testid="edit-modal">
      <label htmlFor="quiz-name">Quiz name:</label>
      <input
        autoComplete="off"
        required
        id="quiz-name"
        type="text"
        placeholder="Quiz name..."
        value={quizData.quizeName}
        onChange={onChangeQuizName}
        data-testid="quiz-name-input"
      />
      <div className="create-form__privacy">
        <label htmlFor="privacy-control">Is Private Quiz?</label>
        <input
          id="privacy-control"
          type="checkbox"
          checked={quizData.isPrivate}
          onChange={onChangePrivacy}
        />
      </div>
      {quizData.questions.map((quest, idx) => {
        return (
          <CreateFormItem
            question={quest.question}
            rightAnswer={quest.correct_answer}
            wrongAnswers={quest.incorrect_answers}
            index={idx}
            onChangeWrongAnswer={(Windex, val) =>
              onChangeWrongAnswer(idx, Windex, val)
            }
            onChangeQuestion={(val) => onChangeQuestion(idx, val)}
            onAddItem={() => onAddAnswer(idx)}
            onChangeRightAnswer={(val) => onChangeRightAnswer(idx, val)}
            onDeleteQuestion={onDeleteQuestion}
            onDeleteWrongAnswer={(windex) => onDeleteWrongAnswer(idx, windex)}
            key={idx}
          />
        );
      })}
      <button
        type="button"
        className="question-field-add add-question"
        onClick={onAddQuestion}
        data-testid='add-question-btn'
      >
        Add Question
      </button>
      <button type="submit" className="create-form_submit" data-testid='edit-submit'>
        Edit!
      </button>
    </form>
  );
};
