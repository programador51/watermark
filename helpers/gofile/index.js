const URL_BASE = "https://api.gofile.io";

/**
 * Get the server in order to upload files
 * @returns {string} File of the server where can be uploaded the files
 */
async function getServer() {
  try {
    const res = await fetch(`${URL_BASE}/getServer`);

    /**
     * @type {import("./types").GetServerI}
     */
    const api = await res.json(res);

    return api.data.server;
  } catch (error) {
    throw error;
  }
}

/**
 * Upload the watermarked files to go file serivce
 * @param {Blob} zippedFiles - Zipped files
 */
export async function publishFilesToGoFile(
  zippedFiles,
  fileName = window.crypto.randomUUID()
) {
  try {
    const serverName = await getServer();

    const formData = new FormData();
    formData.append("file", zippedFiles, `${fileName}.zip`);

    const res = await fetch(`https://${serverName}.gofile.io/uploadFile`, {
      method: "POST",
      body: formData,
    });

    /**
     * Information of the file
     * @type {import("./types").UploadFileRes}
     */
    const api = await res.json();

    return api;
  } catch (error) {
    throw error;
  }
}
