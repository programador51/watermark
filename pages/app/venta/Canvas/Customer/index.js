import React from "react";
import scss from "../index.module.scss";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useContext } from "react";
import { CanvasContext } from "..";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function Customer() {
  const watermark = useContext(CanvasContext);

  return (
    <details className={scss.configurationCollpase}>
      <summary>Más información de venta</summary>
      <div className={scss.editor}>
        <ReactQuill
          style={{
            borderRadius: "5px",
            border: "none",
            color: "white",
            margin: "10px 0",
          }}
          modules={{
            toolbar: [
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          value={watermark?.notes}
          onChange={watermark?.setNotes}
          placeholder="Adjunta toda la información necesaria una vez que hallas recibido informacion del pago, por ejemplo, fotos de la transferencia, numero del folio, banco emisor, recibo de paypal, etc. Con el fin de poder identificar la marca de agua con datos de la persona"
        />
      </div>
    </details>
  );
}
