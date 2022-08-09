import { Dialog } from "@headlessui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaLock } from "react-icons/fa";
import { useModelContext } from "../../../context/ModalContext";
import { usePlan } from "../../../hooks/usePlan";
import { useUser } from "../../../lib/hooks";

export const PaymentForm = () => {
  const { closeModal } = useModelContext();
  const user = useUser();
  const { payment } = usePlan(user?._id);
  const router = useRouter();
  return (
    <div>
      <div className='flex items-center justify-center'>
        <Dialog.Title as='h3' className='mt-2 text-3xl font-medium leading-6 text-center'>
          <FaLock />
        </Dialog.Title>
      </div>
      <div className='mt-5 w-full'>
        <h4 className='mt-2 text-2xl font-semibold text-center'>Subscribe to unlock.</h4>
        <p className='text-center mt-4'>
          Thanks for using Provast! Currently you&apos;re on{" "}
          {payment?.plan !== null ? <span className='lowercase'>{payment?.plan}</span> : "free"}{" "}
          plan. Upgrade to unlock this feature.
        </p>
      </div>
      <div className='pt-5'>
        <div className='flex justify-end'>
          <button
            type='button'
            onClick={closeModal}
            className='bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              router.push("/packages");
              closeModal();
            }}
            className='ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
