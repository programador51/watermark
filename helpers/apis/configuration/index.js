import axios from "axios";

/**
 * Update the configuration information of the logged profile
 * @param {import("./types").DtoUpdateProfile} dto
 */
export async function updateProfileConfiguration(dto) {
  try {
    const { data } = await axios.put(
      `/api/app/profile/configuration`,
      {
        profile: dto,
      },
      {
        withCredentials: true,
      }
    );
  } catch (error) {}
}
