import React from "react";
import styles from "./index.module.scss";

/**
 * Render a button
 * @param {React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>} props
 * @returns {JSX.Element}
 */
export default function Button(props) {
  return (
    <button {...props} className={styles.customBtn}>
      {props.children}
    </button>
  );
}
