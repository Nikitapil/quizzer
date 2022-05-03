import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { SignUpModal } from "../components/SignUpModal";
import { setAuthError } from "../redux/actionCreators";
import { rootReducer } from "../redux/rootReducer";
import AuthService from "../Services/AuthService";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";

jest.mock("../Services/AuthService");
jest.mock("../redux/actionCreators");

describe("Sign up modal tests", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test("should work email input", () => {
    const closeModal = jest.fn();
    render(
      renderWithRedux(<SignUpModal closeModal={closeModal} />, "/", store)
    );
    userEvent.type(screen.getByTestId("email-input"), "qwe");
    expect(screen.getByTestId("email-input")).toContainHTML("qwe");
  });

  test("should validate name field", () => {
    const closeModal = jest.fn();
    render(
      renderWithRedux(<SignUpModal closeModal={closeModal} />, "/", store)
    );
    userEvent.click(screen.getByTestId("sign-up-btn"));
    expect(setAuthError).toHaveBeenCalled();
  });
  
  test("should call sign up function", () => {
    const closeModal = jest.fn();
    render(
      renderWithRedux(<SignUpModal closeModal={closeModal} />, "/", store)
    );
    userEvent.type(screen.getByTestId("name-input"), "qwe");
    userEvent.click(screen.getByTestId("sign-up-btn"));
    expect(AuthService.register).toHaveBeenCalled();
  });
});
