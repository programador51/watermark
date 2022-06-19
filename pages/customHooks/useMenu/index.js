import { useState } from "react";
import useNavigation from "pages/customHooks/useNavigation";

export default function useMenu() {
  const navigation = useNavigation();

  const [showExpand, setShowExpand] = useState(false);

  const closeMenu = () => setShowExpand(false);

  const redirectToHome = () => {
    navigation.redirectToHome();
    closeMenu();
  };

  const redirectToDashboard = () => {
    navigation.redirectToDashboard();

    closeMenu();
  };

  return {
    showExpand,
    redirectToHome,
    setShowExpand,
    redirectToDashboard,
  };
}
