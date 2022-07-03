import Chrome from "@uiw/react-color-chrome";
import React, { useContext } from "react";
import { CanvasContext } from "..";
import styles from "../index.module.scss";

//comments

export default function Label() {
  const waterMarks = useContext(CanvasContext);

  const showLeyendWatermark = waterMarks?.configuration.showWatermark
    ? true
    : false;

  return (
    <>
      <p className={styles.label}>Mostrar leyenda</p>
      <div className={styles.containerAgressiveWatermark}>
        <input
          id="showWatermark"
          type="radio"
          name="showCreatorWatermark"
          value="1"
          checked={showLeyendWatermark ? true : false}
          onChange={() => waterMarks?.updateWatermarkShow(true)}
        />
        <label htmlFor="showWatermark">Si</label>

        <input
          id="hideWatermark"
          type="radio"
          name="showCreatorWatermark"
          value="0"
          checked={showLeyendWatermark ? false : true}
          onChange={() => waterMarks?.updateWatermarkShow(false)}
        />
        <label htmlFor="hideWatermark">No</label>
      </div>

      {showLeyendWatermark ? (
        <>
          <div className={styles.sameLine}>
            <p className={styles.label}>Texto</p>
            <input
              className={styles.creatorWatermark}
              type="text"
              value={waterMarks?.configuration.watermark}
              onChange={(e) => waterMarks?.updateWatermark(e.target.value)}
            />
          </div>
          <div
            style={{
              margin: "20px 0",
            }}
            className={styles.sameLine}
          >
            <p className={styles.label}>Color leyenda</p>

            <Chrome
              color={waterMarks?.configuration.colorWatermark.enterprise}
              onChange={({ hexa }) => waterMarks?.updateColorEnterprise(hexa)}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
