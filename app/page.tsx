import styles from "./home.module.css";
import Image from "next/image";

export default function Home(){
    return(
        <main className={styles.section}>
            <Image
                src="/images/image_1.png"
                alt="Logo"
                width={200}
                height={200}
                className={`${styles.image} ${styles.one}`}
            />
            <div className={styles.content}>
                <div className={`${styles.image} ${styles.two}`}>
                    <div className={`${styles.triangle}`}></div>
                    <Image
                        src="/images/image_2.png"
                        alt="Pessoa"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className={`${styles.flex} ${styles.center}`}>
                <h1 className={styles.title}>O melhor lugar para <span className={`${styles.color} ${styles.yellow}`}>aprender</span> & <span className={`${styles.color} ${styles.purple}`}>saber</span>, aprenda com a tecnologia!</h1>
                <p className={styles.subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, quibusdam alias? Modi quasi temporibus deserunt, iusto quaerat omnis, esse exercitationem ipsa, iure reiciendis perferendis totam ullam enim. Doloremque, tenetur sequi!</p>
                <button className={styles.button}
                >Começar</button>
            </div>
            <div className={styles.glow}></div>
        </main>
    )
}