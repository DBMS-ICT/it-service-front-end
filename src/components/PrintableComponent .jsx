import React, { useRef, forwardRef } from 'react';
import ReactToPrint from 'react-to-print';
import { useGetSingleRequestQuery } from '../app/api/request';
import logo from '../assets/images/logo/logp.jpg';
import { IoMdPrint } from 'react-icons/io';
import { handelDate } from '../function/function';
const PrintableComponent = forwardRef((props, ref) => (
  <div
    ref={ref}
    className="flex flex-col p-8"
    style={{ width: '210mm', height: '297mm', direction: 'rtl' }}
  >
    {/* header */}
    <div className="flex items-center justify-between border-b pb-3">
      {/* left header  */}
      <div style={{ width: '60mm' }} className="flex flex-col text-center">
        <p>حکومەتی هەرێمی کوردستان-عێراق</p>
        <p>وەزارەتی پێشمەرگە</p>
        <p>بەڕێوبەرایەتی ئایتی</p>
        {/* <p>{props?.data?.dirName}</p> */}
      </div>
      {/* image header and center header */}
      <div style={{ width: '60mm' }} className="flex justify-center">
        <img className="w-25" src={logo} alt="Logo" />
      </div>

      {/* right header  */}
      <div style={{ width: '60mm' }} className="flex flex-col text-center">
        <p>حكومة إقليم كردستان-العراق</p> <p>وزارة البيشمركة</p>
        <p>إدارة تكنولوجيا المعلومات</p>
      </div>
    </div>
    {/* date and time */}
    <div className="flex justify-between mt-5 border-b pb-3">
      <div>ژمارە/{props?.data?.number}</div>
      <div className="pl-10">
        بەروار/{props?.data?.date && handelDate(props?.data?.date)}
      </div>
    </div>
    {/* content 1*/}
    <div className="text-center mt-10">
      {/* add right to left firm style */}
      <div>
        <p>بۆ/ فەرمانگەی ئایتی</p>
        <p>بابەت/ داواکاری</p>
      </div>
    </div>
    <div className="mt-7 grid grid-cols-2 gap-x-10 border-b p-3">
      <div className="flex flex-col gap-3 text-right">
        <p className="w-full">ناوی داواکار/ {props?.data?.fullname}</p>
        <p className="w-full">ناوی بەڕێوبەرایەتی/ {props?.data?.dirName}</p>
        <p className="w-full">ژمارەی مۆبایل/ {props?.data?.phone}</p>
        <p className="w-full">
          بەرواری سەردانی/ {handelDate(props?.data?.dateVist)}
        </p>
        <p>کێشە/ {props?.data?.problem}</p>
        <p>تێبینی لایەنی داواکار/ {props?.data?.desc}</p>
      </div>
      <div className="flex flex-col gap-3 pr-5">
        <p>ناونیشانی بەڕێوبەرایەتی/ {props?.data?.dirAddress}</p>
        {/* <p className="w-full">
          نوێنەری ئایتی/ {props?.data?.empVist?.fullname}
        </p> */}
        {/* <p className="w-full">تێبینی نوێنەری ئایتی/ {props?.data?.empDesc}</p> */}
      </div>
    </div>

    <div className="flex flex-col gap-3 pr-5 pt-3">
      <p className="w-full">نوێنەری ئایتی/ {props?.data?.empVist?.fullname}</p>
      <p className="w-full">تێبینی نوێنەری ئایتی/ {props?.data?.empDesc}</p>
      <p className="w-full">تێبینی بۆ داواکار/</p>
    </div>

    <div className="mt-7 grid grid-cols-2 gap-x-10 p-3">
      <p className="w-full mt-20">مۆر و واژوی بەشی داواکار</p>
      <p className="w-full mt-20 pr-5">
        مۆر و واژوی بەڕێوبەرای ئایتی بەشی فەرمان
      </p>
    </div>
  </div>
));

const PrintPage = ({ id }) => {
  const componentRef = useRef();
  const { data, isLoading, isError, isSuccess } = useGetSingleRequestQuery(id);

  return (
    !isError &&
    !isLoading &&
    isSuccess &&
    data?.status == 'success' && (
      <div>
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              <IoMdPrint size={30} />
            </button>
          )}
          content={() => componentRef.current}
          pageStyle={`@page { size: A4; margin: 20mm; } @page { margin: 0; } @media print { body { -webkit-print-color-adjust: exact; } }`}
        />
        <div className="hidden">
          <PrintableComponent data={data?.data} ref={componentRef} />
        </div>
      </div>
    )
  );
};

export default PrintPage;
