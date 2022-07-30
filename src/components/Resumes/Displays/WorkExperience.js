import { BsPlusLg } from "react-icons/bs";
import { useModelContext } from "../../../context/ModalContext";
import { useResumeContext } from "../../../context/ResumeContext";
import { Toggle } from "./Shared/Toggle";
export const WorkExperienceDisplay = () => {
  const { setIsOpen, setForm, setIsEdit, setEditId, setSidebarOpen } = useModelContext();
  const { resume, work, setWork, debounceUpdateResume } = useResumeContext();
  const handleClick = () => {
    setSidebarOpen(false);
    setForm("workexperience");
    setIsOpen(true);
    setIsEdit(false);
  };
  const handleEdit = (id) => {
    setForm("workexperience");
    setIsOpen(true);
    setIsEdit(true);
    setEditId(id);
  };
  const setEnabled = (val, id) => {
    let newstate = work;
    for (let i = 0; i < newstate.length; i++) {
      if (newstate[i]._id === id) {
        newstate[i].enabled = val;
      }
    }
    setWork([...newstate]);
    debounceUpdateResume({ ...resume, work: newstate });
  };
  const handleDelete = (id) => {
    let newstate = work;
    let index = -1;
    for (let i = 0; i < newstate.length; i++) if (newstate[i]._id === id) index = i;
    if (index !== -1) newstate.splice(index, 1);
    debounceUpdateResume({ ...resume, work: newstate });
  };

  return (
    <div id="workexperience" className="text-white py-10 border-b-2 border-gray-600">
      <h2 className="mb-5 text-2xl">Internships</h2>
      <div className="mt-5">
        {work &&
          work.map((option) => {
            return (
              <Toggle
                key={option._id}
                id={option._id}
                name={option.company}
                caption={option.designation}
                description={option?.summary?.data}
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
          onClick={handleClick}
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
