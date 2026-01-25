"use client";

import { useState } from "react";
import styles from "./chat.module.css";

export default function ChatPage() {
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

      if (!res.ok) throw new Error("Erro no servidor");

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
    <main className={styles.container}>
      {resposta && (
        <div className={styles.respostaBox}>
          <h2 className={styles.titulo}>Orientação:</h2>
          <p className={styles.resposta}>{resposta}</p>
        </div>
      )}

      <div className={styles.chatBox}>
        <textarea
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Digite sua dúvida ou exercício..."
          className={styles.textarea}
        />

        <button
          onClick={enviarPergunta}
          disabled={loading}
          className={styles.botao}
        >
          {loading ? "Pensando..." : "Enviar"}
        </button>
      </div>

      <div className={styles.glow}></div>
    </main>
  );
}
