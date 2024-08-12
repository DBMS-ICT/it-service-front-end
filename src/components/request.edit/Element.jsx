import React from 'react';
import { useSelector } from 'react-redux';

function Element({ label, content }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <div
      className={`p-4 flex flex-col gap-3 ${rtl ? 'text-right' : 'text-left'}`}
    >
      <label className="text-primary dark:text-secondary text-lg font-semibold">
        {label}
      </label>
      <label className="text-black dark:text-gray-3 text-xl font-bold">
        {content}
      </label>
    </div>
  );
}

export default Element;
