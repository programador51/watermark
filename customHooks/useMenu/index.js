import { useState } from "react";
import useNavigation from "customHooks/useNavigation";

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

  const redirectToConfiguration = () => {
    navigation.redirectToConfiguration();
    closeMenu();
  };

  const redirectToSubscription = () => {
    navigation.redirectToSubscription();
    closeMenu();
  };

  return {
    showExpand,
    redirectToHome,
    setShowExpand,
    redirectToConfiguration,
    redirectToDashboard,
    redirectToSubscription,
  };
}
