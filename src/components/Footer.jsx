import React from 'react';
import LanguageChange from './header/LanguageChange';
import { useSelector } from 'react-redux';

function Footer({ showLang }) {
  const { rtl } = useSelector((state) => state.language);
  return (
    // create a modern footer
    <footer className={`bg-gray-800 bg-black text-white py-4 text-center`}>
      {/* Your footer content here */}
      <div>© 2024 Your Website. All rights reserved.</div>
      <div className={`w-full flex ${rtl ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-[120px] mb-5 ${rtl ? 'ml-5' : 'mr-5'}`}>
          {showLang === true && <LanguageChange />}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
