import React from 'react';
import { useSelector } from 'react-redux';

function Select({
  name,
  value,
  onChange, // Typo: should be handleChange
  icon,
  disabled,
  option,
  selectOption,
  defaultValue,
  objName,
}) {
  const { language, rtl } = useSelector((state) => state.language);
  return (
    <div
      className={`relative rounded-full z-20 bg-white dark:bg-form-input
     ${rtl ? 'left-0' : 'right-0'}`}
    >
      <select
        className={`w-full outline-none rounded-full border-[1.5px]
         border-stroke bg-transparent py-3 px-5 font-medium transition
          focus:border-primary active:border-primary 
          disabled:cursor-default disabled:bg-white 
          dark:border-form-strokedark dark:bg-form-input 
          dark:focus:border-primary
           ${rtl ? 'text-right pr-3' : 'text-left pl-3'} `}
        onChange={onChange} // Typo: should be onChange
        value={value}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        <option value="">
          {language === 'en'
            ? 'Select'
            : language === 'kr'
            ? 'دەست نیشانکردن'
            : 'اختيار'}
          {selectOption}
        </option>
        {option &&
          option.map((item, index) => (
            <option
              value={item.name}
              key={index}
              className="inline-block 
            p-3 dark:text-white"
            >
              {item[`${objName}`]}
            </option>
          ))}
      </select>

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

export default Select;
