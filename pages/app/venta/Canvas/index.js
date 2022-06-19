import Button from "pages/atoms/Button";
import React from "react";
import styles from "./index.module.scss";
import useWatermark from "pages/customHooks/useWatermak";

/**
 * Component in order to put the watermark to each file image uploaded
 * @param {import("./types").PropsI} props
 * @returns {JSX.Element} Canvas with the matermarks put in
 */
export default function Canvas({
  watermark = "",
  files = [],
  watermarkLevel = "low",
  sizeWatermark = 30,
}) {
  const {
    canvas,
    configuration,
    downloadRandomImage,
    isChecked,
    promptDownloadConfirmation,
    updateColorWatermark,
    updateDimensionsImage,
    updateWatermark,
    updateWatermarkLevel,
    updateWatermarkShow,
  } = useWatermark({
    watermark,
    files,
    watermarkLevel,
    sizeWatermark,
  });

  return (
    <>
      {canvas.map((canvas, i) => (
        <>
          <img
            style={{
              display: "none",
            }}
            onLoad={(e) =>
              updateDimensionsImage(e.target.width, e.target.height, i)
            }
            src={canvas.imageBlob}
          />

          <canvas
            style={{
              display: "none",
            }}
            id={canvas.idCanvas}
            height={canvas.dimensions.height}
            width={canvas.dimensions.width}
          ></canvas>
        </>
      ))}

      {canvas.length <= 0 ? null : (
        <div className={styles.configurations}>
          <b>Marca de agua venta</b>

          <div className={styles.color}>
            <p className={styles.label}>Color</p>
            <input
              type="color"
              value={configuration.colorWatermark.uuid}
              onChange={(e) => updateColorWatermark(e.target.value)}
            />
          </div>

          <p className={styles.label}>Agresividad</p>
          <div className={styles.containerAgressiveWatermark}>
            <input
              id="noneWatermark"
              type="radio"
              checked={isChecked("none")}
              name="watermarkLevel"
              onChange={() => updateWatermarkLevel("none")}
              value="none"
            />
            <label htmlFor="noneWatermark">Ninguna</label>

            <input
              id="lowWatermark"
              type="radio"
              name="watermarkLevel"
              value="low"
              checked={isChecked("low")}
              onChange={() => updateWatermarkLevel("low")}
            />
            <label htmlFor="lowWatermark">Baja</label>

            <input
              id="regularWatermark"
              type="radio"
              name="watermarkLevel"
              value="normal"
              checked={isChecked("normal")}
              onChange={() => updateWatermarkLevel("normal")}
            />
            <label htmlFor="regularWatermark">Normal</label>
          </div>
          <hr className={styles.separator} />
          <b className={styles.label}>Marca de agua creador</b>

          <div className={styles.sameLine}>
            <p className={styles.label}>Color</p>
            {/* <input
              type="color"
              value={configuration.colorWatermark.enterprise}
            /> */}
          </div>
          <p className={styles.label}>Mostrar</p>
          <div className={styles.containerAgressiveWatermark}>
            <input
              id="showWatermark"
              type="radio"
              name="showCreatorWatermark"
              value="1"
              checked={configuration.showWatermark ? true : false}
              onChange={() => updateWatermarkShow(true)}
            />
            <label htmlFor="showWatermark">Si</label>

            <input
              id="hideWatermark"
              type="radio"
              name="showCreatorWatermark"
              value="0"
              checked={configuration.showWatermark ? false : true}
              onChange={() => updateWatermarkShow(false)}
            />
            <label htmlFor="hideWatermark">No</label>
          </div>

          <div className={styles.sameLine}>
            <p className={styles.label}>Texto</p>
            <input
              className={styles.creatorWatermark}
              type="text"
              value={configuration.watermark}
              onChange={(e) => updateWatermark(e.target.value)}
            />
          </div>

          <hr className={styles.separator} />
          <Button onClick={promptDownloadConfirmation}>Descargar</Button>
          <Button
            onClick={downloadRandomImage}
            style={{ margin: "10px 0 0 0" }}
          >
            Descargar una previa
          </Button>
        </div>
      )}
    </>
  );
}
