import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import App from "../App";
import { getUserId } from "../redux/actionCreators";
import { rootReducer } from "../redux/rootReducer";
import AuthService from "../Services/AuthService";
import { UserAction } from "../types/userTypes";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";

jest.mock("../Services/AuthService");

describe("NavBar tests", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test("shoul open sign in modal", () => {
    render(renderWithRedux(<App />, "/", store));
    userEvent.click(screen.getByTestId("signin-link"));
    expect(screen.getByTestId("sign-in-modal")).toBeInTheDocument();
  });

  test("shoul open sign up modal", () => {
    render(renderWithRedux(<App />, "/", store));
    userEvent.click(screen.getByTestId("signup-link"));
    expect(screen.getByTestId("sign-up-modal")).toBeInTheDocument();
  });
  
  test("should call logout", () => {
    render(renderWithRedux(<App />, "/", store));
    store.dispatch(getUserId("123") as UserAction);
    userEvent.click(screen.getByTestId("signout-link"));
    expect(AuthService.signOut).toHaveBeenCalled();
  });
});
