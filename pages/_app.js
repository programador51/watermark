import Layout from "pages/structure/Layout";
import "styles/structure/Layout/index.scss";
import "styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
