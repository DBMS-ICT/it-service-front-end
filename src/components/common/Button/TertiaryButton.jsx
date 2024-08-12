import React from 'react';
import { useSelector } from 'react-redux';
import { autoIncrimnyKey } from '../../../function/function';

function TertiaryButton({ icon, content, onClick, type, disabled, id }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <button
      id={id}
      key={autoIncrimnyKey}
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
      className={`inline-flex items-center border border-gray-300 
      justify-center gap-2.5 rounded-full bg-transparent 
      py-4 px-10 text-center font-medium text-gray-700 hover:bg-gray
       hover:border-secondary lg:px-8 xl:px-10 ${
         rtl ? 'flex-row-reverse' : 'flex-row'
       }`}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
}

export default TertiaryButton;
