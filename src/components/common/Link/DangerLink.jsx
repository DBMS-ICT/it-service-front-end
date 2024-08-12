import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { autoIncrimnyKey } from '../../../function/function';
function DangerLink({ content, onClick, icon, path }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <Link
      key={autoIncrimnyKey}
      onClick={onClick}
      to={path}
      className={`inline-flex ${rtl ? 'flex-row-reverse' : 'flex-row'}
       items-center justify-center gap-2.5 rounded-full bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10`}
    >
      {icon && <span>{icon}</span>}
      <span>{content}</span>
    </Link>
  );
}

export default DangerLink;
