import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../src/components/layout";
import { useUser } from "../src/lib/hooks";
import { ModelContextProvider } from "../src/context/ModalContext";
import { ResumeContextProvider } from "../src/context/ResumeContext";
import { DownloadResumeFilterContextProvider } from "../src/context/DownloadResumeFilterContext";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../src/components/Layout/Modal";

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
