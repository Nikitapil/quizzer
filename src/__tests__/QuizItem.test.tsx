import { rootReducer } from "../redux/rootReducer";
import { QuizItem } from "../components/QuizItem";
import { render, screen } from "@testing-library/react";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";
import { createStore } from "redux";
import userEvent from "@testing-library/user-event";
import CustomQuizService from "../Services/CustomQuizService";

jest.mock("../Services/CustomQuizService");

describe("quizItem with different props", () => {
  let store: any;
  let quiz: any;
  beforeEach(() => {
    store = createStore(rootReducer);
    quiz = {
      id: "123",
      idUserQuiz: "123",
      quizeName: "Name",
      isPrivate: false,
      questions: [
        {
          question: "abc",
          correct_answer: "zxc",
          incorrect_answers: ["qwe", "rty", "uio"],
        },
      ],
    };
  });

  test("should render with delete and edit btns", () => {
    render(renderWithRedux(<QuizItem quiz={quiz} isUser={true} />, "/", store));
    expect(screen.getByTestId("edit-btn")).toBeInTheDocument();
    expect(screen.getByTestId("quiz-del-btn")).toBeInTheDocument();
  });

  test("should open link", () => {
    render(renderWithRedux(<QuizItem quiz={quiz} isUser={true} />, "/", store));
    userEvent.click(screen.getByTestId("open-link-btn"));
    expect(screen.getByTestId("quiz-link")).toBeInTheDocument();
  });

  test("should call delete function", () => {
    render(renderWithRedux(<QuizItem quiz={quiz} isUser={true} />, "/", store));
    userEvent.click(screen.getByTestId("quiz-del-btn"));
    expect(CustomQuizService.deleteQuiz).toHaveBeenCalled();
  });
});
