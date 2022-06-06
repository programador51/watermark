import { useState } from "react";

/**
 * Manage the session of the user loged in
 * @returns {import("./types").useSessionValuesI}
 */
export default function useSession() {
  const [state, setState] = useState({
    userName: "angywii",
    email: undefined,
  });

  return {
    userName: state.userName,
    email: state.email,
  };
}
