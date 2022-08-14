import { NextSeo } from "next-seo";
import { About } from "../src/components/Landing/About";
import { Contact } from "../src/components/Landing/Contact";
import { CTA } from "../src/components/Landing/CTA";
import { Guide } from "../src/components/Landing/Guide";
import { Slider } from "../src/components/Landing/Slider";
import { Testimonials } from "../src/components/Landing/Testimonials";
import { getLoginSession } from "../src/lib/auth";
import { findUser } from "../src/lib/user";

const Index = () => {
  return (
    <>
      <NextSeo
        title='Provast'
        description='This example uses more of the available config options.'
        canonical='https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png'
        openGraph={{
          url: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
          title: "Open Graph Title",
          description: "Open Graph Description",
          images: [
            {
              url: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            {
              url: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
            },
            {
              url: "https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png",
            },
          ],
          site_name: "Vast",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />

      <main className='pt-[10vh] mb-10'>
        <Slider />
        <Guide />
        <Testimonials />
        <CTA />
        <About />
        <Contact />
      </main>
    </>
  );
};

export const getServerSideProps = async ({ req, res, query }) => {
  const session = await getLoginSession(req);
  const user = (session?._doc && (await findUser(session._doc))) ?? null;

  if (user && !user.detailsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  if (user?.category === "student" && !user?.academicsAvailable) {
    return {
      redirect: {
        destination: "/auth/user/academics",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Index;
