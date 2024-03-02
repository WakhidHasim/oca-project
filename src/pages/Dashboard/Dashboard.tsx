import React, { useState, useEffect } from 'react';
import CardDashboard from '../../components/Card/CardDashboard';
import { FaQuestionCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
// import { FaDatabase } from 'react-icons/fa';
import { BsBank } from 'react-icons/bs';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';

interface ApiDataKegiatanBadanUsaha {
  pph23Entry: number;
  pph23Verifikasi: number;
  pph23Setor: number;
  pph4Ayat2Entry: number;
  pph4Ayat2Verifikasi: number;
  pph4Ayat2Setor: number;
}

const Dashboard: React.FC = () => {
  const [apiDataKegiatanBadanUsaha, setApiDataKegiatanBadanUsaha] =
    useState<ApiDataKegiatanBadanUsaha>({
      pph23Entry: 0,
      pph23Verifikasi: 0,
      pph23Setor: 0,
      pph4Ayat2Entry: 0,
      pph4Ayat2Verifikasi: 0,
      pph4Ayat2Setor: 0,
    });

  const fetchData = async () => {
    try {
      const response = await fetch(
        'http://localhost:3000/api/dashboard/count-kegiatan-badan-usaha',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiDataKegiatanBadanUsaha(data.result);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  relative'>
      <div className='rounded-xl px-7'>
        <div className='font-semibold my-3 pl-3'>
          <h1 className='text-base md:text-lg py-2'>
            Informasi Total PPh Tahun {currentYear}
          </h1>
        </div>
        <div className='p-2 pt-5 pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          <CardDashboard
            text='Total PPh 23 Entry'
            icon={<BsBank size={35} />}
            count={apiDataKegiatanBadanUsaha.pph23Entry.toString()}
          />
          <CardDashboard
            text='Total PPh 23 Verifikasi'
            icon={<BsBank size={35} />}
            count={apiDataKegiatanBadanUsaha.pph23Verifikasi.toString()}
          />
          <CardDashboard
            text='Total PPh 23 Setor'
            icon={<BsBank size={35} />}
            count={apiDataKegiatanBadanUsaha.pph23Setor.toString()}
          />
          <CardDashboard
            text='Total PPh 4 Ayat 2 Entry'
            icon={<HiOutlineBuildingOffice2 size={35} />}
            count={apiDataKegiatanBadanUsaha.pph4Ayat2Entry.toString()}
          />
          <CardDashboard
            text='Total PPh 4 Ayat 2 Verifikasi'
            icon={<HiOutlineBuildingOffice2 size={35} />}
            count={apiDataKegiatanBadanUsaha.pph4Ayat2Verifikasi.toString()}
          />
          <CardDashboard
            text='Total PPh 4 Ayat 2 Setor'
            icon={<HiOutlineBuildingOffice2 size={35} />}
            count={apiDataKegiatanBadanUsaha.pph4Ayat2Setor.toString()}
          />
        </div>
        <div className='flex justify-end w-full mx-auto absolute bottom-0 right-10 '>
          <Link to='/panduan'>
            <FaQuestionCircle className='text-2xl text-gray-600' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
