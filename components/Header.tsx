
import React from 'react';
import { LogoIcon } from './icons/LogoIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-[#3899b4] h-12 w-full flex items-center px-4 shrink-0">
      <div className="flex items-center space-x-3">
        <LogoIcon className="h-7 w-7 text-white" />
        <span className="text-white text-lg font-semibold">
          Wecare <span className="font-normal">| Inventory Planning</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
