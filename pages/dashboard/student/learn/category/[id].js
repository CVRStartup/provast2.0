import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { resourceCategories } from "../../../../../public/resources/structure";
const Category = () => {
  const {
    query: { id: categoryId },
  } = useRouter();

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    resourceCategories.forEach((resource) => {
      if (resource._id === categoryId) {
        setMaterials(resource.material);
      }
    });
  }, []);

  return (
    <div className="px-5 pt-1 overflow-auto w-[100%] mt-[12vh]">
      <div className="rounded-md h-20 px-10 bg-gray-800 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">
            Modules
          </h2>
        </div>
      </div>
      <div className="flex items-center gap-10 justify-center flex-wrap mt-10">
        {materials.map((material, index) => {
          return (
            <Link href={`/dashboard/student/learn/material/${material._id}/`} key={index}>
              <div className="p-5 w-[20%] rounded cursor-pointer border-2 text-center">
                {material.name}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
