import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import mime from "mime";
import { publishFilesToGoFile } from "helpers/gofile";
import { createAlbum } from "helpers/apis/sell";
import useNavigation from "../useNavigation";

const MySwal = withReactContent(Swal);

/**
 * Handle the configuration in order to create the images with the watermarks
 * @param {import("pages/venta/Canvas/types").PropsI} param0
 * @returns {import("./types").useWatermarkValuesI}
 */
export default function useWatermark({
  watermark = "",
  files = [],
  watermarkLevel = "low",
  sizeWatermark = 30,
}) {
  /**
   * Information of the files
   * @type {[import("pages/app/venta/Canvas/types").CanvasI[],()=>void]}
   */
  const [canvas, setCanvas] = useState([]);

  const [notes, setNotes] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const { redirectToDashboard } = useNavigation();

  const [configuration, setConfiguration] = useState({
    colorWatermark: {
      uuid: "#5e5e5e66",
      enterprise: "#000000",
    },
    watermarkLevel: watermarkLevel,
    watermark,
    showWatermark: true,
  });

  /**
   * Update the watermark of the image (creator)
   * @param {string} text - Update the text to display on the watermark of the creator
   * @returns {void}
   */
  const updateWatermark = (text) =>
    setConfiguration({
      ...configuration,
      watermark: text,
    });

  /**
   * Update the color to put on the enterprise
   * @param {string} enterprise - Color
   * @returns {void}
   */
  const updateColorEnterprise = (enterprise) =>
    setConfiguration({
      ...configuration,
      colorWatermark: {
        ...configuration.colorWatermark,
        enterprise,
      },
    });

  /**
   * Set if show the watermark creator
   * @param {boolean} show - If true, the watermark on the corner left down side will be show
   * @returns {void}
   */
  const updateWatermarkShow = (show) =>
    setConfiguration({
      ...configuration,
      showWatermark: show,
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

        putWatermark(configuration.watermarkLevel);
        if (configuration.showWatermark) putWatermarkCreator();

        /**
         * Render the watermark according the level selected
         * @param {import("pages/venta/Canvas/types").WatermarkLevel} level
         */
        function putWatermark(level) {
          switch (level) {
            case "none":
              break;

            case "low":
              putLowWatermark();
              break;

            case "normal":
              putNormalwatermark();
              break;

            default:
              break;
          }
        }

        function putNormalwatermark() {
          const heightBase = canva.dimensions.height / 3;

          context.fillText(
            canva.idCanvas,
            canva.dimensions.width / 2,
            heightBase * 0.5
          );

          context.fillText(
            canva.idCanvas,
            canva.dimensions.width / 2,
            heightBase * 1.5
          );

          context.fillText(
            canva.idCanvas,
            canva.dimensions.width / 2,
            heightBase * 2.5
          );
        }

        function putWatermarkCreator() {
          context.fillStyle = configuration.colorWatermark.enterprise;
          context.textAlign = "start";
          context.fillText(
            configuration.watermark,
            0,
            canva.dimensions.height - 10
          );
        }

        function putLowWatermark() {
          context.fillText(
            canva.idCanvas,
            canva.dimensions.width / 2,
            canva.dimensions.height / 2
          );
        }
      });
    })();
  }, [canvas, configuration]);

  const downloadWatermarkedImages = async () => {
    setIsLoading(true);

    const idAlbum = window.crypto.randomUUID();

    const zip = new JSZip();

    const photos = zip.folder(idAlbum);

    const canvasConvertion = canvas.map(async (canva) => {
      async function getBlobCanvas() {
        /**
         * Canvas HTML
         * @type {HTMLCanvasElement}
         */
        const domCanvas = document.getElementById(canva.idCanvas);

        /**
         * Blob from the canvas
         * @type {Blob}
         */
        const blobCanvas = await new Promise((resolve, reject) => {
          domCanvas.toBlob((blob) => {
            resolve(blob);
          });
        });

        return blobCanvas;
      }
      const blob = await getBlobCanvas();
      return blob;
    });

    const files = await Promise.all(canvasConvertion);

    files.forEach((blob, i) => {
      photos.file(
        `${canvas[i].idCanvas}.${mime.getExtension(blob.type)}`,
        blob
      );
    });

    /**
     * Zipped files
     * @type {Blob}
     */
    const blobZip = await new Promise((resolve, reject) => {
      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, `${idAlbum}.zip`);
        resolve(content);
      });
    });

    const wasAdded = await createAlbum(
      idAlbum,
      canvas.map((canva) => canva.idCanvas),
      notes
    );

    if (wasAdded) {
      MySwal.fire({
        title: "Venta creada",
        text: "Puedes consultar la informacion",
      });

      redirectToDashboard();
    }

    setIsLoading(false);
    // const { data, status } = await publishFilesToGoFile(blobZip, idAlbum);
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
            <b style={{ color: "black" }}>ya no podra ser cambiada</b>
          </p>
          <p style={{ color: "black", margin: "10px 0 0 0;" }}>
            <hr style={{ margin: "10px 0" }} />
            <b style={{ color: "black" }}>Nota</b>
            <ol style={{ color: "black" }}>
              <li style={{ color: "black" }}>
                Los archivos multimedia solo duraran 1 día para ser descargados,
                despue de estos seran borrados
              </li>
              <li style={{ color: "black" }}>
                Las evidencias de la compra y marcas de agua siempre estaran
                registrados
              </li>
            </ol>
          </p>
        </>
      ),
    }).then(({ isConfirmed, isDenied }) => {
      if (isConfirmed) {
        downloadWatermarkedImages();
        return;
      }
    });

  const downloadRandomImage = () => {
    const randomImage = Math.floor(Math.random() * canvas.length);
    const domCanvas = document.getElementById(canvas[randomImage].idCanvas);
    domCanvas.toBlob((blob) => {
      saveAs(blob, canvas[randomImage].idCanvas);
    });
  };

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

  return {
    canvas,
    configuration,
    updateWatermark,
    updateWatermarkShow,
    downloadWatermarkedImages,
    promptDownloadConfirmation,
    downloadRandomImage,
    updateColorWatermark,
    updateDimensionsImage,
    updateWatermarkLevel,
    updateColorEnterprise,
    isChecked,
    notes,
    setNotes,
    isLoading,
  };
}
