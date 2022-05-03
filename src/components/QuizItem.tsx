import {
  faLink,
  faPlay,
  faTrashCan,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserQuizes } from "../redux/actionCreators";
import CustomQuizService from "../Services/CustomQuizService";
import { IQuiz } from "../types/quizTypes";

interface QuizItemProps {
  quiz: IQuiz;
  isUser: boolean;
  openEditModal?: (quiz: IQuiz) => void;
}

export const QuizItem: FC<QuizItemProps> = ({
  quiz,
  isUser,
  openEditModal,
}) => {
  const [isShowLink, setIsShowLink] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeLinkState = () => {
    setIsShowLink(!isShowLink);
  };

  const deleteQuiz = async () => {
    await CustomQuizService.deleteQuiz(quiz.id, quiz.idUserQuiz!);
    dispatch(fetchUserQuizes());
  };

  const openEdit = () => {
    if (openEditModal) {
      openEditModal(quiz);
    }
  };

  return (
    <li className="user-quizes__item">
      <div className="user-quizes__item-main">
        <div>
          <h3 className="user-quizes__item-title">{quiz.quizeName}</h3>
          <p className="user-quizes__item-amount">
            Questions amount: {quiz.questions.length}
          </p>
          {isShowLink && (
            <p className="user-quizes__item-link" data-testid='quiz-link'>{`${window.location.origin.toString()}/quizzer/questions?${
              quiz.id
            }`}</p>
          )}
        </div>
        <div className="user-quizes__item-btns">
          <button
            className="question-field-add"
            onClick={() => navigate(`/questions?${quiz.id}`)}
            data-testid='play-btn'
          >
            Play <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className="question-field-add" onClick={changeLinkState} data-testid='open-link-btn'>
            Get link <FontAwesomeIcon icon={faLink} />
          </button>
          {isUser && (
            <button
              className="question-field-add"
              title="Edit"
              onClick={openEdit}
              data-testid='edit-btn'
            >
              {" "}
              <FontAwesomeIcon icon={faPencil} />
            </button>
          )}
          {isUser && (
            <button
              className="question-field-add"
              title="Delete"
              onClick={deleteQuiz}
              data-testid='quiz-del-btn'
            >
              {" "}
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          )}
        </div>
      </div>
    </li>
  );
};
