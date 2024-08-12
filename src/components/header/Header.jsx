import React, { useState } from 'react';
import CustomeButton from '../common/Button/CustomeButton';
import HamburgerMenu from './HamburgerMenu';
import CustomeLink from '../common/Link/CustomeLink';
import home from '../../assets/images/logo/home.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownUser from './DropdownUser';
import { useSelector } from 'react-redux';
function Header({ sidebarOpen, setSidebarOpen }) {
  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const { rtl } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.setUser);
  return (
    <header
      className="sticky top-0 z-999 flex w-full bg-white
     drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none "
    >
      <div
        className={`flex flex-grow items-center  
      py-4 px-4 shadow-2 md:px-6 2xl:px-11
       ${
         rtl
           ? 'justify-between lg:justify-start flex-row-reverse lg:flex-row'
           : 'justify-between lg:justify-end flex-row'
       }`}
      >
        <div
          className={`flex 
        ${
          rtl ? 'flex-row-reverse' : 'flex-row'
        } items-center gap-2 sm:gap-4 lg:hidden`}
        >
          {/* Humberger menu */}
          <CustomeButton
            onClick={handleSidebar}
            customClass="z-99999 block rounded-md border 
            border-stroke bg-white p-1.5 shadow-sm
             dark:border-strokedark dark:bg-boxdark lg:hidden"
            content={<HamburgerMenu sidebarOpen={sidebarOpen} />}
          />
          {/* Humberger menu */}
          {/* to home */}
          {user?.role == 'admin' && (
            <CustomeLink
              path="/"
              content={<img src={home} alt="home" />}
              customClass="z-99999 block bg-secondary 
             rounded-md border border-stroke p-1.5
              shadow-sm dark:border-strokedark hidden sm:block"
            />
          )}
          {/* to home */}
        </div>

        <div
          className={`flex items-center gap-3 2xsm:gap-7
        ${rtl ? 'flex-row-reverse ' : 'flex-row'}`}
        >
          <ul
            className={`flex items-center gap-2 2xsm:gap-4
           ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Dark mode switcher */}
            <DarkModeSwitcher />
            {/* Dark mode switcher */}
            {/* <!-- Notification Menu Area --> */}
            {/* <DropdownNotification /> */}
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            {/* <DropdownMessage /> */}
            {/* <!-- Chat Notification Area --> */}
          </ul>
          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
}

export default Header;
