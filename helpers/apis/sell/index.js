import axios from "axios";

/**
 * Create an album to sell
 * @param {string} id - Id of the album
 * @param {string[]} idsPhotos - Ids of the photos watermarked
 * @param {Blob} zip - Zipped file
 * @returns {boolean} If true, album was created correctly
 */
export async function createAlbum(id, idsPhotos, notes = null) {
  try {
    await axios.post("/api/app/sell", {
      id,
      idsPhotos,
      notes,
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Get the information of the album
 * @param {string} id - UUID of the file album
 * @returns {import("./types").SellInfoI}
 */
export async function getSellInformation(id) {
  try {
    if (id === null || id === undefined) {
      return {
        note: "",
        uuids: [],
      };
    }

    const { data } = await axios.get(`/api/app/sell/${id}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return {
      note: "",
      uuids: [],
    };
  }
}
