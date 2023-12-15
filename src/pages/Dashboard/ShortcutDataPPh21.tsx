import React from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import SearchBar from '../../components/Search/SearchBar';
import { Link } from 'react-router-dom';
import { TiCancel } from "react-icons/ti";
import DateRange from '../../components/Filter/DateRange';

const ShortcutDataPPh21: React.FC = () => {

  const columns =  ['No', 'Tanggal Kegiatan', 'Uraian Kegiatan', 'No Pengajuan', 'Total Pajak', 'Status'];
  const data: {
    id: number;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;

  }[] = [
    { id: 1, col1: '04-12-23', col2: 'Data 2', col3: '01', col4: '10000', col5: 'aktif'},
    { id: 2, col1: '04-12-23', col2: 'Data 5', col3: '02', col4: '20000', col5: 'aktif'},
  ];

  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen relative">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3 pb-4">
          <h1 className='text-lg xl:text-2xl py-2'>Data Total PPh 21 Verifikasi</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <Link to='/dashboard'>
                <li className="flex items-center text-purple">
                 <p className="text-gray-800">Dashboard</p>
                  <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
              </li>
            </Link>
            <Link to="/PPh21Shortcut">
            <li className="flex items-center">
              <p className="text-gray-800">Data PPh 21 Verifikasi</p>
            </li>
            </Link>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className="w-full mx-auto p-5 rounded">
            <div className="flex flex-col md:flex-row py-3 justify-between">
              <div className="flex md:flex-row flex-col items-center">
                <Link to="/dashboard">
                  <ButtonTabel text="Kembali" icon={<TiCancel size={20} />} />
                </Link>
              </div>
              <div className="flex md:flex-row flex-col items-center">
                <div className='flex justify-end'>
                  <DateRange />
                  <SearchBar />
                </div>
          
              </div>
            </div>
            <TabelData columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default  ShortcutDataPPh21;
