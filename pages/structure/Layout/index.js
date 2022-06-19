import React, { createContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

/**
 * Context for the auth process
 * @type {import("react").Context<import("./types").LayoutContext>}
 */
export const AuthContext = createContext();
const { Provider } = AuthContext;

export default function Layout({ children }) {
  const { data, status } = useSession();

  const [state, setState] = useState({
    status: "loading",
    user: undefined,
  });

  useEffect(() => {
    if (status === "authenticated") {
      setState({
        status,
        user: {
          email: data.user.email,
          name: data.user.name,
          image: data.user.image,
        },
      });
    }

    if (status === "unauthenticated") {
      setState({
        user: null,
        status,
      });
    }
  }, [data, status]);

  return (
    <Provider
      value={{
        status: state.status,
        user: state.user,
      }}
    >
      <main>{children}</main>
    </Provider>
  );
}
