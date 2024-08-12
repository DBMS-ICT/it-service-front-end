import React from 'react';
import { useSelector } from 'react-redux';
import { autoIncrimnyKey } from '../../../function/function';

function DangerButton({ icon, content, onClick, type }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <button
      key={autoIncrimnyKey}
      type={type || 'button'}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 
      rounded-full bg-danger py-4 px-10 text-center font-medium 
      text-white hover:bg-opacity-90 lg:px-8 xl:px-10 
      ${rtl ? 'flex-row-reverse' : 'flex-row'} `}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
}

export default DangerButton;
