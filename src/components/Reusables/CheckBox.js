import React from "react";

export const CheckBox = ({ title, options, setCheckedOptions, checkedOptions }) => {
  return (
    <>
      {/* <h4 className="font-semibold bg-gray-100 px-2 py-3">
        <p>{title}</p>
      </h4> */}
      <fieldset className='px-5 py-3'>
        <div className='grid grid-cols-5 relative flex items-start'>
          {options?.map((category) => {
            return (
              <div key={category.id} className='mb-2 flex mr-4'>
                <div className='flex items-center h-5 w-6'>
                  <input
                    id={category.name}
                    name={category.name}
                    type='checkbox'
                    checked={checkedOptions.includes(category.name)}
                    onChange={(e) => {
                      const id = checkedOptions.indexOf(category.name);
                      if (id == -1) setCheckedOptions([...checkedOptions, category.name]);
                      else {
                        const cat = checkedOptions;
                        cat.splice(id, 1);
                        setCheckedOptions([...cat]);
                      }
                    }}
                    className='h-4 w-4 text-orange-600 border-gray-300 rounded'
                  />
                </div>
                <div className='ml-1 text-sm'>
                  <label htmlFor={category.name} className='font-medium text-gray-700'>
                    {category.name}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
    </>
  );
};
