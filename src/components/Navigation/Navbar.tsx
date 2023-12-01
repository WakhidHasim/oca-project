import React from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoNotifications } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import logo from "../../assets/logo.svg"

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="fixed top-0 z-40 w-full bg-purple">
      <div className="h-16 md:h-20 px-8 flex items-center justify-between mx-auto ">
        <div className='hidden lg:block'>
           <div className="flex gap-3 justify-center items-center ">
            <img src={logo} className='w-8' alt='Logo' />
            <p className="font-semibold text-sm text-white uppercase">One Collecting Agent</p>
            <FiMenu className="pt-1 text-gray-200 items-center h-8 w-10 ml-4" />
          </div>
        </div>

        <div className="flex">
            <div className="lg:hidden flex items-center mr-4" >
              <button
                  onClick={toggleSidebar} 
                  className="hover:text-purple-600 hover:border-white focus:outline-none navbar-burger"
              >
                  <FiMenu className="pt-1 text-white items-center h-7 w-8" />
              </button>
            </div>
        </div>
        <div className="flex items-center">
          <div className="flex gap-4 items-center text-white">
            <IoNotifications className="" />
            <FaUser className=""/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
