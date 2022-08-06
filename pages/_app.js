import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "aos/dist/aos.css";
import Layout from "../src/components/layout";
import { useEffect } from "react";
import { useUser } from "../src/lib/hooks";
import { ModelContextProvider } from "../src/context/ModalContext";
import { ResumeContextProvider } from "../src/context/ResumeContext";
import { AssessmentContextProvider } from "../src/context/AssessmentContext";
import { DownloadResumeFilterContextProvider } from "../src/context/DownloadResumeFilterContext";
import { ToastContainer, toast } from "react-toastify";
import { Modal } from "../src/components/Layout/Modal";

export default function App({ Component, pageProps }) {
  const user = useUser();

  useEffect(async () => {
    const AOS = await import("../src/lib/aos");
    AOS.init();
  }, []);
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
