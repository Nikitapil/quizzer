import { decodeHTML } from "../utils/decodeHtml";

describe("decodeHtml function", () => {
  test("should decode html", () => {
    const input = "What&#039;s";
    const output = decodeHTML(input);
    expect(output).toBe("What's");
  });
});
