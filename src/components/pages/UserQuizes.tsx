import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserQuizes } from "../../redux/actionCreators";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { QuizItem } from "../QuizItem";
import { Loader } from "../UI/Loader";
import { Link } from "react-router-dom";
import { ModalFrame } from "../UI/ModalFrame";
import { EditModal } from "../EditModal";
import { IQuiz } from "../../types/quizTypes";
import { IQuizData } from "../../types/questionTypes";
import CustomQuizService from "../../Services/CustomQuizService";
import { Message } from "../UI/Message";
export const UserQuizes = () => {
  const dispatch = useDispatch();
  const { userId } = useTypedSelector((state) => state.user);
  const { userQuizes, quizLoading } = useTypedSelector((state) => state.quiz);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [quizData, setQuizData] = useState<IQuizData | null>(null);
  const [currentQuizId, setCaurrentQuizId] = useState("");
  const [currentQuizIdUser, setCaurrentQuizIdUser] = useState("");
  const [message, setMessage] = useState({
    text: "",
    classNama: "",
  });
  const onChangeEditModalState = () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const openEditModal = (quiz: IQuiz) => {
    const data = {
      quizeName: quiz.quizeName,
      isPrivate: quiz.isPrivate,
      questions: [...quiz.questions],
    };
    setCaurrentQuizId(quiz.id);
    setCaurrentQuizIdUser(quiz.idUserQuiz!);
    setQuizData(data);
    setIsEditModalOpen(true);
  };

  const submitEdit = async (quizDataFromModal: IQuizData) => {
    await CustomQuizService.editQuiz(
      currentQuizId,
      currentQuizIdUser,
      quizDataFromModal
    );
    setIsEditModalOpen(false);
    setMessage({
      text: "Edit successfull",
      classNama: "success-message",
    });
    dispatch(fetchUserQuizes());
    setTimeout(() => {
      setMessage({
        text: "",
        classNama: "",
      });
    }, 3500);
  };

  useEffect(() => {
    dispatch(fetchUserQuizes());
  }, [userId]);

  if (!quizLoading && !userQuizes.length) {
    return (
      <div className="user-quizes__empty">
        <h1 className="user-quizes__title">There is no any quizes yet</h1>
        <Link to={"/profile/create"} className="user-quizes__link">
          Create first
        </Link>
      </div>
    );
  }
  return (
    <div className="user-quizes">
      <h1 className="user-quizes__title">Your Quizes</h1>
      {quizLoading && <Loader />}
      <ul className="user-quizes__list">
        {userQuizes &&
          !quizLoading &&
          userQuizes.map((quiz) => {
            return (
              <QuizItem
                openEditModal={openEditModal}
                isUser={true}
                quiz={quiz}
                key={quiz.id}
              />
            );
          })}
      </ul>
      {message.text && (
        <Message message={message.text} className={message.classNama} />
      )}
      {isEditModalOpen && (
        <ModalFrame title="Edit quiz" closeModal={onChangeEditModalState}>
          <EditModal submitHandler={submitEdit} quizDataFrom={quizData} />
        </ModalFrame>
      )}
    </div>
  );
};
