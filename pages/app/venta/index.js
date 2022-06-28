import React, { useState } from "react";
import Content from "pages/structure/LayoutContent";
import { Dropzone, FileItem, FullScreenPreview } from "@dropzone-ui/react";

import Canvas from "./Canvas";
import { useSession } from "next-auth/react";
import App from "..";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "pages/structure/Layout";
import useNavigation from "pages/customHooks/useNavigation";

export default function Venta() {
  /**
   * @type {[import("@dropzone-ui/react").FileValidated[],()=>void]}
   */
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const { redirectToSubscription } = useNavigation();

  const { data } = useSession();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === undefined) return;
    if (user.subscription < new Date()) redirectToSubscription();
  }, [user]);

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
    <App>
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
          watermark={`https://www.onlynudes.com/${data?.user.name}`}
          watermarkLevel="none"
        />
      </Content>
    </App>
  );
}
