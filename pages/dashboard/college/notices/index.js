import moment from "moment";
import Link from "next/link";
import React from "react";
import { useNotices } from "../../../../src/hooks/useNotices";
import { getLoginSession } from "../../../../src/lib/auth";
import { findUser } from "../../../../src/lib/user";
import axios from "axios";
import { toast } from "react-toastify";
import { mutate } from "swr";

const Notice = ({ user }) => {
  const { notices, isLoading } = useNotices(user);

  const deleteHandler = async (id) => {
    const { data } = await axios.delete(`/api/notices?id=${id}`);
    if (data.message === "Notice Removed") {
      await mutate(
        `/api/notices?collegename=${user?.college?.name}&collegecode=${user?.college?.code}`
      );
      toast.success(data.message, {
        toastId: data.message,
      });
    }
  };

  return (
    <div className='px-5 min-h-screen overflow-auto w-[100%] pt-[10vh]'>
      <div className='mt-4 mx-auto rounded-md h-14 px-10 bg-gray-800 flex items-center justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate'>
            Notices
          </h2>
        </div>
        <div className='mt-4 flex md:mt-0 md:ml-4'>
          <Link href='/dashboard/college/notices/add'>
            <a className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500'>
              Publish
            </a>
          </Link>
        </div>
      </div>
      {notices?.length > 0 ? (
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='mt-8 flex flex-col'>
            <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
              <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                        >
                          SNo.
                        </th>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Author Name
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Status
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Last Edited
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white'>
                      {notices?.map((notice, noticeIdx) => (
                        <tr
                          key={notice._id}
                          className={noticeIdx % 2 === 0 ? undefined : "bg-gray-50"}
                        >
                          <td className='truncate whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:underline cursor-pointer sm:pl-6'>
                            {noticeIdx + 1}
                          </td>
                          <Link href={`/dashboard/college/notices/${notice._id}/edit`}>
                            <td className='truncate whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 hover:underline cursor-pointer sm:pl-6'>
                              {notice.title}
                            </td>
                          </Link>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {notice.author.name}
                          </td>

                          <td className='whitespace-nowrap px-3 py-4 uppercase text-green-600 text-sm font-semibold'>
                            {notice.status}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 uppercase text-gray-500 text-sm'>
                            {moment(new Date(notice.updatedAt)).format("YYYY-MM-DD HH:mm:ss")}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4  text-gray-500 text-sm'>
                            <button
                              onClick={() => deleteHandler(notice._id)}
                              className='text-red-500'
                            >
                              Delete
                            </button>
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
      ) : (
        <h3 className='mt-3 text-lg text-gray-800'>There are no notices posted by you.</h3>
      )}
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate=59");
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;
  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  if (!user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }
  if (user.category !== "college") {
    return {
      redirect: {
        destination: "/dashbaord/" + user.category,
        permanent: false,
      },
    };
  }
  if (!user.approved) {
    return {
      redirect: {
        destination: "/approvalpending",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default Notice;
