// import axios from "axios";
// import { update } from "lodash";
// import { getSession, useSession } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState } from "react";
// import { useEffect } from "react";
// import { Filter } from "../../../../src/components/Jobs/Filter";
// import { JobCard } from "../../../../src/components/Jobs/JobCard";
// import { JobCardSkeleton } from "../../../../src/components/Layouts/Skeletons/JobCardSkeleton";

// const Jobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const [jobsLoading, setJobsLoading] = useState(false);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const { data: session } = useSession();
//   const router = useRouter();
//   const getDesignations = (designations) => {
//     var res = "",
//       n = designations.roles.length;
//     designations.roles.forEach(
//       (d, index) => (res += (index == n - 1 && index > 0 ? " and " : ",") + d)
//     );
//     return res.substring(1);
//   };
//   useEffect(() => {
//     console.log("1 ran");
//     (async () => {
//       console.log("2 ran");
//       setJobsLoading(true);
//       const {
//         data: { jobs },
//       } = await axios.get(
//         `/api/jobs?collegename=${session.userDetails.college.name}&collegecode=${session.userDetails.college.code}`
//       );
//       console.log("jobs set", jobs);
//       setJobs(jobs);
//       setFilteredJobs(jobs);
//       setJobsLoading(false);
//     })();
//   }, [session.userDetails.college.code, session.userDetails.college.name]);

//   const getAllCompanies = () => {
//     console.log("job inside the functionn", jobs);
//     return ["All", ...new Set(jobs?.map((job) => job.company))];
//   };

//   const applyFilters = (filter) => {
//     let updatedJobs = jobs;
//     console.log(jobs);
//     updatedJobs = updatedJobs.filter((job) => {
//       if (Number(job.ctc) != NaN) {
//         if (job.ctc < filter.minimum_ctc_filter) return false;
//       }
//       if (Number(job.stipend) != NaN) {
//         if (job.stipend < filter.minimum_salary_filter) return false;
//       }
//       let currDate = new Date();
//       currDate = currDate.toISOString();
//       let active = job.from <= currDate && job.to >= currDate;
//       if (job.from != null && job.to != null) {
//         if (filter.allow_active == false) {
//           if (active) return false;
//         }
//         if (filter.allow_inactive == false) {
//           if (!active) return false;
//         }
//       } else {
//         // if job from and to is not known
//         // treat it as inactive
//         if (filter.allow_inactive == false) {
//           return false;
//         }
//       }
//       if (filter.role.i == false) {
//         if (job.role == "Internship") return false;
//       }
//       if (filter.role.f == false) {
//         if (job.role == "Full Time") return false;
//       }
//       if (filter.role.iandf == false) {
//         if (job.role == "Internship and Full Time") return false;
//       }
//       let foundInDesig = job.designation.roles.some((ele) =>
//         ele.toLowerCase().includes(filter.keyword.toLowerCase())
//       );
//       let foundInCompany = job.company.toLowerCase().includes(filter.keyword.toLowerCase());
//       if (!foundInCompany && !foundInDesig) return false;
//       return true;
//     });

//     console.log(updatedJobs);
//     if (filter.sort_by == "created_at") {
//       updatedJobs.sort((a, b) => ((a.from ?? "0") < (b.from ?? "0") ? -1 : 1));
//     } else if (filter.sort_by == "ending_at") {
//       updatedJobs.sort((a, b) => ((a.to ?? "0") < (b.to ?? "0") ? -1 : 1));
//     } else if (filter.sort_by == "stipend") {
//       updatedJobs.sort((a, b) => ((a.stipend ?? 0) < (b.stipend ?? 0) ? -1 : 1));
//     } else if (filter.sort_by == "alphabetical") {
//       updatedJobs.sort((a, b) => {
//         a.company.toLowerCase() < b.company.toLowerCase() ? -1 : 1;
//       });
//     }

//     if (filter.sort_order == "desc") {
//       updatedJobs.reverse();
//     }
//     setFilteredJobs([...updatedJobs]);
//   };

//   return (
//     <div className='px-5 pt-1 overflow-auto w-[100%]'>
//       <div className='rounded-md h-14 px-10 bg-gray-800 flex items-center justify-between'>
//         <div className='flex-1 min-w-0'>
//           <h2 className='text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate'>Jobs</h2>
//         </div>
//         <div className='mt-4 flex md:mt-0 md:ml-4'>
//           <Link href='/dashboard/college/jobs/add'>
//             <a className='ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500'>
//               Publish
//             </a>
//           </Link>
//         </div>
//       </div>
//       <div className='flex justify-between items-start mt-5'>
//         <div className='w-[100%] flex'>
//           <div className=' h-[85vh] bg-gray-50 mr-4 rounded-md sticky top-0 left-0 w-[25%]'>
//             {jobsLoading ? (
//               <></>
//             ) : (
//               <Filter companies={getAllCompanies()} applyFilters={applyFilters} />
//             )}
//           </div>

//           <div className='bg-gray-50 min-h-[85vh] rounded-md p-2 w-full'>
//             {/* <Sort filteredJobs={filteredJobs} sortJobs={sortJobs} /> */}
//             <div className='min-w-0'>
//               <div className='lg:min-w-0'>
//                 <div className='h-full px-1'>
//                   <div className='mt-4 relative h-full' style={{ minHeight: "36rem" }}>
//                     {jobsLoading ? (
//                       <JobCardSkeleton />
//                     ) : filteredJobs?.length > 0 ? (
//                       <div className='flex flex-col'>
//                         {filteredJobs?.map((job) => (
//                           <JobCard key={job._id} job={job} />
//                         ))}
//                       </div>
//                     ) : (
//                       <div className='flex mt-10 flex-col justify-center items-center w-full'>
//                         <div className='relative flex-shrink-0 flex justify-center h-72 w-full'>
//                           <Image
//                             placeholder='blur'
//                             blurDataURL='/no_results.png'
//                             layout='fill'
//                             objectFit='contain'
//                             src='/no_results.png'
//                             alt=''
//                           />
//                         </div>
//                         <h6 className='text-3xl font-semibold text-gray-400'>No Jobs Found</h6>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <style>{`
//         iframe {
//           height: 150px;
//           width: 100%;
//           padding: 5px;
//           margin: 0px auto;
//         }
//       `}</style>
//     </div>
//   );
// };

// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     };
//   }

//   if (!session.userDetails) {
//     return {
//       redirect: {
//         destination: "/auth/user/details",
//         permanent: false,
//       },
//     };
//   }

//   if (session.userDetails.category !== "college") {
//     return {
//       redirect: {
//         destination: `/dashboard/${session.userDetails.category}`,
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// };

// export default Jobs;
