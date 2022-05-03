import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchAllQuizes } from "../../redux/actionCreators";
import "../../styles/profile.scss";
import { QuizItem } from "../QuizItem";
import { Loader } from "../UI/Loader";
export const AllQuizes = () => {
  const { allQuizes, quizLoading } = useTypedSelector((state) => state.quiz);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllQuizes());
  }, []);
  if (!quizLoading && !allQuizes.length) {
    return (
      <main className="user-quizes__empty" data-testid="customquizes-page">
        <h1 className="user-quizes__title">There is no any quizes yet</h1>
      </main>
    );
  }
  return (
    <main
      className="user-quizes all-quizes container"
      data-testid="customquizes-page"
    >
      <h1 className="user-quizes__title">All quizes from users</h1>
      <p className="all-quizes__notice">
        There is only non private quizes from all users
      </p>
      {quizLoading && <Loader />}
      <ul className="user-quizes__list">
        {allQuizes &&
          !quizLoading &&
          allQuizes.map((quiz) => {
            return <QuizItem isUser={false} quiz={quiz} key={quiz.id} />;
          })}
      </ul>
    </main>
  );
};
