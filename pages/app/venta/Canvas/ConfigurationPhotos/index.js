import Chrome from "@uiw/react-color-chrome";
import React from "react";
import { useContext } from "react";
import { CanvasContext } from "..";
import styles from "../index.module.scss";

export default function ConfigurationPhotos() {
  const waterMarks = useContext(CanvasContext);

  return (
    <>
      <div className={styles.color}>
        <p className={styles.label}>Color marca de agua</p>
        <Chrome
          color={waterMarks?.configuration.colorWatermark.uuid}
          onChange={({ hexa }) => waterMarks?.updateColorWatermark(hexa)}
        />
      </div>

      <p className={styles.label}>Agresividad marca de agua fotos</p>
      <div className={styles.containerAgressiveWatermark}>
        <input
          id="noneWatermark"
          type="radio"
          checked={waterMarks?.isChecked("none")}
          name="watermarkLevel"
          onChange={() => waterMarks?.updateWatermarkLevel("none")}
          value="none"
        />
        <label htmlFor="noneWatermark">Ninguna</label>

        <input
          id="lowWatermark"
          type="radio"
          name="watermarkLevel"
          value="low"
          checked={waterMarks?.isChecked("low")}
          onChange={() => waterMarks?.updateWatermarkLevel("low")}
        />
        <label htmlFor="lowWatermark">Baja</label>

        <input
          id="regularWatermark"
          type="radio"
          name="watermarkLevel"
          value="normal"
          checked={waterMarks?.isChecked("normal")}
          onChange={() => waterMarks?.updateWatermarkLevel("normal")}
        />
        <label htmlFor="regularWatermark">Normal</label>
      </div>
      <hr className={styles.separator} />
    </>
  );
}
