import { NextResponse } from "next/server";
import { openChatApi } from "../../lib/openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { erro: "Prompt inválido" },
        { status: 400 }
      );
    }

    const res = await openChatApi(prompt);

    return NextResponse.json({
      resposta: res.choices[0].message.content,
    });

  } catch (error) {
    console.error("Erro no server:", error.message);

    return NextResponse.json(
      { erro: error.message || "Erro interno" },
      { status: 500 }
    );
  }
}
