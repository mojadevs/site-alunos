"use client";

import { useState } from "react";
import styles from "./chat.module.css";
import ReactMarkdown from "react-markdown";
import { isError } from "util";

export default function ChatPage() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState(false);
  
  async function enviarPergunta() {
    if (!pergunta.trim() || loading || cooldown > 0) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: pergunta }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResposta(data.error || "Erro ao enviar pergunta");
        setStatus(true);
        return;
      }
      setStatus(false);
      setResposta(data.resposta);

      setCooldown(10);
      const interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      console.error(error);
      setResposta("Ocorreu um erro ao processar sua pergunta.");
    } finally {
      setPergunta("");
      setLoading(false);
    }
  }


  return (
    <main className={styles.container}>
      {resposta && (
        <div className={styles.respostaBox}>
          <h2 className={styles.titulo}>Orientação:</h2>
          <div className={`${styles.resposta} ${
            status ? styles.erro : styles.normal
            }`}>
            <ReactMarkdown>{resposta}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className={styles.chatBox}>
        <textarea
          value={pergunta}
          
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Digite sua dúvida ou exercício..."
          className={styles.textarea}
          disabled={loading}
        />

        <button
          onClick={enviarPergunta}
          disabled={loading || cooldown > 0}
          className={styles.botao}
        >
          {loading
            ? "Pensando..."
            : cooldown > 0
            ? `Aguarde ${cooldown}s`
            : "Enviar"}
        </button>
      </div>
 
    </main>
  );
}
