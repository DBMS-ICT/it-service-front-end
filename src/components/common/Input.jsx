import React from 'react';
import { useSelector } from 'react-redux';

function Input({
  name,
  placeholder,
  type,
  value,
  onChange, // Rename hnadleOnChange to onChange
  icon, // Rename icone to icon
  disabled,
  reqired,
}) {
  const { rtl } = useSelector((state) => state.language);
  return (
    <div className="relative">
      <input
        type={type || 'text'}
        name={name}
        value={value}
        onChange={onChange && onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={reqired}
        className={`w-full outline-none rounded-full border-[1.5px]
         border-stroke bg-transparent py-3 px-5 font-medium transition
          focus:border-primary active:border-primary 
          disabled:cursor-default disabled:bg-white 
          dark:border-form-strokedark dark:bg-form-input 
          dark:focus:border-primary
           ${rtl ? 'text-right' : 'text-left'}`}
      />
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

export default Input;
