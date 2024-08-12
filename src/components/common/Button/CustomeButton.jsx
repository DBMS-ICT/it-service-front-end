import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { autoIncrimnyKey } from '../../../function/function';

function CustomeButton({
  content,
  onClick,
  customClass,
  icon,
  type,
  disabled,
  id,
}) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <button
      id={id}
      disabled={disabled}
      key={autoIncrimnyKey}
      className={`inline-flex ${
        rtl ? 'flex-row-reverse' : 'flex-row'
      } items-center justify-center 
    gap-2.5 text-center ${customClass}`}
      onClick={onClick}
      type={type || 'button'}
    >
      {icon && <span>{icon}</span>}
      {content}
    </button>
  );
}

export default CustomeButton;
