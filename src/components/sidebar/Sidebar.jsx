import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CustomeButton from '../common/Button/CustomeButton';
import { useSelector } from 'react-redux';
import { sideBarLanguage } from '../../assets/data/data';
import LanguageChange from '../header/LanguageChange';
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { language, rtl } = useSelector((state) => state.language);
  const user = useSelector((state) => state.setUser);
  // console.log();
  const [links, setLinks] = useState([]);
  useEffect(() => {
    setLinks(sideBarLanguage(language, user?.user?.role));
  }, [, language, user]);
  return (
    <aside
      className={`fixed top-0 z-9999 flex h-screen 
      w-72.5 flex-col overflow-y-hidden bg-black duration-300 
      ease-linear dark:bg-boxdark lg:static lg:translate-x-0
      ${
        sidebarOpen
          ? `
          ${rtl ? ' right-0 ' : ' left-0 '}
         `
          : `${rtl ? ' -right-[200%] ' : ' -left-[200%] '}`
      } `}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div
        className={`flex items-center justify-between gap-2
        px-6 py-5.5 lg:py-6.5 ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
      >
        <LanguageChange />
        <NavLink
          className={`flex justify-center gap-2
         ${rtl ? 'flex-row-reverse' : 'flex-row'}`}
          to="/"
        >
          {/* <img src={home} alt="Logo" /> */}
          {/* <span className="text-white">Home</span> */}
        </NavLink>
        <CustomeButton
          type={'button'}
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
          // ariaExpanded={sidebarOpen}
          customClass="block lg:hidden"
          content={
            <svg
              className={`
              ${rtl ? 'transform rotate-180' : ''} fill-current text-white`}
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          }
        />
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div
        className="no-scrollbar flex flex-col overflow-y-auto
       duration-300 ease-linear "
      >
        {/* <!-- Sidebar Menu --> */}
        <nav
          className="mt-5 py-4 px-4 lg:mt-9 lg:px-6 flex flex-col gap-4
        "
        >
          {links.map((link, index) =>
            link?.subNav ? (
              <div
                id={index}
                key={index}
                className={`group relative grid grid-cols-1 gap-2.5
                rounded-sm py-2 px-4 font-medium text-bodydark1
                duration-300 ease-in-out focus:bg-graydark
                coursor-pointer `}
              >
                {/* <!-- Menu Title --> */}
                <h1
                  onClick={() => {
                    setLinks(
                      links.map((item, i) => ({
                        ...item,
                        isOpen: i === index ? !item.isOpen : false,
                      }))
                    );
                  }}
                  className={`flex justify-between items-center gap-2
                   focus:bg-graydark coursor-pointer ${
                     rtl ? 'flex-row-reverse' : 'flex-row'
                   }`}
                >
                  <span
                    className={`
                  flex justify-start gap-x-1.5 items-center
                  text-bodydark1 dark:text ${
                    rtl ? 'flex-row-reverse' : 'flex-row'
                  }`}
                  >
                    {link.icon}
                    {link.name}
                  </span>
                  <svg
                    className={`
                     fill-current ${
                       link.isOpen && 'rotate-180'
                     } ease-in-out duration-300`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                      fill=""
                    />
                  </svg>
                </h1>
                {/* <!-- Menu Title --> */}
                {link.isOpen && (
                  <div
                    className={`
                flex flex-col gap-2.5  coursor-pointer`}
                  >
                    {link.subNav.map((subLink, index_) => (
                      <Link
                        className={`group relative flex items-center gap-2.5 
                        rounded-sm py-2 px-4 font-medium text-bodydark1 
                        duration-300 ease-in-out hover:bg-graydark
                         dark:hover:bg-meta-4 focus:bg-graydark
                           ${rtl ? 'flex-row-reverse' : 'flex-row'} `}
                        onClick={() => {
                          setLinks((prev) =>
                            prev.map((item, i) => ({
                              ...item,
                            }))
                          );
                        }}
                        key={index_}
                        to={subLink.path}
                      >
                        {subLink.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              // sub link
              <Link
                className={`group relative flex items-center gap-2.5 
              rounded-sm py-2 px-4 font-medium text-bodydark1 
              duration-300 ease-in-out hover:bg-graydark
               dark:hover:bg-meta-4 focus:bg-graydark
                 ${rtl ? 'flex-row-reverse' : 'flex-row'} ${
                  link.open ? 'bg-graydark' : ''
                }`}
                // chnage open key for false but this index key for true
                onClick={() => {
                  setLinks((prev) =>
                    prev.map((item, i) => ({
                      ...item,
                      open: i === index ? !item.open : false,
                    }))
                  );
                }}
                key={index}
                to={link.path}
              >
                {link.icon}
                {link.name}
              </Link>
            )
          )}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
