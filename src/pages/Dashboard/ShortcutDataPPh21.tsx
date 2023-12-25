import React from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import SearchBar from '../../components/Search/SearchBar';
import { Link } from 'react-router-dom';
import DateRange from '../../components/Filter/DateRange';
import { IoArrowUndoSharp } from "react-icons/io5";


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
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  relative">
      <div className="rounded-xl px-7">
        <div className="my-3 pl-3 pb-4">
          <h1 className='text-base md:text-lg font-semibold py-2'>Data Total PPh 21 Verifikasi</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <Link to='/dashboard'>
                <li className="flex items-center  ">
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
            <div className="flex flex-col md:flex-row py-3 justify-between pb-5">
              <div className="flex md:flex-row flex-col items-center">
                <Link to="/dashboard">
                  <button className='bg-gray-400 text-white p-2 rounded px-4 flex gap-1 text-sm'>
                    <IoArrowUndoSharp size={18} clasName="p-1 text-white  "/>
                    <span>Kembali</span>
                  </button>
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
