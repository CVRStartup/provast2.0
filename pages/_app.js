import "../styles/globals.css";
import Layout from "../src/components/layout";
import { useUser } from "../src/lib/hooks";

export default function App({ Component, pageProps }) {
  const user = useUser();
  return (
    <Layout>
      <Component {...pageProps} user={user} />;
    </Layout>
  );
}
