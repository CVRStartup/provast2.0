import Link from "next/link";
import React from "react";

const products = [
  {
    id: 1,
    name: "Amcat",
    href: "/dashboard/student/testpatterns/amcat",
    imageSrc: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1654756599/images_q9eytb.png",
  },
  {
    id: 2,
    name: "MyAnatomy",
    href: "/dashboard/student/testpatterns/myanatomy",
    imageSrc:
      "https://res.cloudinary.com/dj7nomqfd/image/upload/v1654756599/1519868173379_dqtpgq.jpg",
  },
  {
    id: 3,
    name: "TCS Digital",
    href: "/dashboard/student/testpatterns/tcsdigital",
    imageSrc:
      "https://cdn.shopify.com/s/files/1/1996/3175/products/TCSDIGITALPS_345x@2x.png?v=1588581571",
  },
  {
    id: 4,
    name: "EPAM",
    href: "/dashboard/student/testpatterns/epam",
    imageSrc:
      "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/hs0whppqg2pi33o6q8op",
  },
  // More products...
];

const index = () => {
  return (
    <div className='max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 py-4'>
      <h2 className='text-2xl font-bold leading-7 text-center text-gray-800 sm:text-4xl sm:truncate'>
        Test Patterns
      </h2>

      <div className='bg-white'>
        <div className='mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-8'>
          {products.map((product) => (
            <div
              key={product.id}
              className='w-full rounded shadow py-4 group relative flex flex-col justify-between'
            >
              <div className='bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none'>
                <img
                  src={product.imageSrc}
                  alt=''
                  className='w-full  object-center object-cover lg:w-full '
                />
              </div>
              <div className='mt-4 flex justify-center'>
                <Link href={product.href}>
                  <h3 className='text-lg font-semibold text-gray-700'>
                    <span aria-hidden='true' className='absolute inset-0' />
                    {product.name}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
