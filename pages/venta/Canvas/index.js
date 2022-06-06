import Button from "pages/atoms/Button";
import React, { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import styles from "./index.module.scss";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Toggle from "react-toggle";
import "react-toggle/style.css";

const MySwal = withReactContent(Swal);

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
  /**
   * State in order to create the canvas with the watermarks
   * @type {[import("./types").CanvasI[],()=>void]}
   */
  const [canvas, setCanvas] = useState([]);
  const [configuration, setConfiguration] = useState({
    colorWatermark: {
      uuid: "#5e5e5e66",
      enterprise: "black",
    },
    watermarkLevel: watermarkLevel,
    watermark,
  });

  useEffect(() => {
    const infoCanvas = files.map((file) => ({
      idCanvas: window.crypto.randomUUID(),
      imageBlob: URL.createObjectURL(file.file),
      dimensions: {
        width: 0,
        height: 0,
      },
      file: file,
    }));
    setCanvas(infoCanvas);
  }, [files]);

  useEffect(() => {
    (async function () {
      canvas.forEach(async (canva) => {
        const canvasDom = document.getElementById(canva.idCanvas);

        /**
         * Canvas
         * @type {CanvasRenderingContext2D}
         */
        const context = canvasDom.getContext("2d");
        const imgBitMap = await createImageBitmap(canva.file.file);

        const percentageScale = +`0.${sizeWatermark}`;
        const sizeFont = (percentageScale * canva.dimensions.width) / 10;

        context.drawImage(imgBitMap, 0, 0);
        context.font = `${sizeFont}px arial`;
        context.fillStyle = configuration.colorWatermark.uuid;

        context.textAlign = "center";
        context.fillText(
          canva.idCanvas,
          canva.dimensions.width / 2,
          canva.dimensions.height / 2
        );

        context.fillStyle = configuration.colorWatermark.enterprise;
        context.textAlign = "start";
        context.fillText(
          configuration.watermark,
          0,
          canva.dimensions.height - 10
        );
      });
    })();
  }, [canvas, configuration]);

  const downloadWatermarkedImages = () => {
    canvas.forEach((canva) => {
      const domCanvas = document.getElementById(canva.idCanvas);
      domCanvas.toBlob((blob) => {
        saveAs(blob, canva.idCanvas);
      });
    });
  };

  const promptDownloadConfirmation = () =>
    MySwal.fire({
      icon: "warning",
      showDenyButton: true,
      denyButtonText: "No",
      confirmButtonText: "Si",
      title: <p style={{ color: "black" }}>¿Continuar con descarga?</p>,
      html: (
        <>
          <p style={{ color: "black" }}>
            Al confirmar la descarga se creara el log de tracking. Esta
            información{" "}
            <b style={{ color: "black" }}>ya no podra ser cambiada</b> con el
            fin de poder dar un seguimiento sin informacion
            tergiversada/alterada de posibles filtraciones dentro de plataformas
            fuera de las permitidas por el creador.
          </p>
          <p style={{ color: "black", margin: "10px 0 0 0;" }}>
            <b style={{ color: "black" }}>Nota:</b> Ninguna imagen es enviada a
            travez de internet con el fin de salvar guardar el derecho
            intelectual de las imagenes
          </p>
        </>
      ),
    }).then(({ isConfirmed, isDenied }) => {
      if (isConfirmed) {
        downloadWatermarkedImages();
        return;
      }
    });

  /**
   * Update the color to use on the uuid color watermark for the pictures
   * @param {string} hexCode - Hex code
   * @returns {void}
   */
  const updateColorWatermark = (hexCode) =>
    setConfiguration({
      ...configuration,
      colorWatermark: {
        ...configuration.colorWatermark,
        uuid: hexCode,
      },
    });

  /**
   * Update the dimensions of the file once it's reveal the dimensions
   * @param {number} width - Width of the image
   * @param {number} height - Height of the image
   * @param {number} index - Position of the file on the list
   */
  const updateDimensionsImage = (width, height, index) => {
    let unrefFile = [...canvas];
    unrefFile[index].dimensions = {
      height,
      width,
    };
    setCanvas(unrefFile);
  };

  /**
   * Update the level of the watermark
   * @param {import("./types").WatermarkLevel} value - Value of the input selected
   * @returns {void}
   */
  const updateWatermarkLevel = (value) =>
    setConfiguration({
      ...configuration,
      watermarkLevel: value,
    });

  /**
   * Check if the radio button must be selected
   * @param {import("./types").WatermarkLevel} value - Value of the input selected
   * @returns {void}
   */
  const isChecked = (value) =>
    value === configuration.watermarkLevel ? true : false;

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

            <input
              id="agressiveWatermark"
              type="radio"
              name="watermarkLevel"
              value="agressive"
              checked={isChecked("agressive")}
              onChange={() => updateWatermarkLevel("agressive")}
            />
            <label htmlFor="agressiveWatermark">Agresiva</label>
          </div>
          <hr className={styles.separator} />
          <b className={styles.label}>Marca de agua creador</b>

          <div className={styles.sameLine}>
            <p className={styles.label}>Color</p>
            <input
              type="color"
              value={configuration.colorWatermark.enterprise}
            />
          </div>
          <p className={styles.label}>Mostrar</p>
          <div className={styles.containerAgressiveWatermark}>
            <input
              id="showWatermark"
              type="radio"
              name="showCreatorWatermark"
              value="1"
              // checked={isChecked("normal")}
              onChange={() => updateWatermarkLevel("normal")}
            />
            <label htmlFor="showWatermark">Si</label>

            <input
              id="hideWatermark"
              type="radio"
              name="showCreatorWatermark"
              value="0"
              // checked={isChecked("normal")}
              onChange={() => updateWatermarkLevel("normal")}
            />
            <label htmlFor="hideWatermark">No</label>
          </div>

          <div className={styles.sameLine}>
            <p className={styles.label}>Texto</p>
            <input
              className={styles.creatorWatermark}
              type="text"
              value={configuration.watermark}
            />
          </div>

          <hr className={styles.separator} />
          <Button onClick={promptDownloadConfirmation}>Descargar</Button>
          <Button style={{ margin: "10px 0 0 0" }}>Descargar una previa</Button>
        </div>
      )}
    </>
  );
}
