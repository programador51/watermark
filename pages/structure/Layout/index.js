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
    (async function () {
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

      try {
        const resToken = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/app`,
          {
            credentials: "include",
            method: "GET",
          }
        );

        /**
         * Information of the authentication
         * @type {import("./types").JwtAuthI}
         */
        const { isAuthenticated, message } = await resToken.json();

        if (!isAuthenticated) {
          setState({
            user: null,
            status: "unauthenticated",
          });
          return;
        }
      } catch (error) {
        setState({
          user: null,
          status: "unauthenticated",
        });
        return;
      }

      if (status === "unauthenticated") {
        setState({
          user: null,
          status,
        });
      }
    })();
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
