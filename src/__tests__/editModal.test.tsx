import { render, screen } from "@testing-library/react";
import { createStore } from "redux";
import { UserQuizes } from "../components/pages/UserQuizes";
import { rootReducer } from "../redux/rootReducer";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";
import { loadUserQuizes } from "../redux/actionCreators";
import userEvent from "@testing-library/user-event";
import CustomQuizService from "../Services/CustomQuizService";

jest.mock("../Services/CustomQuizService");

describe("edit modal tests", () => {
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

  test("opening", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    expect(screen.getAllByTestId("edit-btn")[0]).toBeInTheDocument();
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    expect(screen.getByTestId("edit-modal")).toBeInTheDocument();
  });

  test("should work name input", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    expect(screen.getByTestId("quiz-name-input")).toContainHTML("Name");
    userEvent.type(screen.getByTestId("quiz-name-input"), "123");
    expect(screen.getByTestId("quiz-name-input")).toContainHTML("Name123");
  });

  test("should add questions", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.click(screen.getByTestId("add-question-btn"));
    expect(screen.getAllByTestId("create-form-item").length).toBe(2);
  });

  test("should call submit function", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.click(screen.getByTestId("edit-submit"));
    expect(CustomQuizService.editQuiz).toHaveBeenCalled();
  });

  test("should show delete question btn", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.click(screen.getByTestId("add-question-btn"));
    userEvent.click(screen.getByTestId("add-question-btn"));
    userEvent.click(screen.getByTestId("add-question-btn"));
    expect(screen.getByTestId("question-del-btn")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("question-del-btn"));
    expect(screen.queryByTestId("question-del-btn")).not.toBeInTheDocument();
  });

  test("should add and delete wrong answers", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.click(screen.getAllByTestId("add-wrong-item")[0]);
    const length = screen.getAllByTestId("wrong-answer").length;
    expect(length).toBe(4);
    userEvent.click(screen.getAllByTestId("delete-answer-btn")[0]);
    expect(screen.getAllByTestId("wrong-answer").length).toBe(3);
  });

  test("should work question input", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.type(screen.getByTestId("question-input"), "123");
    expect(screen.getByTestId("question-input")).toContainHTML("abc123");
  });

  test("should work correct answer input", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.type(screen.getByTestId("right-answer-input"), "123");
    expect(screen.getByTestId("right-answer-input")).toContainHTML("zxc123");
  });
  
  test("should work incorrect answer input", () => {
    render(renderWithRedux(<UserQuizes />, "/", store));
    store.dispatch(loadUserQuizes([quiz, quiz]));
    userEvent.click(screen.getAllByTestId("edit-btn")[0]);
    userEvent.type(screen.getAllByTestId("wrong-answer-input")[0], "123");
    expect(screen.getAllByTestId("wrong-answer-input")[0]).toContainHTML(
      "qwe123"
    );
  });
});
