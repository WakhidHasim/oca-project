import React from 'react';
import CardDashboard from '../components/CardDashboard';


const Dashboard: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen  relative">
    <div className=" min-h-screen rounded-xl px-7">
      <div className="text-sm font-semibold my-3 pl-3">
        <h1 className='text-lg py-2 text-custom-purple'>Informasi Total PPh tahun 2023</h1>
      </div>
      <div className="p-2 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <CardDashboard text="Total PPh21 Verifikasi" />
        <CardDashboard text="Total PPh21 Sudah Setor" />
        <CardDashboard text="Total PPh21 Belum Setor" />
        <CardDashboard text="Total PPh23 Verifikasi" />
        <CardDashboard text="Total PPh23 Verifikasi" />
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
