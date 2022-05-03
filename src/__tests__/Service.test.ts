import axios from "axios";
import Service from "../Services/Service";

jest.mock("axios");

describe("main service tests", () => {
  test("getCategories should return categories", async () => {
    (axios as any).get.mockReturnValue([1, 2, 3]);
    const cat = await Service.getCategories();
    expect(cat).toEqual([1, 2, 3]);
  });

  test("getQuestions", async () => {
    (axios as any).get.mockReturnValue([1, 2, 3]);
    const cat = await Service.getQuestions("1", "2", "3", "4");
    expect(axios.get).toBeCalled();
  });
  
  test("getQuestionCount", async () => {
    (axios as any).get.mockReturnValue([1, 2, 3]);
    const cat = await Service.getQuestionCount("1");
    expect(axios.get).toBeCalledWith(
      "https://opentdb.com/api_count.php?category=1"
    );
  });
});
