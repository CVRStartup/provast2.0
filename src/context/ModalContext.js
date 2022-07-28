import { createContext, useContext, useState } from "react";

const ModelContext = createContext();

export function ModelContextProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState("");
  const [zipFilename, setZipFilename] = useState("");
  const [deleteName, setDeleteName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [modalJob, setModalJob] = useState(null);

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
  };
  return <ModelContext.Provider value={state}>{children}</ModelContext.Provider>;
}
export function useModelContext() {
  return useContext(ModelContext);
}
