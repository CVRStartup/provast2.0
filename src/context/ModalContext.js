import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export function ModelContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editRollNumber, setEditRollNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [zipFilename, setZipFilename] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [modalJob, setModalJob] = useState(null);
  const [modalJobResume, setModalJobResume] = useState(null);
  const [education, setEducation] = useState(null);
  const [personal, setPersonal] = useState(null);
  const [modalQues, setModalQues] = useState(null);
  const [jobEligibleStudents, setJobEligibleStudents] = useState([]);

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }
  const state = {
    isOpen,
    setIsOpen,
    form,
    setForm,
    closeModal,
    openModal,
    isEdit,
    setIsEdit,
    editId,
    setEditId,
    editRollNumber,
    setEditRollNumber,
    loading,
    setLoading,
    zipFilename,
    setZipFilename,
    sidebarOpen,
    setSidebarOpen,
    rightOpen,
    setRightOpen,
    modalJob,
    setModalJob,
    setDeleteName,
    deleteName,
    modalJobResume,
    setModalJobResume,
    education,
    setEducation,
    personal,
    setPersonal,
    modalQues,
    setModalQues,
    jobEligibleStudents,
    setJobEligibleStudents,
  };
  return <ModelContext.Provider value={state}>{children}</ModelContext.Provider>;
}
export function useModelContext() {
  return useContext(ModelContext);
}
