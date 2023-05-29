import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Ensure to store your key safely!
  const { input } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      cache: "force-cache",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Input ${input} : Act as text to emoji converter for the given input convert
        that as text, I only want the emojis in the output`,
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response}`);
    }
    const data = await response.json();
    console.log(data["choices"][0].message.content);
    return NextResponse.json({
      emojiLanguage: data["choices"][0].message.content,
    });
  } catch (error) {
    console.error("Fetch API error: ", error);
    return NextResponse.error();
  }
}
