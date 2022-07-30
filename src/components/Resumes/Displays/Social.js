import { BsPlusLg } from "react-icons/bs";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { Toggle } from "./Shared/Toggle";
export const SocialDisplay = () => {
  const { setIsOpen, setForm, setIsEdit, setEditId, setSidebarOpen } = useModelContext();
  const { resume, social, setSocial, debounceUpdateResume } = useResumeContext();
  const handleAdd = () => {
    setSidebarOpen(false);
    setForm("social");
    setIsOpen(true);
    setIsEdit(false);
  };
  const handleEdit = (id) => {
    setForm("social");
    setIsOpen(true);
    setIsEdit(true);
    setEditId(id);
  };
  const setEnabled = (val, id) => {
    let newstate = social;
    for (let i = 0; i < newstate.length; i++) {
      if (newstate[i]._id === id) {
        newstate[i].enabled = val;
      }
    }
    setSocial([...newstate]);
    debounceUpdateResume({ ...resume, social: newstate });
  };
  const handleDelete = (id) => {
    let newstate = social;
    let index = -1;
    for (let i = 0; i < newstate.length; i++) if (newstate[i]._id === id) index = i;
    if (index !== -1) newstate.splice(index, 1);
    setSocial([...newstate]);
    debounceUpdateResume({ ...resume, social: newstate });
  };
  return (
    <div id="social" className="text-white pb-10 border-b-2 border-gray-600">
      <h2 className="mb-5 text-2xl">Social Network</h2>
      <div className="mt-5">
        {social &&
          social.map((option, index) => {
            return (
              <Toggle
                key={index}
                id={option._id}
                name={option.network}
                caption={option.username}
                enabled={option.enabled}
                setEnabled={setEnabled}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            );
          })}
      </div>
      <div className="flex justify-end">
        <button
          className="align-right flex items-center border-2 my-4 right-0 px-6 py-1 border-gray-600 rounded-md hover:text-gray-500 hover:border-white"
          onClick={handleAdd}
        >
          <span className="mr-2">
            <BsPlusLg size={13} />
          </span>
          Add
        </button>
      </div>
    </div>
  );
};
