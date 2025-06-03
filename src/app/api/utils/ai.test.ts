import { callOpenAI } from "./ai";

describe("callOpenAI", () => {
  it("should return a string (mocked)", async () => {
    // Mock environment variable
    process.env.OPENAI_API_KEY = "test-key";
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: "Test script" } }] })
    }) as any;
    const result = await callOpenAI("Test prompt");
    expect(typeof result).toBe("string");
    expect(result).toBe("Test script");
  });
}); 