import React from 'react';
import { useSelector } from 'react-redux';

function TextArea({
  rows,
  name,
  placeholder,
  value,
  hndleOnChange,
  disabled,
  icon,
  rounded,
}) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <div>
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={hndleOnChange || null}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${rounded} border-[1.5px] border-stroke 
    bg-transparent py-3 px-5 font-medium outline-none transition 
    focus:border-primary active:border-primary 
    disabled:cursor-default disabled:bg-whiter 
    dark:border-form-strokedark dark:bg-form-input 
    dark:focus:border-primary ${rtl ? 'text-right' : 'text-left'}`}
      ></textarea>
      {icon && (
        <div
          className={`absolute inset-y-0 right-0 flex items-center 
        pointer-events-none ${rtl ? 'left-0 pl-3' : 'right-0 pr-3'}`}
        >
          {icon} {/* Use icon instead of icone */}
        </div>
      )}
    </div>
  );
}

export default TextArea;
