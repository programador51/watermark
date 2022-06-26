import React, { useState } from "react";
import Tooltip from "pages/atoms/Tooltip";
import scss from "./styles.module.scss";
import Icon from "pages/atoms/Icons";

/**
 * Render an input in order to put the token for go file
 * @param {import("./types").PropsI} props - Props
 * @returns {JSX.Element}
 */
export default function GoFileToken({ value = "", onChange = () => {} }) {
  const [token, setToken] = useState(value);

  const isValid = token.length <= 0 ? false : true;

  /**
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e) => {
    const inputValue = e.target.value;
    setToken(inputValue);
    onChange(inputValue, inputValue.length > 0 ? true : false);
  };

  return (
    <>
      <label
        className={`${!isValid ? "requiredInput" : ""} ${scss.tokenFiles}`}
        htmlFor="token"
      >
        Token archivos
        <Tooltip text={<Icon icon="info" />}>
          Este código es para cargar en tu nube privada los sets e información
          de las ventas
        </Tooltip>
      </label>
      <input
        className={!isValid ? "invalidInput" : ""}
        type="text"
        value={token}
        onChange={handleChange}
      />
    </>
  );
}
