import Button from "pages/atoms/Button";
import React, { useContext } from "react";
import { CanvasContext } from "..";
import scss from "../index.module.scss";
import { SpinnerDotted } from "spinners-react";

export default function Download() {
  const waterMarks = useContext(CanvasContext);

  const canSave = !waterMarks?.canvas.length <= 0 ? false : true;

  return waterMarks?.isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <SpinnerDotted />
      <p>No cierres esta ventana...</p>
    </div>
  ) : (
    <div className={scss.downloadButtons}>
      <Button
        disabled={canSave}
        onClick={waterMarks?.promptDownloadConfirmation}
      >
        Descargar
      </Button>
      <Button disabled={canSave} onClick={waterMarks?.downloadRandomImage}>
        Descargar una previa
      </Button>
    </div>
  );
}
