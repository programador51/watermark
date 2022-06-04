import React, { useEffect, useRef, useState } from "react";
import MenuLogged from "pages/structure/MenuLogged";
import Content from "pages/structure/LayoutContent";
import { Dropzone, FileItem } from "@dropzone-ui/react";
import Button from "pages/atoms/Button";
import styles from "./index.module.scss";
import Canvas from "./Canvas";

export default function Venta() {
  /**
   * @type {[import("@dropzone-ui/react").FileValidated[],()=>void]}
   */
  const [files, setFiles] = useState([]);

  /**
   * List of files uploaded
   * @param {import("@dropzone-ui/react").FileValidated[]} incommingFiles
   */
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
    //even your own upload implementation
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  // useEffect(() => {
  //   const a = document.getElementById("test");
  //   console.log(a.naturalWidth);
  // }, []);

  //   const image = new Image();
  //   const canvas = document.getElementById("canvasContainer");

  return (
    <>
      <MenuLogged title="Venta" />
      <Content>
        <Dropzone
          view="list"
          style={{
            width: "100%",
            background: "#c5c5c5",
            height: "25%",
            fontSize: "0.75rem",
          }}
          onChange={updateFiles}
          value={files}
          localization="ES-es"
          label="Cargar fotografias"
          accept="image/*"
        >
          {files.map((file) => (
            <>
              <FileItem {...file} onDelete={removeFile} key={file.id} info />`
            </>
          ))}
        </Dropzone>

        {files.map((file) => (
          <Canvas key={file.id} file={file} />
        ))}

        {/* {files.map((file) => (
          <canvas
            width="972"
            height="1600"
            style={{ border: "1px solid red" }}
          ></canvas>
        ))}

      
          alt=""
        /> */}

        <Button>Descargar</Button>
      </Content>
    </>
  );
}
