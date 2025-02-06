'use client';

import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

import { useState } from 'react';
import { Document, Page } from 'react-pdf';
import { FaSpinner } from 'react-icons/fa6';
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';
import { RiDownloadCloud2Line } from 'react-icons/ri';
import IconButton from '@/components/shared/buttons/IconButton';
import { useWindowSize } from '@uidotdev/usehooks';
import PageNumber from './PageNumber';
import { Tooltip } from 'react-tooltip';

type PdfViewerProps = {
  fileUrl: {
    url: string;
    httpHeaders: {
      Authorization: string;
    };
  };
  onCibDownload?: () => void;
  isCibDownloading?: boolean;
};

export default function PdfViewer(props: PdfViewerProps)
{
  const [numberOfPages, setNumberOfPages] = useState<number>();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const { height } = useWindowSize();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void
  {
    setNumberOfPages(numPages);
  }

  function onZoom(coEfficient: number)
  {
    const newScale = scale + coEfficient;
    if (newScale > 3 || newScale < 0.2) return;
    setScale(newScale);
  }

  return (
    <div className="w-full h-full text-secondary relative">
      <Tooltip id="button-instruction" place="top-start" className="z-50" />
      {/* Header */}
      <div
        id="header"
        className="w-full bg-slate-100 sticky top-0 flex flex-row justify-between items-center p-4 text-white shadow-lg rounded-b-2xl z-40"
      >
        <div className="flex flex-row gap-3 items-center">
          <IconButton
            className="text-secondary bg-stone-100 rounded-xl p-2 h-8 w-8 border border-secondary hover:bg-stone-200"
            icon={<LuZoomIn />}
            onClick={() => onZoom(0.2)}
            data-tooltip-id="button-instruction"
            data-tooltip-content="Zoom In"
          />
          <IconButton
            className="text-secondary bg-stone-100 rounded-xl p-2 h-8 w-8 border border-secondary hover:bg-stone-200"
            icon={<LuZoomOut />}
            onClick={() => onZoom(-0.2)}
            data-tooltip-id="button-instruction"
            data-tooltip-content="Zoom Out"
          />
        </div>
        <PageNumber
          currentPage={currentPageNumber}
          totalPages={numberOfPages ?? 1}
          onPageChange={setCurrentPageNumber}
        />
        {props.onCibDownload && (
          <IconButton
            icon={<RiDownloadCloud2Line />}
            className="text-secondary bg-stone-100 rounded-xl p-2 h-8 w-8 border border-secondary hover:bg-stone-200"
            onClick={props.onCibDownload}
            isLoading={props.isCibDownloading}
            data-tooltip-id="button-instruction"
            data-tooltip-content="Download PDF"
          />
        )}
      </div>

      <div className="w-full p-8">
        <Document
          file={props.fileUrl}
          loading={
            <div className="flex justify-center items-center w-full h-full">
              <FaSpinner className="animate-spin text-primary" size={32} />
            </div>
          }
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page
            height={height ?? 300}
            pageNumber={currentPageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
    </div>
  );
}
