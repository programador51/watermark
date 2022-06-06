import React, { useContext, useState } from "react";
import MenuLogged from "pages/structure/MenuLogged";
import Content from "pages/structure/LayoutContent";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

import styles from "./index.module.scss";
import Canvas from "./Canvas";
import { ContextSession } from "pages/_app";

export default function Venta() {
  /**
   * @type {[import("@dropzone-ui/react").FileValidated[],()=>void]}
   */
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const { userName } = useContext(ContextSession);

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

  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };

  return (
    <>
      <MenuLogged title="Venta" />
      <Content>
        <Dropzone
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
              <FileItem
                {...file}
                onSee={handleSee}
                preview
                hd
                onDelete={removeFile}
                key={window.crypto.randomUUID()}
              />
              `
            </>
          ))}

          <div
            style={{
              zIndex: "100",
            }}
          >
            <FullScreenPreview
              imgSource={imageSrc}
              openImage={imageSrc}
              onClose={(e) => handleSee(undefined)}
            />
          </div>
        </Dropzone>

        <Canvas
          files={files}
          watermark={`https://www.onlynudes.com/${userName}`}
        />
      </Content>
    </>
  );
}
