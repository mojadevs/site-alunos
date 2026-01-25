"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>
        <span className={styles.prof}>Prof.</span>{" "}
        <span className={styles.ana}>Ana</span>
      </h2>

      <ul className={styles.menu}>
        <li>
          <Link
            href="/"
            className={`${styles.navegation} ${
              pathname === "/" ? styles.selected : ""
            }`}
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            href="/chat"
            className={`${styles.navegation} ${
              pathname === "/chat" ? styles.selected : ""
            }`}
          >
            Chat
          </Link>
        </li>
        <li>
          <Link
        href="https://wa.me/5512981207619"
        className={`${styles.navegation}`}
      >
        Contato
      </Link>
        </li>
      </ul>

    </header>
  );
}
