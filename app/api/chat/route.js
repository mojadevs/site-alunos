import { NextResponse } from "next/server";
import { openChatApi } from "../../lib/openai";

let lastReq = 0

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    const now = Date.now()

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { erro: "Prompt inválido" },
        { status: 400 }
      );
    }

  

  if(now - lastReq < 20000){
    return NextResponse.json(
      JSON.stringify({ resposta: "Espere 10 segundos..." }),
      { status: 429 }
    );
  }

  lastReq = now

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
