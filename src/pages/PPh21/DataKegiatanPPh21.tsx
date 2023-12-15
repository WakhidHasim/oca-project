import React from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { TbListDetails } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Status from '../../components/Filter/Status';

const DataKegiatanPPh21: React.FC = () => {
  const ActionsButtons: React.FC = () => (
    <div className="flex space-x-2 items-center justify-center text-white">
      <Link to="/detailPenerima21">
        <button className="bg-blue-700 p-2 flex gap-1 rounded">
          <TbListDetails size={17} className="" />
          <span>Detail</span>
        </button>
      </Link>
      <Link to="/editKegiatan21">
        <button className="bg-orange p-2 flex gap-1 rounded">
          <FaEdit size={17} className="" />
          <span>Edit</span>
        </button>
      </Link>
      <button className="bg-red-600 p-2 flex gap-1 rounded">
        <RiDeleteBin6Fill size={17} className="" />
        <span>Delete</span>
      </button>
    </div>
  );

  const columns = ['No', 'Tanggal Kegiatan', 'Uraian Kegiatan', 'No Pengajuan', 'Total Pajak', 'Status', 'Aksi'];
  const data: {
    id: number;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: React.ReactNode;
  }[] = [
    { id: 1, col1: '04-12-23', col2: 'Data 2', col3: '01', col4: '10000', col5: 'aktif', col6: <ActionsButtons /> },
    { id: 2, col1: '04-12-23', col2: 'Data 5', col3: '02', col4: '20000', col5: 'aktif', col6: <ActionsButtons /> },
    { id: 3, col1: '04-12-23', col2: 'Data 5', col3: '02', col4: '20000', col5: 'aktif', col6: <ActionsButtons /> },
  ];

  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen relative">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3 pb-4">
          <h1 className='text-lg xl:text-2xl py-2'>Data Kegiatan 21</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <li className="flex items-center text-purple">
              <p className="text-gray-800">PPh 21</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <p className="text-gray-800">Data Kegiatan PPh 21</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className="w-full mx-auto p-5 rounded">
            <div className="flex flex-col md:flex-row py-3 justify-between">
              <div className="flex md:flex-row flex-col items-center">
                <Link to="/tambahKegiatan21">
                  <ButtonTabel text='Tambah Data' icon={<FaPlus size={16}/>} /> 
                </Link>
              </div>
              <div className="flex md:flex-row flex-col items-center">
                <div className='flex justify-end items-center'>
                  <DateRange />
                  <Status />
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

export default DataKegiatanPPh21;
