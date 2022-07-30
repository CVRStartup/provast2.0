import { Switch } from "@headlessui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const Toggle = ({
  id,
  name,
  caption,
  description,
  setEnabled,
  handleDelete,
  handleEdit,
  enabled = true,
}) => {
  return (
    <div className='flex border border-1 w-full justify-between items-center border-gray-600 p-4 rounded-sm'>
      <div className='w-3/4'>
        <div className='flex items-center'>
          <p className='text-sm truncate font-semibold mr-3'>{name}</p>
          <div className='flex flex-row justify-center'>
            <button
              className='hover:text-yellow-300 text-gray-200 mr-2'
              onClick={() => {
                handleEdit(id);
              }}
            >
              <FaEdit size={15} />
            </button>
            <button
              className='hover:text-red-500 text-gray-200'
              onClick={() => {
                handleDelete(id);
              }}
            >
              <MdDelete size={15} />
            </button>
          </div>
        </div>
        {caption && <p className='text-xs font-semibold mt-1 text-gray-300'>{caption}</p>}

        {description && (
          <p className='text-sm text-gray-300 truncate overflow-hidden text-ellipsis w-[4/5] mt-2'>
            {description}
          </p>
        )}
      </div>
      <div>
        <Switch
          checked={enabled}
          onChange={() => setEnabled(!enabled, id)}
          className={classNames(
            enabled ? "bg-orange-600" : "bg-gray-500",
            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
          )}
        >
          <span className='sr-only'>Use setting</span>
          <span
            aria-hidden='true'
            className={classNames(
              enabled ? "translate-x-5" : "translate-x-0",
              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200"
            )}
          />
        </Switch>
      </div>
    </div>
  );
};
