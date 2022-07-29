import { createContext, useContext, useState } from "react";

const DownloadResumeFilterContext = createContext();

export function DownloadResumeFilterContextProvider({ children }) {
  const [filter, setFilter] = useState({
    removeCollegeName: false,
    removePhoneNumber: false,
    removeEmail: false,
    removeImage: false,
  });
  const [downloadOpen, setDownloadOpen] = useState(false);
  const state = {
    filter,
    setFilter,
    downloadOpen,
    setDownloadOpen,
  };
  return (
    <DownloadResumeFilterContext.Provider value={state}>
      {children}
    </DownloadResumeFilterContext.Provider>
  );
}
export function useDownloadResumeFilterContext() {
  return useContext(DownloadResumeFilterContext);
}
