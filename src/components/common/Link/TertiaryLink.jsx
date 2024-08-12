import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { autoIncrimnyKey } from '../../../function/function';
function TertiaryLink({ content, onClick, icon, path }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <Link
      key={autoIncrimnyKey}
      onClick={onClick}
      to={path}
      className={`w-full inline-flex items-center 
      justify-center gap-2.5 rounded-full bg-transparent 
      py-3 px-10 text-center font-medium text-gray-700 
       lg:px-8 xl:px-10  ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {icon && <span>{icon}</span>}
      <span className="border-b border-gray-300">{content}</span>
    </Link>
  );
}

export default TertiaryLink;
