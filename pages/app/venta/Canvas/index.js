import React from "react";
import styles from "./index.module.scss";
import useWatermark from "pages/customHooks/useWatermak";
import Customer from "./Customer";
import { createContext } from "react";
import ConfigurationPhotos from "./ConfigurationPhotos";
import Download from "./Download";
import Label from "./Label";

/**
 * Context canvas
 * @type {import("react").Context<import("./types").CanvasContext>}
 */
export const CanvasContext = createContext();
const { Provider } = CanvasContext;

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
  const waterMarks = useWatermark({
    watermark,
    files,
    watermarkLevel,
    sizeWatermark,
  });

  return (
    <Provider value={{ ...waterMarks }}>
      {waterMarks.canvas.map((canvas, i) => (
        <>
          <img
            style={{
              display: "none",
            }}
            onLoad={(e) =>
              waterMarks.updateDimensionsImage(
                e.target.width,
                e.target.height,
                i
              )
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
      <div className={styles.containerOptions}>
        {waterMarks.canvas.length <= 0 ? null : (
          <div
            style={{
              margin: "10px 0",
              minHeight: "30vh",
            }}
          >
            <details className={styles.configurationCollpase}>
              <summary>Configuracion fotos</summary>
              <div className={styles.configurations}>
                <ConfigurationPhotos />
                <Label />
              </div>
            </details>

            <Customer />
          </div>
        )}

        <Download />
      </div>
    </Provider>
  );
}
