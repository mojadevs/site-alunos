"use client";

import { useState } from "react";

export default function Home() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);

  async function enviarPergunta() {
  if (!pergunta.trim() || loading) return;

  setLoading(true);

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: pergunta }),
    });

    if (!res.ok) {
      throw new Error("Erro no servidor");
    }

    const data = await res.json();
    setResposta(data.resposta || "Erro ao obter resposta");

  } catch (error) {
    console.error(error);
    setResposta("Ocorreu um erro ao processar sua pergunta.");

  } finally {

    setLoading(false);
  }
}

  return (
    <main className="min-h-screen flex items-center justify-center bg-(--cor-fundo-primaria) text-white">
      <div className="w-full max-w-2xl p-6 bg-(--cor-fundo-secundaria) rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Plataforma de Apoio ao Estudo
        </h1>

        <textarea
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Digite sua dúvida ou exercício..."
          className="w-full p-3 rounded bg-(--cor-fundo-terciaria) text-white resize-none"
          rows={4}
        />

        <button
          onClick={enviarPergunta}
          disabled={loading}
          className="w-full mt-4 bg-(--cor-primaria) hover:bg-(--cor-secundaria) transition rounded py-2 font-semibold"
        >
          {loading ? "Pensando..." : "Enviar"}
        </button>

        {resposta && (
          <div className="mt-6 bg-(--cor-fundo-terciaria) p-4 rounded">
            <h2 className="font-semibold mb-2">Orientação:</h2>
            <p className="whitespace-pre-line">{resposta}</p>
          </div>
        )}
      </div>
    </main>
  );
}
