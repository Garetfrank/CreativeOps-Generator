import { getEnv } from "./env";

export async function generateCaptions(text: string) {
  const apiKey = getEnv("CAPTIONS_AI_API_KEY");
  const url = "https://api.captions.ai/v1/generate";
  const body = {
    text,
    language: "en",
    // Add more options as needed
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }
    const data = await res.json();
    return data.captions || "";
  } catch (err) {
    throw err;
  }
} 