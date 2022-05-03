import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createStore } from "redux";
import { SignInModal } from "../components/SignInModal";
import { rootReducer } from "../redux/rootReducer";
import AuthService from "../Services/AuthService";
import { renderWithRedux } from "../utils/tests/utils/renderWithRedux";

jest.mock("../Services/AuthService");

describe("signInModal test", () => {
  let store: any;
  beforeEach(() => {
    store = createStore(rootReducer);
  });

  test("should work email input", () => {
    const closeModal = jest.fn();
    render(
      renderWithRedux(<SignInModal closeModal={closeModal} />, "/", store)
    );
    userEvent.type(screen.getByTestId("email-input"), "qwe");
    expect(screen.getByTestId("email-input")).toContainHTML("qwe");
  });
  
  test("should call sign in function", () => {
    const closeModal = jest.fn();
    render(
      renderWithRedux(<SignInModal closeModal={closeModal} />, "/", store)
    );
    userEvent.click(screen.getByTestId("sign-in-btn"));
    expect(AuthService.signIn).toHaveBeenCalled();
  });
});
