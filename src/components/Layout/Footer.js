import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const navigation = {
  main: [
    { name: "About Us", href: "/#about-us" },
    { name: "Contact Us", href: "/#contact-us" },
    { name: "Pricing", href: "/packages" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
    { name: "Terms And Conditions", href: "/terms-and-conditions" },
  ],
};

export const Footer = () => {
  const router = useRouter();
  if (
    router.pathname.split("/").indexOf("auth") !== -1 ||
    (router.pathname.split("/")[3] === "resumes" && router.pathname.split("/")[4] === "[id]") ||
    router.pathname.indexOf("viewresume") !== -1 ||
    router.pathname.indexOf("checkout") !== -1 ||
    router.pathname.indexOf("/dashboard/college/students") !== -1
  )
    return <></>;

  return (
    <footer className='bg-gray-900'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <div className='relative w-48 h-16 mx-auto cursor-pointer mb-5'>
          <Link href={"/"}>
            <Image
              placeholder='blur'
              blurDataURL='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
              layout='fill'
              objectFit='contain'
              className=''
              src='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_W_uoqbkv.png'
              alt=''
            />
          </Link>
        </div>
        <nav className='-mx-5 -my-2 flex flex-wrap justify-center' aria-label='Footer'>
          {navigation.main.map((item) => (
            <Link href={item.href} key={item.name}>
              <div className='cursor-pointer px-5 py-2'>
                <a className='text-base text-white hover:text-gray-600'>{item.name}</a>
              </div>
            </Link>
          ))}
        </nav>
        <p className='mt-8 text-center text-base text-white'>
          &copy; 2022 Provast, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
