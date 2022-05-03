import { render, screen } from "@testing-library/react";
import { createStore } from "redux";
import { SingleQuestion } from "../components/SingleQuestion";
import { rootReducer } from "../redux/rootReducer";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";

describe("single question component tests", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });
  const question = {
    question: "qwe",
    correct_answer: "asd",
    incorrect_answers: ["poi", "qaz", "wsx"],
  };

  test("should call next func", async () => {
    const nextQuestion = jest.fn();
    render(
      renderWithRedux(
        <SingleQuestion question={question} nextQuestion={nextQuestion} />,
        "/",
        store
      )
    );
    expect(screen.getAllByTestId("answer-item").length).toBe(4);
  });
});
