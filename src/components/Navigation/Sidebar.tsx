import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const Sidebar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="w-1/2 md:w-1/3 lg:w-64 pt-28 fixed md:top-0 md:left-0 min-h-screen lg:block  bg-white  z-30 transition duration-500 ease-in-out">
      <div className="">
        <div className="flex px-5 justify-center items-center gap-5 mb-4">
          <FaUserCircle size={45} />
          <div className='w-full mx-auto flex flex-col justify-end'>
            <p className="text-sm font-semibold">Wiwi Widayani, S.Kom., M.Kom</p>
            <span className="text-xs">Agent</span>
          </div>
        </div>

        {/* Dropdown */}
        <div className=" bg-gray-100 text-gray-800 rounded-sm border-b px-3 w-full mx-auto">
            <button
                onClick={toggleDropdown}
                className="flex w-full py-2">
                <span className='text-xs'>Direktorat Perencanaan dan Keuangan</span>
                <MdKeyboardArrowDown className={`h-5 w-5 transition-transform duration-300 transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} />
            </button>

          {isDropdownOpen && (
            <div className="mt-2 py-2 px-3  rounded-lg">
              <p className="cursor-pointer hover:text-blue-500 text-xs">Direktorat Perencanaan dan Keuangan</p>
              <p className="cursor-pointer hover:text-blue-500 text-xs py-2">Direktorat Perencanaan dan Keuangan</p>
            </div>
          )}
        </div>

        {/* menu */}
        <div className='pt-4 px-5 text-gray-800'>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">Dashboard</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">PPh 21</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">PPh 23</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">PPh 4 ayat 2</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">Inventarisasi Pajak</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">Registrasi WP</span>
            </div>
            <div 
                className="w-full flex gap-4 items-center  h-10 pl-4 hover:bg-gray-30 rounded-lg cursor-pointer duration-150">
                <AiFillDashboard />
                <span className=" font-medium pl-2 text-sm">Verifikasi WPOP</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
