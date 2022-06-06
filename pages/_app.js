import Layout from "pages/structure/Layout";
import "styles/structure/Layout/index.scss";
import "styles/globals.css";
import { createContext } from "react";
import useSession from "./customHooks/useSession";

/**
 * Context in order to manage the session of the user throught the app
 * @type {import("react").Context<import("./customHooks/useSession/types").useSessionValuesI>}
 */
export const ContextSession = createContext();
const { Provider } = ContextSession;

function MyApp({ Component, pageProps }) {
  const useSessionValues = useSession();

  return (
    <Provider value={useSessionValues}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
