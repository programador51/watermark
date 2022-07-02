import { useSession } from "next-auth/react";
import useAuth from "../../customHooks/useSession";
import React from "react";

export default function App({ children }) {
  const { status, data } = useSession();
  useAuth({
    redirectOnUnauthorized: true,
    createAccountOnReadCookie: false,
  });

  return (
    <div>
      {status === "loading" ? (
        <p>Cargando cuenta...</p>
      ) : status === "authenticated" && data !== null ? (
        children
      ) : (
        <p>Inicia sesion</p>
      )}
    </div>
  );
}
