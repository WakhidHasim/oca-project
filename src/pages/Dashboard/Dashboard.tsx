import React from 'react';
import CardDashboard from '../../components/Card/CardDashboard';
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen  relative">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3">
          <h1 className='text-lg xl:text-2xl py-2'>Informasi Total PPh tahun 2023</h1>
        </div>
        <div className="p-2 pt-5 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <Link to="/PPh21Shortcut">
            <CardDashboard text="Total PPh21 Verifikasi" />
          </Link>
          
          <CardDashboard text="Total PPh 21 Sudah Setor" />
          <CardDashboard text="Total PPh 21 Belum Setor" />

          <CardDashboard text="Total PPh 23 Verifikasi" />
          <CardDashboard text="Total PPh 23 Sudah Setor" />
          <CardDashboard text="Total PPh 23 Belum Setor" />

          <CardDashboard text="Total PPh 4 Verifikasi" />
          <CardDashboard text="Total PPh 4 Sudah Setor" />
          <CardDashboard text="Total PPh 4 Belum Setor" />
        </div>
        <div className='flex justify-end w-full mx-auto absolute bottom-0 right-10  p-10'>
            <Link to="/panduan">
               <FaQuestionCircle className="text-2xl" />
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
