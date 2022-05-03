import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import App from "../App";
import { getUserId } from "../redux/actionCreators";
import { rootReducer } from "../redux/rootReducer";
import { UserAction } from "../types/userTypes";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";

describe("router-test", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test("should have rigth links for non-authorized", () => {
    render(renderWithRedux(<App />, "/", store));
    expect(screen.getByTestId("main-link")).toBeInTheDocument();
    expect(screen.getByTestId("customquizes-link")).toBeInTheDocument();
    expect(screen.getByTestId("signin-link")).toBeInTheDocument();
    expect(screen.getByTestId("signup-link")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-link")).not.toBeInTheDocument();
    expect(screen.queryByTestId("signout-link")).not.toBeInTheDocument();
    store.dispatch(getUserId("123") as UserAction);
    expect(screen.getByTestId("profile-link")).toBeInTheDocument();
    expect(screen.getByTestId("signout-link")).toBeInTheDocument();
  });

  test("should open right pages(Custom quizes)", () => {
    render(renderWithRedux(<App />, "", store));
    const customquizesLink = screen.getByTestId("customquizes-link");
    userEvent.click(customquizesLink);
    expect(screen.getByTestId("customquizes-page")).toBeInTheDocument();
  });

  test("should open right pages(QuestionPage)", () => {
    render(renderWithRedux(<App />, "", store));
    const questionsLink = screen.getByTestId("open-questions");
    userEvent.click(questionsLink);
    expect(screen.getByTestId("question-page")).toBeInTheDocument();
  });
  
  test("should open error page when uregitered go into profile", () => {
    render(renderWithRedux(<App />, "/profile", store));
    expect(screen.getByTestId("error-page")).toBeInTheDocument();
  });

  test("should open profile pages", () => {
    render(renderWithRedux(<App />, "/", store));
    store.dispatch(getUserId("123") as UserAction);
    expect(screen.getByTestId("profile-link")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("profile-link"));
    expect(screen.getByTestId("profile-page")).toBeInTheDocument();
    const infoLink = screen.getByTestId("info-link");
    const quizesLink = screen.getByTestId("quizes-link");
    const createLink = screen.getByTestId("create-link");
    userEvent.click(infoLink);
    expect(screen.getByTestId("info-page")).toBeInTheDocument();
    userEvent.click(quizesLink);
    expect(screen.getByTestId("userquizes-page")).toBeInTheDocument();
    userEvent.click(createLink);
    expect(screen.getByTestId("create-page")).toBeInTheDocument();
  });
});
