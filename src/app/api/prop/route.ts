import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    if (!description) return NextResponse.json({ error: "Missing description" }, { status: 400 });
    // Try to use OpenAI DALL·E if available
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) throw new Error("No OpenAI API key");
      const res = await fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          prompt: description,
          n: 1,
          size: "512x512"
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return NextResponse.json({ images: data.data.map((img: any) => img.url) });
    } catch (err) {
      // Fallback placeholder
      return NextResponse.json({ images: [], note: "TODO: Connect to real image API. " + (err.message || err) });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Unknown error" }, { status: 500 });
  }
} 