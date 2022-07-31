import { NextSeo } from "next-seo";
import { CTA } from "../src/components/Landing/CTA";
import { Footer } from "../src/components/Landing/Footer";
import { Guide } from "../src/components/Landing/Guide";
import { Slider } from "../src/components/Landing/Slider";
import { Testimonials } from "../src/components/Landing/Testimonials";
import { Navbar } from "../src/components/Layout/Navbar";

const Index = () => {
  return (
    <>
      <NextSeo
        title="Provast"
        description="This example uses more of the available config options."
        canonical="https://res.cloudinary.com/dj7nomqfd/image/upload/v1652909540/pvast_B_fpwhlu.png"
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
      <div className="bg-white">
        <Navbar />
        <main className="mt-[10vh] mb-10">
          <Slider />
          <Guide />
          <Testimonials />
          <CTA />
          <Footer />
        </main>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session && !session.userDetails) {
    return {
      redirect: {
        destination: "/auth/user/details",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default Index;
