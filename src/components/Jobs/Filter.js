import React, { useEffect, useState } from "react";
const sortBy = [
  { id: 1, name: "Created At", value: "created_at" },
  { id: 2, name: "Ending At", value: "ending_at" },
  { id: 3, name: "Stipend", value: "stipend" },
  { id: 4, name: "Alphabetical", value: "alphabetical" },
];
const sortOrder = [
  { id: 1, name: "Ascending", value: "asc" },
  { id: 2, name: "Descending", value: "desc" },
];

export const Filter = ({ applyFilters, jobs, setFilteredJobs }) => {
  const [filter, setFilter] = useState({
    keyword: "",
    sort_by: "created_at",
    sort_order: "desc",
    minimum_salary_filter: 0,
    minimum_ctc_filter: 0,
    allow_active: true,
    allow_inactive: true,
    role: { iandf: true, f: true, i: true },
  });
  useEffect(() => {
    applyFilters(filter, jobs, setFilteredJobs);
  }, [filter]);
  return (
    <div className="p-4 pb-2 w-full">
      <p className="block text-[13.8px] font-bold text-gray-900 mb-2">Filters</p>

      <div className="mb-3 sm:mt-0 sm:col-span-1">
        <input
          type="text"
          name="name"
          id="name"
          value={filter.keyword}
          onChange={(e) => setFilter({ ...filter, keyword: e.target.value })}
          placeholder="Search"
          className="max-w-md py-1 plac block w-full shadow-sm border-gray-300 rounded-md"
        />
      </div>

      <div>
        <fieldset className="space-y-5">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="active"
                  aria-activeribedby="active"
                  name="active"
                  type="checkbox"
                  checked={filter.allow_active}
                  onChange={(val) => {
                    setFilter({ ...filter, allow_active: !filter.allow_active });
                  }}
                  className={`${
                    filter.allow_active ? "focus:ring-orange-500" : ""
                  } h-4 w-4 rounded focus:ring-orange-500 text-orange-500 border-gray-300 `}
                />
              </div>
              <div className="ml-2 text-[13.3px]">
                <label htmlFor="active" className="font-medium text-gray-700">
                  Active
                </label>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="inactive"
                  aria-describedby="inactive"
                  name="inactive"
                  type="checkbox"
                  checked={filter.allow_inactive}
                  onChange={(val) => {
                    setFilter({
                      ...filter,
                      allow_inactive: !filter.allow_inactive,
                    });
                  }}
                  className={`${
                    filter.allow_inactive ? "focus:ring-orange-500" : ""
                  } h-4 w-4 rounded focus:ring-orange-500 text-orange-500 border-gray-300 `}
                />
              </div>
              <div className="ml-2 text-[13.3px]">
                <label htmlFor="inactive" className="font-medium text-gray-700">
                  Inactive
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div>
        {/* <p className='text-sm font-medium text-gray-700 mt-2 mb-1'>Type</p> */}

        <fieldset className="space-y-5 mt-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="intern"
                  aria-internribedby="intern"
                  name="intern"
                  type="checkbox"
                  checked={filter.role.i}
                  onChange={(val) => {
                    setFilter({
                      ...filter,
                      role: { ...filter.role, i: !filter.role.i },
                    });
                  }}
                  className={`${
                    filter.role.i ? "focus:ring-orange-500" : ""
                  } h-4 w-4 rounded focus:ring-orange-500 text-orange-500 border-gray-300 `}
                />
              </div>
              <div className="ml-2 text-[13.3px]">
                <label htmlFor="intern" className="font-medium text-gray-700">
                  Internship
                </label>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="full"
                  aria-describedby="full"
                  name="full"
                  type="checkbox"
                  checked={filter.role.f}
                  onChange={(val) => {
                    setFilter({
                      ...filter,
                      role: { ...filter.role, f: !filter.role.f },
                    });
                  }}
                  className={`${
                    filter.role.f ? "focus:ring-orange-500" : ""
                  } h-4 w-4 rounded focus:ring-orange-500 text-orange-500 border-gray-300 `}
                />
              </div>
              <div className="ml-2 text-[13.3px]">
                <label htmlFor="full" className="font-medium text-gray-700">
                  Full Time
                </label>
              </div>
            </div>
            {/* <div className='relative flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='iandf'
                  aria-describedby='iandf'
                  name='iandf'
                  type='checkbox'
                  checked={filter.role.iandf}
                  onChange={(val) => {
                    setFilter({
                      ...filter,
                      role: { ...filter.role, iandf: !filter.role.iandf },
                    });
                  }}
                  className={`${
                    filter.role.iandf ? "focus:ring-orange-500" : ""
                  } h-4 w-4 rounded focus:ring-orange-500 text-orange-500 border-gray-300 `}
                />
              </div>
              <div className='ml-2 text-[13.3px]'>
                <label htmlFor='iandf' className='font-medium text-gray-700'>
                  Both
                </label>
              </div>
            </div> */}
          </div>
        </fieldset>
      </div>

      <div>
        <div className="grid grid-cols-1 gap-1 mt-2">
          <div>
            <div className="flex justify-between text-[13.3px] font-medium text-gray-700">
              <p className="block text-[13.3px] font-medium text-gray-700">Stipend</p>
              <p>{"₹" + Number(filter.minimum_salary_filter).toLocaleString("en-IN")}</p>
            </div>
            <div className="">
              <input
                type="range"
                min={0}
                max={500000}
                step={5000}
                className="w-full "
                value={filter.minimum_salary_filter}
                onInput={(ev) => {
                  setFilter({
                    ...filter,
                    minimum_salary_filter: ev.target.value,
                  });
                }}
                style={{
                  accentColor: "orange",
                }}
              ></input>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[13.3px] font-medium text-gray-700">
              <p>CTC</p>
              <p> {"₹" + Number(filter.minimum_ctc_filter).toLocaleString("en-IN")}</p>
            </div>
            <div className="">
              <input
                type="range"
                min={0}
                max={500000}
                step={5000}
                className="w-full "
                value={filter.minimum_ctc_filter}
                onInput={(ev) => {
                  setFilter({
                    ...filter,
                    minimum_ctc_filter: ev.target.value,
                  });
                }}
                style={{
                  accentColor: "orange",
                }}
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-1 grid grid-cols-1 gap-2">
        <div>
          <label htmlFor="sortby" className="block text-[13.3px] font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sortby"
            name="sortby"
            className="mt-1 block w-full pl-3 pr-10 py-0 text-base border-gray-300 sm:text-[13.3px] rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            defaultValue="Created At"
            value={filter.sort_by}
            onChange={(e) => setFilter({ ...filter, sort_by: e.target.value })}
          >
            {sortBy.map((sort) => (
              <option value={sort.value} key={sort.id}>
                {sort.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sortOrder" className="block text-[13.3px] font-medium text-gray-700">
            Sort Order
          </label>
          <select
            id="sortOrder"
            name="sortOrder"
            className="mt-1 block w-full pl-3 pr-10 py-0 text-base border-gray-300 sm:text-[13.3px] rounded focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            defaultValue="Created At"
            value={filter.sort_order}
            onChange={(e) => setFilter({ ...filter, sort_order: e.target.value })}
          >
            {sortOrder.map((sort) => (
              <option value={sort.value} key={sort.id}>
                {sort.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={(e) =>
          setFilter({
            keyword: "",
            sort_by: "created_at",
            sort_order: "desc",
            minimum_salary_filter: 0,
            minimum_ctc_filter: 0,
            allow_active: true,
            allow_inactive: true,
            role: {
              i: true,
              iandf: true,
              f: true,
            },
          })
        }
        className="mt-3 text-xs text-orange-600 bg-orange-100 px-2 py-1 font-semibold rounded-[3px] tracking-wider hover:bg-orange-200"
      >
        Clear
      </button>
    </div>
  );
};
