import React from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const ActionsButtons: React.FC = () => (
  <div className="flex space-x-2 items-center justify-center text-white">
    <Link to="/editPenerima21">
        <ButtonTabel 
          text='Edit' 
          icon={<FaEdit size={16}/>} 
          bgColor='bg-orange'/> 
      </Link>

    <Link to="">
        <ButtonTabel 
          text='Hapus' 
          icon={<RiDeleteBin6Fill size={16}/>} 
          bgColor='bg-delete'/> 
      </Link>
  </div>
);

const DetailPenerima: React.FC = () => {
  const columns = ['No', 'Tanggal Potong', 'Nama Penerima', 'Jenis WP', 'Penghasilan Bruto', 'Tarif Pajak', 'Potongan Pajak', 'Aksi'];
  const data: {
    id: number;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: string;
    col6: string;
    col7: React.ReactNode;
  }[] = [
    { id: 1, col1: '04-12-23', col2: 'Data 2', col3: '01', col4: '10000', col5: 'aktif', col6: '10%', col7: <ActionsButtons /> },
    { id: 2, col1: '04-12-23', col2: 'Data 5', col3: '02', col4: '20000', col5: 'aktif', col6: '10%', col7: <ActionsButtons /> },
  ];

  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  pb-10">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3 pb-4">
          <h1 className='text-lg xl:text-2xl py-2'>Data Detail Penerima Kegiatan PPh 21</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <Link to="/dataKegiatan21">
            <li className="flex items-center  ">
              <p className="text-gray-800">PPh 21</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>
            
            <Link to="/dataKegiatan21">
             <li className="flex items-center  ">
              <p className="text-gray-800">Data PPh 21</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>

            <li className="flex items-center">
              <p className="text-gray-800">Data Detail Penerima Kegiatan PPh 21</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className="w-full mx-auto p-5 rounded">
            <div className="flex flex-col md:flex-row py-3 justify-between">
              <div className="flex md:flex-row flex-col items-center">
                <Link to="/tambahPenerima21">
                  <ButtonTabel text='Tambah Data' 
                  icon={<FaPlus size={16}/>} 
                  bgColor='bg-tambah-data'
                  /> 
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

export default DetailPenerima;
