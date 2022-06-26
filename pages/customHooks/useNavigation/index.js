import { useRouter } from "next/router";

export default function useNavigation() {
  const router = useRouter();

  const redirectToHome = () => router.push("/");
  const redirectToDashboard = () => router.push("/app/dashboard");
  const redirectToConfiguration = () => router.push("/app/configuracion");

  return {
    redirectToHome,
    redirectToDashboard,
    redirectToConfiguration,
  };
}
