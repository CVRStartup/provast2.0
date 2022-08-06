import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../src/components/layout";
import { useUser } from "../src/lib/hooks";
import { ModelContextProvider } from "../src/context/ModalContext";
import { ResumeContextProvider } from "../src/context/ResumeContext";
import { AssessmentContextProvider } from "../src/context/AssessmentContext";
import { DownloadResumeFilterContextProvider } from "../src/context/DownloadResumeFilterContext";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../src/components/Layout/Modal";

export default function App({ Component, pageProps }) {
  const user = useUser();
  return (
    <ResumeContextProvider>
      <AssessmentContextProvider>
        <ModelContextProvider>
          <DownloadResumeFilterContextProvider>
            <Modal />
            <Layout>
              <Component {...pageProps} user={user} />
              <ToastContainer />
            </Layout>
          </DownloadResumeFilterContextProvider>
        </ModelContextProvider>
      </AssessmentContextProvider>
    </ResumeContextProvider>
  );
}
