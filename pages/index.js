import Button from "./atoms/Button";
import styles from "./styles.module.scss";
import Content from "./structure/LayoutContent";
import "react-quill/dist/quill.snow.css";

export default function Home() {
  return (
    <Content>
      <div className={styles.containerIndex}>
        <h1>Only Nudes - Protege tu contenido</h1>
        <p>
          Comparte tu contenido con registros para trackear filtraciones en la
          web
        </p>

        <div className={styles.gallery}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/model-1.png" alt="model-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/model-2.png" alt="model-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/model-3.png" alt="model-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/model-4.png" alt="model-1" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/model-5.png" alt="model-1" />
        </div>

        <div className={styles.navigationIndex}>
          <Button>Demo</Button>
          <Button>Más información</Button>
        </div>
      </div>
    </Content>
  );
}
