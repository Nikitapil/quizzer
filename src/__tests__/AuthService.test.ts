import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AuthService from "../Services/AuthService";
import { get, getDatabase, set, update } from "firebase/database";
jest.mock("firebase/auth");
jest.mock("firebase/database");

describe("Auth service tests", () => {
  test("createuser should be called", () => {
    AuthService.register({
      email: "email",
      password: "password",
      name: "name",
    });
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(getAuth).toHaveBeenCalled();
  });

  test("getDataBase and set should have been called", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    await AuthService.register({
      email: "email",
      password: "password",
      name: "name",
    });
    expect(getDatabase).toHaveBeenCalled();
  });

  test("signout should be called", () => {
    AuthService.signOut();
    expect(signOut).toHaveBeenCalled();
  });

  test("sign-in must call signin from firebase", () => {
    AuthService.signIn({ email: "email", password: "password" });
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

  test("get name should return a name", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    (get as any).mockReturnValue({ val: () => ({ name: "Name" }) });
    const name = await AuthService.getName();
    expect(name).toBe("Name");
  });

  test("updateInfo should call update", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    await AuthService.updateInfo({ name: "Vasya" });
    expect(update).toHaveBeenCalled();
  });
  
  test("should not call functions without auth when it needed", async () => {
    (getAuth as any).mockReturnValue({ currentUser: null });
    await AuthService.register({
      email: "email",
      password: "password",
      name: "name",
    });
    await AuthService.getName();
    await AuthService.updateInfo({ name: "Vasya" });
    expect(update).toHaveBeenCalledTimes(0);
    expect(get).toHaveBeenCalledTimes(0);
    expect(set).toHaveBeenCalledTimes(0);
    expect(getDatabase).toHaveBeenCalledTimes(0);
  });
});
