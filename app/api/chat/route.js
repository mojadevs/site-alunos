import { NextResponse } from "next/server";
import { openChatApi } from "../../lib/openai";

const rateLimit = new Map();
const LIMIT_TIME = 10_000; // 10 segundos

function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

function isValidPrompt(prompt) {
  const text = normalize(prompt);

  // vazio
  if (!text) return false;

  // muito curto
  if (text.length < 5) return false;

  if (text.length > 200) return false;

  // só números
  if (/^\d+$/.test(text)) return false;

  // só símbolos
  if (/^[^a-zà-ú]+$/i.test(text)) return false;

  return true;
}

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt inválido" },
        { status: 400 }
      );
    }

    if (!isValidPrompt(prompt)) {
    return Response.json(
      { error: "Pergunta invalida ou muito curta/longa." },
      { status: 400 }
    );
  }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    const now = Date.now();
    const lastTime = rateLimit.get(ip) || 0;

    if (now - lastTime < LIMIT_TIME) {
      const wait = Math.ceil((LIMIT_TIME - (now - lastTime)) / 1000);
      return NextResponse.json(
        { error: `Espere ${wait}s antes de perguntar novamente.` },
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
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
