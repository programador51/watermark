import { useRouter } from "next/router";

export default function useNavigation() {
  const router = useRouter();

  const redirectToHome = () => router.push("/");
  const redirectToDashboard = () => router.push("/app/dashboard");

  return {
    redirectToHome,
    redirectToDashboard,
  };
}
