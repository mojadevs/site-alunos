import styles from "./header.module.css";

export default function Header(){
    return(
    <header className={` ${styles.header}`}>
            <h2>Prof. Ana</h2>
            <ul className={styles.flex}>
                <li className={`${styles.navegation} ${styles.selected}`}>
                    home
                </li>
                <li className={`${styles.navegation}`}>
                    chat
                </li>
            </ul>
            <span className={styles.navegation}>contato</span>
        </header>
    )
}