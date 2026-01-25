import { NextResponse } from "next/server";
import { openChatApi } from "../../lib/openai";

const rateLimit = new Map(); // IP -> timestamp
const LIMIT_TIME = 10_000; // 10 segundos

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { erro: "Prompt inválido" },
        { status: 400 }
      );
    }

    // 🔎 pega IP do usuário
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    const now = Date.now();
    const lastTime = rateLimit.get(ip) || 0;

    if (now - lastTime < LIMIT_TIME) {
      const wait = Math.ceil((LIMIT_TIME - (now - lastTime)) / 1000);
      return NextResponse.json(
        { erro: `Espere ${wait}s antes de perguntar novamente.` },
        { status: 429 }
      );
    }

    rateLimit.set(ip, now);

    const res = await openChatApi(prompt);

    return NextResponse.json({
      resposta: res.choices[0].message.content,
    });

  } catch (error) {
    console.error("Erro no server:", error);

    return NextResponse.json(
      { erro: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
