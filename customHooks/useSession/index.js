import { AuthContext } from "../../pages/structure/Layout";
import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { closeSession } from "../../helpers/apis/user";

export default function useSession({
  redirectOnUnauthorized = true,
  createAccountOnReadCookie = false,
}) {
  const { status } = useContext(AuthContext);
  AuthContext;
  const router = useRouter();

  const handleCloseSession = async () => {
    const wasClosed = await closeSession();

    if (wasClosed) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (status === "unauthenticated" && redirectOnUnauthorized) {
      router.push("/");
    }
  }, [status]);

  useEffect(() => {
    (async function () {
      if (createAccountOnReadCookie === true) {
        try {
          const res = await fetch(`/api/users`);
          const apiUsers = await res.json();
          console.log(apiUsers.users);
        } catch (error) {
          console.log(error);
        }
      }

      console.log("validando token interno...");
    })();
  }, []);

  return {
    handleCloseSession,
  };
}
