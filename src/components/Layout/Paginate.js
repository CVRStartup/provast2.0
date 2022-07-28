import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ handlePageClick, pageCount }) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      breakLabel={"..."}
      nextLabel={"Next"}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      renderOnZeroPageCount={null}
      // pageClassName='border-r-1 h-10 flex justify-cente items-center border-orange-500 border-2'
      pageLinkClassName='bg-orange-500 hover:bg-orange-300 text-white font-bold py-2 px-4 border-r-1 border-orange-500 border-2'
      // previousClassName='bg-white-500 hover:bg-slate-700 text-black font-bold py-2 px-4 border-r-1 border-orange-500 border-2'
      previousLinkClassName='bg-white-500 hover:bg-orange-700 hover:text-white text-black font-bold py-2 px-4 border-r-1 border-orange-500 border-2 rounded-l '
      // nextClassName='page-item'
      nextLinkClassName='bg-white-500 hover:bg-orange-700 hover:text-white text-black font-bold py-2 px-4 border-r-1 border-orange-500 border-2 rounded-r'
      // breakClassName='page-item'
      breakLinkClassName='bg-white-500 hover:bg-orange-700 hover:text-white text-black font-bold py-2 px-4 border-r-1 border-orange-500 border-2 rounded-l rounded-r'
      containerClassName='flex rounded-lg my-10 self-center'
      // activeClassName='bg-green-400'
      activeLinkClassName='text-black bg-slate-100 rounded'
    />
  );
};

export default Paginate;
