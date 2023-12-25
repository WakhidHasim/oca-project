import React from 'react';
import CardDashboard from '../../components/Card/CardDashboard';
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { FaDatabase } from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

const Dashboard: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  relative">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3">
          <h1 className='text-base md:text-lg py-2'>Informasi Total PPh tahun 2023</h1>
        </div>
        <div className="p-2 pt-5 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Link to="/PPh21Shortcut">
            <CardDashboard text="Total PPh21 Verifikasi" icon={<FaDatabase size={35} />} />
          </Link>
          
          <CardDashboard text="Total PPh 21 Sudah Setor" icon={<FaDatabase size={35} />} />
          <CardDashboard text="Total PPh 21 Belum Setor" icon={<FaDatabase size={35} />} />

          <CardDashboard text="Total PPh 23 Verifikasi" icon={<BsBank size={35} />} />
          <CardDashboard text="Total PPh 23 Sudah Setor" icon={<BsBank size={35} />} />
          <CardDashboard text="Total PPh 23 Belum Setor" icon={<BsBank size={35} />} />

          <CardDashboard text="Total PPh 4 Verifikasi" icon={<HiOutlineBuildingOffice2  size={35} />} />
          <CardDashboard text="Total PPh 4 Sudah Setor" icon={<HiOutlineBuildingOffice2  size={35} />} />
          <CardDashboard text="Total PPh 4 Belum Setor" icon={<HiOutlineBuildingOffice2  size={35} />} />
        </div>
        <div className='flex justify-end w-full mx-auto absolute bottom-0 right-10 '>
            <Link to="/panduan">
               <FaQuestionCircle className="text-2xl text-gray-600" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
