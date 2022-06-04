import { useState } from "react";

export default function useSession() {
  const [state, setState] = useState({
    userName: undefined,
    email: undefined,
  });

  return {
    userName: state.userName,
    email: state.email,
  };
}
