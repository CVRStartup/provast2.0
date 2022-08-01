import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { BiPlus, BiMinus } from "react-icons/bi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDFViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(10);
  //const [file, setFile] = useState("" + fileFromMaterial);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const zoom = (zoomLevel) => {
    setScale(zoomLevel);
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="overflow-y-scroll h-screen w-[100%] rounded shadow bg-gray-200">
          <div className="absolute z-20 flex">
            <button
              className="bg-gray-300 rounded block mx-2 text-2xl"
              onClick={() => zoom(1.4)}
            >
              <BiPlus />
            </button>
            <button
              className="bg-gray-300 rounded text-2xl"
              onClick={() => zoom(1)}
            >
              <BiMinus />
            </button>
          </div>
          <Document
            file={file}
            // options={{ workerSrc: "/pdf.worker.js" }}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div key={`page_${index + 1}`}>
                <div className="w-full h-full ">
                  <Page
                    className={
                      "my-4 w-full flex items-center justify-center h-full "
                    }
                    pageNumber={index + 1}
                    renderAnnotationLayer={false}
                    renderTextLayer={false}
                    scale={scale}
                  />
                </div>
                <p className="text-center text-black border-b-2 border-black w-1/2 mx-auto">
                  {index + 1}/{numPages}
                </p>
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};
export default PDFViewer;
