import moment from "moment";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useNotices } from "../../../src/hooks/useNotices";
import { getLoginSession } from "../../../src/lib/auth";
import { findUser } from "../../../src/lib/user";
import axios from "axios";
import { mutate } from "swr";

const Notice = ({ user }) => {
  const { notices, isLoading } = useNotices(user);
  const [visbleNotices, setVisibleNotices] = useState([]);
  useEffect(() => {
    if (!notices || !user) return;
    const newVisibleNotices = notices.filter(
      (x) => x.visible.length === 0 || x.visible.some((x) => x.email === user?.email)
    );
    notices.forEach((notice) => {
      if (!notice.seen.some((x) => x.email === user?.email))
        axios.put("/api/notices", {
          ...notice,
          seen: [...notice.seen, { email: user?.email }],
        });
    });
    mutate(`/api/notices?collegename=${user?.college?.name}&collegecode=${user?.college?.code}`);
    setVisibleNotices([...newVisibleNotices]);
  }, [notices]);

  return (
    <div className='px-5 min-h-screen overflow-auto w-[100%] pt-[10vh] bg-gray-200'>
      <div className='mt-4 mx-auto rounded-md h-14 px-10 bg-gray-800 flex items-center justify-between'>
        <div className='flex-1 min-w-0'>
          <h2 className='text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate'>
            Notices
          </h2>
        </div>
      </div>
      {visbleNotices?.length > 0 ? (
        <div className='flex flex-col items-center mt-4'>
          {visbleNotices.map((x) => {
            return (
              <div className='w-[60%] bg-white p-4 rounded-md mb-4'>
                <div className='flex justify-start'>
                  <div className=' mr-5 flex justify-center items-center'>
                    <img className='w-16 h-16 ' src={x.author.image} />
                  </div>
                  <div>
                    <div className='text-[16px] font-semibold '>{x.title}</div>
                    <div className='text-sm font-light'>
                      {x.author.name +
                        " - " +
                        moment(new Date(x.createdAt)).startOf("hour").fromNow()}
                    </div>
                  </div>
                </div>
                <div className='mt-5' dangerouslySetInnerHTML={{ __html: x.description }} />
                {x.attachment && (
                  <div className='p-4 flex items-center justify-center'>
                    <img src={x.attachment} alt='' />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h3 className='mt-3 text-lg text-gray-800'>There are no notices posted for you.</h3>
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
  if (user.category !== "student") {
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
