import React, { useState } from "react";
import CustomQuizService from "../../Services/CustomQuizService";
import { CreateFormItem } from "../CreateFormItem";

export const CreateQuiz = () => {
  const [quizData, setQuizData] = useState({
    quizeName: "",
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
                item.incorrect_answers.push('')
            }
            return item
        })
    })
  }

  const onAddQuestion = () => {
    setQuizData({
        ...quizData,
        questions: [...quizData.questions, {
            question: "",
            correct_answer: "",
            incorrect_answers: [""],
          }]
    })
  }

  const onChangeQuizName = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuizData({
        ...quizData,
        quizeName: e.target.value
    })
  }

  const onChangeQuestion = (idx: number, val: string) => {
    setQuizData({
        ...quizData,
        questions: quizData.questions.map((q, index) => {
            if (index === idx) {
                q.question = val
            }
            return q
        })
    })
  } 

  const onChangeRightAnswer = (idx:number, val: string) => {
    setQuizData({
        ...quizData,
        questions: quizData.questions.map((q, index) => {
            if (index === idx) {
                q.correct_answer = val
            }
            return q
        })
    })
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      //сделать валидацию
      try {
        CustomQuizService.createQuiz(quizData)
        setQuizData({
            quizeName: "",
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
          })
      } catch (error) {
          console.error(error);
      }
  }

  return (
    <div className="create-form__wrapper">
      <form className="create-form" onSubmit={submitHandler}>
        <label htmlFor="quiz-name">Quiz name:</label>
        <input id="quiz-name" type="text" placeholder="Quiz name..." value={quizData.quizeName} onChange={onChangeQuizName} />
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
              key={idx}
            />
          );
        })}
        <button type="button" className="question-field-add add-question" onClick={onAddQuestion}>Add Question</button>
        <button type="submit" className="create-form_submit">Create quiz</button>
      </form>
    </div>
  );
};
