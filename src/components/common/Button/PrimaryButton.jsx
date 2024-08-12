import React from 'react';
import { useSelector } from 'react-redux';
import { autoIncrimnyKey } from '../../../function/function';

function PrimaryButton({ icon, content, onClick, type }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <button
      key={autoIncrimnyKey}
      onClick={onClick}
      type={type || 'button'}
      className={`w-full inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10
      ${rtl ? 'flex-row-reverse' : 'flex-row'} `}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
}

export default PrimaryButton;
