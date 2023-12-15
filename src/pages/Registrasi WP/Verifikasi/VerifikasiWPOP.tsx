import React from 'react';
import TabelData from '../../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../../components/Button/ButtonTabel';
import SearchBar from '../../../components/Search/SearchBar';
import { FaEdit } from "react-icons/fa";
import { MdDone, MdOutlineClose, MdRefresh } from "react-icons/md";


const VerifikasiWPOP: React.FC = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  const ActionsButtons: React.FC = () => (
    <div className="flex space-x-2 justify-center items-center text-white">
      <button className="bg-orange p-2 flex gap-1 rounded">
        <FaEdit size={17} className="" />
        <span>Detail</span>
      </button>
      <button className="bg-green-600 p-2 flex gap-1 rounded">
        <MdDone size={17} className="" />
        <span>Approve</span>
      </button>
      <button className="bg-red-600 p-2 flex gap-1 rounded">
        <MdOutlineClose size={17} className="" />
        <span>Reject</span>
      </button>
    </div>
  );

  const columns =  ['No', 'Nama Pegawai', 'Golongan WP', 'NIK', 'NPWP', 'Aksi'];
  const data: {
    id: number;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: React.ReactNode;
  }[] = [
    { id: 1, col1: '04-12-23', col2: 'Data 2', col3: '01', col4: '10000', col5: <ActionsButtons /> },
    { id: 2, col1: '04-12-23', col2: 'Data 5', col3: '02', col4: '20000', col5: <ActionsButtons /> },
  ];

  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen relative">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3 pb-4">
          <h1 className='text-lg xl:text-2xl py-2'>Data Verifikasi WPOP</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <li className="flex items-center text-purple">
              <p className="text-gray-800">Verifikasi WPOP</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            <li className="flex items-center">
              <p className="text-gray-800">Data Verifikasi WPOP</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className="w-full mx-auto p-5 rounded">
            <div className="flex flex-col md:flex-row py-3 justify-between">
              <div className="flex md:flex-row flex-col items-center">
                <ButtonTabel text="Refresh" icon={<MdRefresh size={17} />} onClick={refreshPage} />

              </div>
              <div className="flex md:flex-row flex-col items-center">
                <div className='flex justify-end'>
                 
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

export default VerifikasiWPOP;
