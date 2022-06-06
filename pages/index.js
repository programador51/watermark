import Head from "next/head";
import Image from "next/image";
import { createContext } from "react";
import useSession from "./customHooks/useSession";
import Dashboard from "./dashboard";
import Venta from "./venta";

const ContextSession = createContext();
const { Provider } = ContextSession;

export default function Home() {
  const useSessionValues = useSession();

  return <p>Hola</p>;
}
