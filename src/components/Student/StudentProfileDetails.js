import React from "react";

export const StudentProfileDetails = ({ student, personal }) => {
  return (
    <div className="my-7 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-1">
          <dt className="capitalize text-md font-medium text-gray-500">First Name</dt>
          <dd className=" text-md font-semibold text-gray-900">{student?.profile?.firstName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="capitalize text-md font-medium text-gray-500">Last Name</dt>
          <dd className=" font-semibold text-md text-gray-900">{student?.profile?.lastName}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-md font-medium text-gray-500">Registered Email</dt>
          <dd className=" font-semibold text-md text-gray-900">{student?.email}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-md font-medium text-gray-500 ">Mobile Number</dt>
          <dd className=" font-semibold text-md text-gray-900">{student?.phone?.value}</dd>
        </div>

        {student?.college?.name && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">College</dt>
            <dd className=" font-semibold text-md text-gray-900">{student?.college?.name}</dd>
          </div>
        )}

        {student?.college?.placement?.designation && student.category === "college" && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">College Designation</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {student?.college?.placement?.designation}
            </dd>
          </div>
        )}
        {student?.rollNumber?.value && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Roll Number</dt>
            <dd className=" font-semibold text-md text-gray-900">{student?.rollNumber?.value}</dd>
          </div>
        )}

        {student?.profile?.gender && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Gender</dt>
            <dd className=" font-semibold text-md text-gray-900">{student?.profile?.gender}</dd>
          </div>
        )}
        {student?.college?.placement?.email && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Placement Email</dt>

            <dd className=" font-semibold text-md text-gray-900">
              {student?.college?.placement?.email}
            </dd>
          </div>
        )}
        {student?.college?.placement?.phone && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Placement Phone</dt>

            <dd className=" font-semibold text-md text-gray-900">
              {student?.college?.placement?.phone}
            </dd>
          </div>
        )}
        {student?.college?.principal?.email && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Principal Email</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {student?.college?.principal?.email}
            </dd>
          </div>
        )}
        {student?.college?.principal?.phone && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Principal Phone</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {student?.college?.principal?.phone}
            </dd>
          </div>
        )}
        {student?.profile?.dob && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Date Of Birth</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {student?.profile?.dob?.substring(0, 10)}
            </dd>
          </div>
        )}
        {personal?.contact?.linkedin && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Linkedin</dt>
            <dd className=" font-semibold text-md text-gray-900">{personal?.contact?.linkedin}</dd>
          </div>
        )}
        {personal?.contact?.website && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Website</dt>
            <dd className=" font-semibold text-md text-gray-900">{personal?.contact?.website}</dd>
          </div>
        )}
        {personal?.contact?.address?.city && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Permanent City</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.address?.city}
            </dd>
          </div>
        )}
        {personal?.contact?.address?.state && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Permanent State</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.address?.state}
            </dd>
          </div>
        )}
        {personal?.contact?.address?.country && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Permanent Country</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.address?.country}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.father?.name && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Father&apos;s Name</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.father?.name}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.father?.email && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Father&apos;s Email</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.father?.email}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.father?.phone && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Father&apos;s Phone</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.father?.phone}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.father?.occupation && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Father&apos;s Occupation</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.father?.occupation}
            </dd>
          </div>
        )}

        {personal?.contact?.parents?.mother?.name && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Mother&apos;s Name</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.mother?.name}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.mother?.email && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Mother&apos;s Email</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.mother?.email}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.mother?.phone && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Mother&apos;s Phone</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.mother?.phone}
            </dd>
          </div>
        )}
        {personal?.contact?.parents?.mother?.occupation && (
          <div className="sm:col-span-1">
            <dt className="text-md font-medium text-gray-500">Mother&apos;s Occupation</dt>
            <dd className=" font-semibold text-md text-gray-900">
              {personal?.contact?.parents?.mother?.occupation}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
};
