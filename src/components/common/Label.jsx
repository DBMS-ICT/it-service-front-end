import React from 'react';
import { useSelector } from 'react-redux';

function Label({ text, textSize, icon }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <label
      className={`mb-3 text-black flex items-center gap-2  
     dark:text-white ${textSize} ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {icon && icon}
      {/* Render icon if provided */}
      {text}
    </label>
  );
}

export default Label;
