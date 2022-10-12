import React from "react";
import dynamic from "next/dynamic";
import { resourceCategories } from "../../../../../public/resources/structure";
// import { getLoginSession } from "../../../../../src/lib/auth";
// import { findUser } from "../../../../../src/lib/user";
const PDFViewer = dynamic(() => import("../../../../../src/components/Learn/PDFViewer"), {
  ssr: false,
});
const MaterialSlug = ({ file }) => {
  return (
    <div className='pt-[10vh]'>
      <PDFViewer file={file} />
    </div>
  );
};
export const getServerSideProps = async ({ req, res, query }) => {
  // const session = await getLoginSession(req);
  // const user = (session?._doc && (await findUser(session._doc))) ?? null;
  // if (!user) {
  //   return {
  //     redirect: {
  //       destination: "/auth/login",
  //       permanent: false,
  //     },
  //   };
  // }
  // if (!user.detailsAvailable) {
  //   return {
  //     redirect: {
  //       destination: "/auth/user/details",
  //       permanent: false,
  //     },
  //   };
  // }

  // if (user.category !== "student") {
  //   return {
  //     redirect: {
  //       destination: `/dashboard/${user.category}`,
  //       permanent: false,
  //     },
  //   };
  // }

  // if (user.category === "student" && !user.academicsAvailable) {
  //   return {
  //     redirect: {
  //       destination: "/auth/user/academics",
  //       permanent: false,
  //     },
  //   };
  // }

  let file;
  resourceCategories.forEach((resource) => {
    resource.material.forEach((material) => {
      if (material._id === query.id) {
        file = material.pdf;
      }
    });
  });

  return {
    props: {
      file,
    },
  };
};

export default MaterialSlug;
