import React, { useEffect, useState } from 'react';
import { useGetExportMutation } from '../../app/api/request';
import { useSelector } from 'react-redux';
function Export() {
  const { language, rtl } = useSelector((state) => state.language);
  const [getExport, { isLoading, isError, error, data }] =
    useGetExportMutation();
  const [formValue, setFormValue] = useState({
    // from value today
    from: new Date().toISOString().split('T')[0],
    // to value today
    to: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getExport(formValue);
  };
  return (
    <div className={`w-full flex flex-col gap-y-2 mb-2`}>
      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-primary text-white rounded-lg"
      >
        {language === 'en' ? 'Export' : language === 'ar' ? 'تصدير' : 'دەرکردن'}
      </button>
      {/* -------------- from ------------- */}
      <div
        className={`w-full flex gap-x-2 bg-body text-white p-2 rounded-lg font-bold ${
          rtl ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <label className="">
          {language === 'en' ? 'From' : language === 'ar' ? 'من' : 'لە'}
        </label>
        <input
          type="date"
          className=" bg-body "
          value={formValue.from}
          onChange={(e) => setFormValue({ ...formValue, from: e.target.value })}
        />
      </div>

      {/* -------------- to ------------- */}
      <div
        className={`w-full flex gap-x-2 bg-body text-white p-2 rounded-lg font-bold ${
          rtl ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <label className="">
          {language === 'en' ? 'To' : language === 'ar' ? 'الي' : 'بۆ'}
        </label>
        <input
          type="date"
          className="bg-body"
          value={formValue.to}
          onChange={(e) => setFormValue({ ...formValue, to: e.target.value })}
        />
      </div>
      {/* -------------- download ------------- */}
      {data?.status === 'success' && (
        <a
          href={`${import.meta.env.VITE_BACK_END}/${data?.filePath}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center p-2 bg-success text-white rounded-lg"
        >
          {language === 'en'
            ? 'Download'
            : language === 'ar'
            ? 'تحميل'
            : 'داگرتن'}
        </a>
      )}
    </div>
  );
}

export default Export;
