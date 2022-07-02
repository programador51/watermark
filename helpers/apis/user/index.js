import axios from "axios";

/**
 * Get the user session info of the user in order to protect the routes of the user
 * @param {string} email - Get the email of the user
 * @returns {void}
 */
export async function getUserSessionInfo(email) {
  try {
    const { data } = await axios.get(`/api/users/${email}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Close the session of the user
 * @returns {boolean} True if the session was closed
 */
export const closeSession = async () => {
  try {
    await axios.get("/api/users/close-sessions", {
      withCredentials: true,
    });

    return true;
  } catch (error) {
    return false;
  }
};
