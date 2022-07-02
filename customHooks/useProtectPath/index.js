import { useEffect } from "react";
import useNavigation from "customHooks/useNavigation";

export default function useProtectPath({
  isFetched = false,
  userName = undefined,
}) {
  const { redirectToHome } = useNavigation();

  useEffect(() => {
    // Redirect, user is not logged
    if (isFetched === true && userName === undefined) redirectToHome();
  }, [isFetched, userName]);
}
