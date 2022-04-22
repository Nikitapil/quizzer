import React, { useState } from "react";
import CustomQuizService from "../../Services/CustomQuizService";
import { CreateFormItem } from "../CreateFormItem";
import { Message } from "../UI/Message";

export const CreateQuiz = () => {
  const [message, setMessge] = useState({
    text: '',
    className: ''
  })
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

  const onChangePrivacy = () => {
    setQuizData({
      ...quizData,
      isPrivate: !quizData.isPrivate
    })
  }

  const onDeleteQuestion = (index: number) => {
    setQuizData({
      ...quizData,
      questions:  quizData.questions.filter((_, idx) => idx !== index)
    })
  }
  
  const onDeleteWrongAnswer = (idx: number, windex: number) => {
    setQuizData({
      ...quizData,
      questions: quizData.questions.map((item, index) => {
        if (index === idx) {
          item.incorrect_answers = item.incorrect_answers.filter((_, aindex) => aindex !==windex)
        }
        return item
      } )
  })}

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        CustomQuizService.createQuiz(quizData)
        setQuizData({
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
          })
          setMessge({
            text: 'Quiz created',
            className: 'success-message'
          })
      } catch (error: any) {
        setMessge({
          text: error,
          className: 'error-message'
        })
      }
      finally {
        setTimeout(() => {
          setMessge({
            text: '',
            className: ''
          })
        }, 3500)
      }
  }

  return (
    <div className="create-form__wrapper">
      <form className="create-form" onSubmit={submitHandler}>
        <label htmlFor="quiz-name">Quiz name:</label>
        <input autoComplete="off" required id="quiz-name" type="text" placeholder="Quiz name..." value={quizData.quizeName} onChange={onChangeQuizName} />
        <div className="create-form__privacy">
          <label htmlFor="privacy-control">Is Private Quiz?</label>
          <input id="privacy-control" type="checkbox" checked={quizData.isPrivate} onChange={onChangePrivacy} />
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
              onDeleteWrongAnswer ={(windex) => onDeleteWrongAnswer(idx, windex)}
              key={idx}
            />
          );
        })}
        <button type="button" className="question-field-add add-question" onClick={onAddQuestion}>Add Question</button>
        <button type="submit" className="create-form_submit">Create quiz</button>
      </form>
      {message.text && <Message className={message.className} message={message.text}/>}
    </div>
  );
};
