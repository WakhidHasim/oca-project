import React, { useState } from 'react';
import { FaUserCircle, FaDatabase, FaUserFriends } from 'react-icons/fa';
import { MdOutlineAppRegistration, MdDomainVerification } from 'react-icons/md';
import { IoMdArrowDropdown } from 'react-icons/io';
import { AiFillDashboard } from 'react-icons/ai';
import { BsBank } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  // const [isDropdownOpen1, setIsDropdownOpen1] = useState(false);
  const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

  // const toggleDropdown1 = () => {
  //   setIsDropdownOpen1(!isDropdownOpen1);
  //   setIsDropdownOpen2(false);
  // };

  const toggleDropdown2 = () => {
    setIsDropdownOpen2(!isDropdownOpen2);
    // setIsDropdownOpen1(false);
  };

  const namaAgent = localStorage.getItem('nama_agent');
  const namaSatker = localStorage.getItem('nama_satker');

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  return (
    <div className='w-1/2 md:w-1/3 lg:w-64 xl:w-72 pt-28 fixed md:top-0 md:left-0 min-h-screen lg:block bg-white z-30 transition duration-500 ease-in-out'>
      <div className=''>
        <div className='flex pl-4 justify-center items-center gap-3 mb-4'>
          <FaUserCircle size={37} />
          <div className='w-full mx-auto flex flex-col justify-end'>
            <p className='text-[14px] font-semibold'>{namaAgent}</p>
            <span className='text-xs pt-1'>Agent</span>
          </div>
        </div>

        <span className='text-xs flex gap-2 w-full py-2 pl-8 '>
          {namaSatker}
        </span>

        {/* Dropdown 1 */}
        {/* <div
          className={` text-gray-800 shadow-lg rounded-sm border-b mb-4 w-full py-2  ${
            selectedMenu === 'dropdown1' ? 'bg-purple text-white' : ''
          }`}
        >
          <button
            onClick={toggleDropdown1}
            className='flex gap-2 w-full py-2 pl-8 '
          >
            <span className='text-xs flex gap-2 w-full py-2 pl-8 '>
              Direktorat Perencanaan dan Keuangan
            </span>
            <IoMdArrowDropdown
              className={`h-4 w-4 transition-transform duration-300 transform ${
                isDropdownOpen1 ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen1 && (
            <div className='mt-2 py-2 px-2 pl-8 rounded-lg'>
              <p
                className={`cursor-pointer ${
                  selectedMenu === 'dropdown1'
                    ? 'hover:text-white'
                    : 'hover:text-blue-500'
                } text-xs`}
              >
                Direktorat Sarana dan PraSarana
              </p>
              <p
                className={`cursor-pointer ${
                  selectedMenu === 'dropdown1'
                    ? 'hover:text-white'
                    : 'hover:text-blue-500'
                } text-xs py-2`}
              >
                Direktorat Akademik dan Kemahasiswaan
              </p>
            </div>
          )}
        </div> */}

        {/* menu */}
        <div className='text-gray-800 '>
          <Link to='/dashboard'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu === '/dashboard'
                  ? 'bg-purple text-white shadow-lg'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dashboard')}
            >
              <AiFillDashboard size={16} />
              <span
                className={` pl-2 text-xs md:text-sm ${
                  selectedMenu === '/dashboard' ? 'text-white' : ''
                }`}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link to='/dataKegiatan21'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu?.includes('/dataKegiatan21')
                  ? 'bg-purple text-white shadow-lg'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dataKegiatan21')}
            >
              <FaDatabase size={16} />
              <span
                className={` pl-2 text-xs md:text-sm ${
                  selectedMenu?.includes('/dataKegiatan21') ? 'text-white' : ''
                }`}
              >
                PPh 21
              </span>
            </div>
          </Link>

          <Link to='/dataKegiatan23'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu?.includes('/dataKegiatan23')
                  ? 'bg-purple text-white shadow-lg'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/dataKegiatan23')}
            >
              <BsBank size={16} />
              <span
                className={` pl-2 text-xs md:text-sm ${
                  selectedMenu?.includes('/dataKegiatan23') ? 'text-white' : ''
                }`}
              >
                PPh 23
              </span>
            </div>
          </Link>

          <Link to='/kegiatanPPh4'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu?.includes('/kegiatanPPh4')
                  ? 'bg-purple text-white shadow-lg'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/kegiatanPPh4')}
            >
              <HiOutlineBuildingOffice2 size={16} />
              <span
                className={`pl-2 text-xs md:text-sm ${
                  selectedMenu?.includes('/kegiatanPPh4') ? 'text-white' : ''
                }`}
              >
                PPh 4 ayat 2
              </span>
            </div>
          </Link>

          <Link to='/inventaris'>
            <div
              className={`w-full flex gap-4 items-center h-10 px-8 ${
                selectedMenu?.includes('/inventaris')
                  ? 'bg-purple text-white shadow-lg'
                  : 'hover:bg-gray-30'
              } cursor-pointer  `}
              onClick={() => handleMenuClick('/inventaris')}
            >
              <MdOutlineAppRegistration size={16} />
              <span
                className={`pl-2 text-xs md:text-sm ${
                  selectedMenu?.includes('/inventaris') ? 'text-white' : ''
                }`}
              >
                Inventarisasi Pajak
              </span>
            </div>
          </Link>
        </div>

        {/* Dropdown 2 */}
        <div className='text-gray-800'>
          <div className='w-full px-4 pl-8'>
            <button
              onClick={toggleDropdown2}
              className={`flex gap-4 h-10 items-center justify-start hover:bg-gray-30 rounded-lg cursor-pointer   ${
                selectedMenu?.includes('/registerWP')
                  ? 'bg-purple text-white shadow-lg'
                  : ''
              }`}
            >
              <FaUserFriends size={16} />
              <span
                className={`pl-2 text-xs md:text-sm ${
                  selectedMenu?.includes('/registerWP') ? 'text-white' : ''
                }`}
              >
                Registrasi WP
              </span>
              <IoMdArrowDropdown
                className={`h-5 w-5 transition-transform duration-300 transform ${
                  isDropdownOpen2 ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isDropdownOpen2 && (
              <div className='pt-2 pl-6 rounded-lg w-full'>
                <ul className='list-disc'>
                  <li
                    className={`cursor-pointer ${
                      selectedMenu?.includes('/registerWP')
                      // ? 'hover:text-white'
                      // : 'hover:text-purple'
                    } text-xs md:text-sm`}
                  >
                    <Link to='/registerWP/dataWPOP'>
                      {' '}
                      Wajib Pajak Orang Pribadi
                    </Link>
                  </li>
                  <li
                    className={`cursor-pointer ${
                      selectedMenu?.includes('/registerWP')
                      // ? 'hover:text-white'
                      // : 'hover:text-purple'
                    } pt-3 text-xs md:text-sm py-2`}
                  >
                    <Link to='/registerWP/dataWPBU'>
                      Wajib Pajak Badan Usaha
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <Link to='/verifikasiWPOP'>
          <div
            className={`w-full flex gap-4 items-center  h-10 px-8 ${
              selectedMenu === '/verifikasiWPOP'
                ? 'bg-purple text-white shadow-lg'
                : 'hover:bg-gray-30'
            } cursor-pointer`}
            onClick={() => handleMenuClick('/verifikasiWPOP')}
          >
            <MdDomainVerification size={16} />
            <span
              className={`pl-2 text-xs md:text-sm ${
                selectedMenu === '/verifikasiWPOP' ? 'text-white' : ''
              }`}
            >
              Verifikasi WPOP
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
