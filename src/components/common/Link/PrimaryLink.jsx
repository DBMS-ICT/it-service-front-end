import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { autoIncrimnyKey } from '../../../function/function';

function PrimaryLink({ content, onClick, icon, path }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <Link
      key={autoIncrimnyKey}
      to={path}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2.5 rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 
      ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {icon && <span>{icon}</span>}
      <span>{content}</span>
    </Link>
  );
}

export default PrimaryLink;
