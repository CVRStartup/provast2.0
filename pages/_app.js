import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import Layout from "../src/components/layout";
import { useUser } from "../src/lib/hooks";
import { ModelContextProvider } from "../src/context/ModalContext";
import { ResumeContextProvider } from "../src/context/ResumeContext";
import { DownloadResumeFilterContextProvider } from "../src/context/DownloadResumeFilterContext";
const Modal = dynamic(() => import("../src/components/Layout/Modal").then((mod) => mod.Modal));
const ToastContainer = dynamic(() => import("../src/lib/toast_container"));

export default function App({ Component, pageProps }) {
  const user = useUser();
  return (
    <ResumeContextProvider>
      <ModelContextProvider>
        <DownloadResumeFilterContextProvider>
          <Modal />
          <Layout>
            <Component {...pageProps} user={user} />
            <ToastContainer />
          </Layout>
        </DownloadResumeFilterContextProvider>
      </ModelContextProvider>
    </ResumeContextProvider>
  );
}
