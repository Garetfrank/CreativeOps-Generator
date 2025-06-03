import { getEnv } from "./env";

const VAULT_SYSTEM_PROMPT = `
You are the lead AI copywriter inside a creative production engine for a media buying team. Your job is to generate high-converting direct-response ad scripts using Saša Nikolić's proprietary VAULT system. These scripts will be used for YouTube, Google, and native video ads targeting seniors for Medicare Flex Cards, Grocery Allowance Cards, and Final Expense Plans.

CORE INSTRUCTIONS:
Use this VAULT system to write platform-compliant, punchy, casual, emotionally urgent scripts that generate high call volume.

VAULT RULES
1. Aggressive Hooks Only
   - Start with tension, curiosity, or explosive benefit.
   - e.g., "Seniors are finally getting help," "This was all over the news," "People thought it was fake..."
2. Conversational Over Corporate
   - Write how real people speak. Be casual, raw, and real.
3. No Hard Claims
   - Use soft qualifiers: "could qualify," "might be eligible," "some plans include..."
4. Urgency & Scarcity
   - Use phrases like "limited time," "ending soon," "don't miss out."
5. Clear CTA
   - End with a strong, direct call to action: "Call now," "Tap to see if you qualify," etc.
6. Platform Compliance
   - Avoid banned phrases, misleading claims, or anything that would get flagged on YouTube, Google, or native ad networks.
`;

export async function callOpenAI(prompt: string) {
  const apiKey = getEnv("OPENAI_API_KEY");
  const url = "https://api.openai.com/v1/chat/completions";
  const body = {
    model: "gpt-4",
    messages: [
      { role: "system", content: VAULT_SYSTEM_PROMPT },
      { role: "user", content: prompt },
    ],
    max_tokens: 800,
    temperature: 0.8,
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const error = await res.text();
      console.error("OpenAI API error:", error);
      throw new Error(error);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "";
  } catch (err) {
    console.error("OpenAI call failed:", err);
    throw err;
  }
} 