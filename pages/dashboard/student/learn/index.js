import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { resourceCategories } from "../../../../public/resources/structure";

const Learn = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(resourceCategories);
  }, []);

  return (
    <div className="px-5 pt-1 overflow-auto w-[100%] mt-[15vh]">
      <h2 className="text-lg font-bold text-center pb-2 text-gray-800 sm:text-4xl sm:truncate">
        Learning Material
      </h2>

      <div className="flex items-center justify-center gap-10 mt-5">
        {categories &&
          categories.map((category, index) => {
            return (
              <Link
                className="mt-20 rounded"
                href={`/dashboard/student/learn/category/${category._id}`}
                key={index}
              >
                <div className="relative w-[25%] h-[25vh] border cursor-pointer rounded-md">
                  <div className="relative w-full h-full rounded-md overflow-hidden">
                    <div className="absolute bg-black bg-opacity-50 w-full h-full rounded-md"></div>
                    <img src={category.cover} className="w-full object-cover rounded-md" />
                  </div>
                  <p className="absolute top-[45%] w-full text-center text-white uppercase font-bold text-2xl">
                    {category.name}
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Learn;
