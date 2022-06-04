import React, { useState } from "react";
import styles from "../index.module.scss";
import Image from "next/image";

/**
 * Component in order to put the watermark to each file image uploaded
 * @param {object} props
 * @param {import("@dropzone-ui/react").FileValidated} props.file - Information of the file validated
 * @returns {JSX.Element}
 */
export default function Canvas({ file }) {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  const uuid = window.crypto.randomUUID();

  return (
    <div className={styles.imageItem} key={file.id}>
      <img
        onLoad={(e) =>
          setDimensions({
            width: e.target.width,
            height: e.target.height,
          })
        }
        className=""
        src={URL.createObjectURL(file.file)}
      />
      <canvas height={dimensions.height} width={dimensions.width}></canvas>
    </div>
  );
}
