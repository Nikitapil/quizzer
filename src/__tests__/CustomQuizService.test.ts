import { get, getDatabase, push, set, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import CustomQuizService from "../Services/CustomQuizService";
jest.mock("firebase/auth");
jest.mock("firebase/database");

describe("custom quiz service tests", () => {
  const quizData = {
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

  test("create function", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    (push as any).mockReturnValue({ key: "1234" });
    await CustomQuizService.createQuiz(quizData);
    expect(getDatabase).toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(2);
  });

  test("fetch user quizes", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    (get as any).mockReturnValue({
      val: () => ({ Quiz1: quizData, Quiz2: quizData }),
    });
    const data = await CustomQuizService.fetchUserQuizes();
    expect(data![0]).toEqual({ ...quizData, idUserQuiz: "Quiz1" });
  });

  test("getCustomQuizQuestions", async () => {
    (get as any).mockReturnValue({
      val: () => ({ "123": { questions: quizData.questions } }),
    });
    const questions = await CustomQuizService.getCustomQuizQuestions("123");
    expect(questions).toEqual(quizData.questions);
  });

  test("getAllQuizes", async () => {
    (get as any).mockReturnValue({
      val: () => ({ Quiz1: quizData, Quiz2: quizData }),
    });
    const quizes = await CustomQuizService.getAllQuizes();
    expect(quizes).toEqual([
      { ...quizData, id: "Quiz1" },
      { ...quizData, id: "Quiz2" },
    ]);
  });

  test("deleteQuiz", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    await CustomQuizService.deleteQuiz("123", "456");
    expect(set).toHaveBeenCalledTimes(2);
  });

  test("editQuiz", async () => {
    (getAuth as any).mockReturnValue({ currentUser: { uid: "123" } });
    await CustomQuizService.editQuiz("123", "456", quizData);
    expect(set).toHaveBeenCalledTimes(2);
  });

  test("should not call functions without auth when it needed", async () => {
    (getAuth as any).mockReturnValue({ currentUser: null });
    await CustomQuizService.createQuiz(quizData);
    await CustomQuizService.fetchUserQuizes();
    await CustomQuizService.deleteQuiz("123", "132");
    await CustomQuizService.editQuiz("123", "456", quizData);
    expect(push).toHaveBeenCalledTimes(0);
    expect(get).toHaveBeenCalledTimes(0);
    expect(set).toHaveBeenCalledTimes(0);
    expect(getDatabase).toHaveBeenCalledTimes(0);
  });
});
