import Layout from "pages/structure/Layout";
import "styles/structure/Layout/index.scss";
import "styles/globals.css";
import MenuLogged from "pages/structure/MenuLogged";
import "react-image-gallery/styles/scss/image-gallery.scss";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <Layout>
        <MenuLogged />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
