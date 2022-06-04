import React from "react";
import styles from "./index.module.scss";

export default function Content({ children }) {
  return <section className={styles.content}>{children}</section>;
}
