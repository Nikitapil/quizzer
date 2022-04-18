import { faLink, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IQuiz } from "../types/quizTypes";

interface QuizItemProps {
    quiz: IQuiz
}
 
export const QuizItem:FC<QuizItemProps> = ({quiz}) => {
    const [isShowLink, setIsShowLink] = useState(false)
    const navigate = useNavigate()
    const changeLinkState = () => {
        setIsShowLink(!isShowLink)
    }

  return (
    <li className="user-quizes__item">
      <div className="user-quizes__item-main">
        <div>
          <h3 className="user-quizes__item-title">{quiz.quizeName}</h3>
          <p className="user-quizes__item-amount">Questions amount: {quiz.questions.length}</p>
          {isShowLink && <p className="user-quizes__item-link">{`${window.location.origin.toString()}/questions?${quiz.id}`}</p>}
        </div>
        <div className="user-quizes__item-btns">
          <button className="question-field-add" onClick={() => navigate(`/questions?${quiz.id}`)}>
            Play <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="question-field-add" onClick={changeLinkState}>
            Get link <FontAwesomeIcon icon={faLink} />
          </button>
        </div>
      </div>
    </li>
  );
};
