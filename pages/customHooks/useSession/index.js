import { AuthContext } from "pages/structure/Layout";
import { useEffect } from "react";
import { useContext } from "react";
import { useRouter } from "next/router";

export default function useSession({
  redirectOnUnauthorized = true,
  createAccountOnReadCookie = false,
}) {
  const { status } = useContext(AuthContext);

  const router = useRouter();

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
    })();
  }, []);
}
