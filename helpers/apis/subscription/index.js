import axios from "axios";

/**
 * Get the status subscription of the logged account
 * @returns {import("pages/api/app/subscription/get").ResGetSubscriptionI}
 */
export async function getStatusSubscription() {
  try {
    const { data } = await axios.get("/api/app/subscription", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    return {
      date: null,
      isSubscribed: false,
    };
  }
}
