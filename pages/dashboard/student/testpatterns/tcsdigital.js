import React from "react";

const people = [
  {
    name: "Traits",
    title: "Depends on the Company",
    email: "Medium",
    time: "1 Minutes",
  },
  {
    name: "Numerical Ability",
    title: "Depends on the Company",
    email: "Medium",
    time: "25 Minutes",
  },
  {
    name: "Verbal Ability",
    title: "Depends on the Company",
    email: "Medium",
    time: "25 Minutes",
  },
  {
    name: "Reasoning Ability",
    title: "Depends on the Company",
    email: "Medium",
    time: "25 Minutes",
  },
  {
    name: "Advanced Quantative Ability",
    title: "Depends on the Company",
    email: "Medium",
    time: "20 Minutes",
  },
  {
    name: "Advanced Reasoning Ability",
    title: "Depends on the Company",
    email: "Hard",
    time: "15 Minutes",
  },
  {
    name: "Advanced Coding",
    title: "Depends on the Company",
    email: "Hard",
    time: "55 Minutes",
  },
];

const tcsdigital = () => {
  return (
    <div className='w-3/4 mx-auto pt-10 px-4 sm:px-6 lg:px-8 pt-[10vh]'>
      <div className='sm:flex sm:items-center'>
        <div className='sm:flex-auto'>
          <h1 className='text-xl font-semibold text-gray-900'>TCS Digital Test Pattern</h1>
          <p className='mt-2 text-sm text-gray-700'>
            All the details given in the table are a rough estimate. The number of questions and
            time duration depends and may vary on the respective companies for which the exam is
            being conducted.
          </p>
        </div>
      </div>
      <div className='mt-8 flex flex-col'>
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-300'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Number Of Question
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Difficulty
                    </th>
                    <th
                      scope='col'
                      className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                    >
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white'>
                  {people.map((person, personIdx) => (
                    <tr
                      key={person.email}
                      className={personIdx % 2 === 0 ? undefined : "bg-gray-50"}
                    >
                      <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                        {person.name}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {person.title}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {person.email}
                      </td>
                      <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                        {person.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tcsdigital;
