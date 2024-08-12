import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { autoIncrimnyKey } from '../../../function/function';

function CustomeLink({ content, onClick, customClass, icon, path }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <Link
      key={autoIncrimnyKey}
      onClick={onClick}
      to={path}
      className={`inline-flex ${
        rtl ? 'flex-row-reverse' : 'flex-row'
      } items-center justify-center 
  gap-2.5 text-center ${customClass}`}
    >
      {icon && <span>{icon}</span>}
      {content}
    </Link>
  );
}

export default CustomeLink;
