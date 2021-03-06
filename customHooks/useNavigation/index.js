import { useRouter } from "next/router";

export default function useNavigation() {
  const router = useRouter();

  const redirectToHome = () => router.push("/");
  const redirectToDashboard = () => router.push("/app/dashboard");
  const redirectToConfiguration = () => router.push("/app/configuracion");
  const redirectToSubscription = () => router.push("/app/subscripcion");
  const redirectToSell = () => router.push("/app/venta");

  return {
    redirectToHome,
    redirectToDashboard,
    redirectToConfiguration,
    redirectToSubscription,
    redirectToSell,
  };
}
