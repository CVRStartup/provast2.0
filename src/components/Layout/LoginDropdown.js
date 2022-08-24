import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { FaCrown } from "react-icons/fa";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const LoginDropdown = ({ session }) => {
  return (
    <Menu as='div' className='z-10 relative inline-block text-left'>
      <Menu.Button className='inline-flex justify-center w-full rounded-md px-2 py-2 bg-transparent text-md font-medium text-gray-500 hover:text-gray-800'>
        Account
        <ChevronDownIcon className='-mr-1 ml-1 mt-[3.1px] h-5 w-5' aria-hidden='true' />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none overflow-hidden'>
          <div className='py-1'>
            <Menu.Item>
              <div className='flex flex-col'>
                <div className='block px-4 pt-2 text-xs text-gray-500'>Signed in as</div>
                <div className='block px-4 pb-2 text-sm font-semibold break-words'>
                  {session?.email}
                </div>
              </div>
            </Menu.Item>
          </div>

          {session?.category !== "college" &&
            session?.college?.name !== "SRM Institute of Science and Technology" && (
              <Menu.Item>
                <Link href='/packages'>
                  <a className='flex items-left text-left w-full px-4 py-2 text-sm hover:bg-gray-50 '>
                    <span className='mr-2'>
                      <FaCrown size={18} color='orange' />
                    </span>
                    <span className=''>Upgrade</span>
                  </a>
                </Link>
              </Menu.Item>
            )}

          <Menu.Item>
            {({ active }) => (
              <Link
                href={`/dashboard/${
                  session?.category === "student" ? "student" : "college"
                }/profile`}
              >
                <span
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm cursor-pointer hover:bg-gray-50"
                  )}
                >
                  Profile
                </span>
              </Link>
            )}
          </Menu.Item>

          <Menu.Item>
            <a
              href='/api/auth/logout'
              className='block text-left w-full px-4 py-2 text-sm hover:bg-gray-50'
            >
              Sign Out
            </a>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
