import Icon from "pages/atoms/Icons";
import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

/**
 * Render a search input
 * @param {object} props - Props
 * @param {(value:string)=>void?} props.onSearch - Value of the input when button search or clear is pressed
 * @returns {JSX.Element}
 */
export default function SearchInput({ onSearch = () => {} }) {
  const [value, setValue] = useState("");

  return (
    <div className={styles.search}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value === "" ? null : (
        <button
          onClick={() => {
            setValue("");
            onSearch("");
          }}
          className={styles.clear}
        >
          <Icon icon="close" />
        </button>
      )}

      <button onClick={() => onSearch(value)}>
        <Icon icon="search" />
      </button>
    </div>
  );
}
