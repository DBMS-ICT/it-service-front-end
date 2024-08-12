import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CustomeLink from '../common/Link/CustomeLink';
import { useSelector } from 'react-redux';
import { FaUserCog } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { RiLockPasswordFill, RiLogoutBoxFill } from 'react-icons/ri';

const DropdownUser = () => {
  const { language } = useSelector((state) => state.language);
  const setUser = useSelector((state) => state.setUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { rtl } = useSelector((state) => state.language);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <CustomeLink
        refVal={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        customClass={`flex items-center gap-4 ${
          rtl ? 'flex-row-reverse' : 'flex-row'
        }`}
        to="#"
        content={
          <>
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">
                {setUser?.user?.fullname}
              </span>
            </span>
            <span className="flex">
              <FaUserCog size={35} className="text-primary dark:text-white" />
            </span>
            <svg
              className={`hidden fill-current sm:block ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
                fill=""
              />
            </svg>
          </>
        }
      ></CustomeLink>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute ${
          rtl ? 'left-0' : 'right-0'
        } mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/account-setting"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <IoSettings />
              {language === 'en'
                ? 'Account Settings'
                : language === 'ar'
                ? 'اعدادات الحساب'
                : 'ڕێکخستنەکانی هەژمار'}
            </Link>
          </li>
          <li>
            <Link
              to="/update/password"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <RiLockPasswordFill />
              {language === 'en'
                ? 'Change Password'
                : language === 'ar'
                ? 'تغيير كلمة المرور'
                : 'گۆڕینی وشەی نهێنی'}
            </Link>
          </li>
        </ul>
        <Link
          to={'/auth/signin'}
          onClick={() => {
            localStorage.removeItem('user');
          }}
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
        >
          <RiLogoutBoxFill />
          {language === 'en'
            ? 'Log Out'
            : language === 'ar'
            ? 'تسجيل الخروج'
            : 'چوونە دەرەوە'}
        </Link>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
