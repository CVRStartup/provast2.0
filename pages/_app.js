import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Layout from "../src/components/layout";
import { useUser } from "../src/lib/hooks";
import { ModelContextProvider } from "../src/context/ModalContext";

const ToastContainer = dynamic(() => import("../src/lib/toast_container"));

export default function App({ Component, pageProps }) {
  const user = useUser();
  return (
    <ModelContextProvider>
      <Layout>
        <Component {...pageProps} user={user} />
        <ToastContainer />
      </Layout>
    </ModelContextProvider>
  );
}
