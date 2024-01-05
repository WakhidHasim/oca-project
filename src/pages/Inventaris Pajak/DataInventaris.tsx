import React from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';

const DataInventaris: React.FC = () => {
  const ActionsButtons: React.FC = () => (
    <div className='flex space-x-2 items-center text-white'>
      <Link to='/editinventaris'>
        <ButtonTabel
          text='Edit'
          icon={<FaEdit size={16} />}
          bgColor='bg-orange'
        />
      </Link>

      <Link to=''>
        <ButtonTabel
          text='Hapus'
          icon={<RiDeleteBin6Fill size={16} />}
          bgColor='bg-delete'
        />
      </Link>
    </div>
  );

  const columns = [
    'No',
    'Tanggal Input',
    'Uraian Kegiatan',
    'Jenis Pajak',
    'Objek Pajak',
    'Aksi',
  ];
  const data: {
    id: number;
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    col5: React.ReactNode;
  }[] = [];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen relative'>
      <div className='rounded-xl px-7'>
        <div className='my-3 pl-3 pb-4'>
          <h1 className='text-base md:text-lg font-semibold py-2'>
            Data Inventarisasi Pajak
          </h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <li className='flex items-center  '>
              <p className='text-gray-800'>Inventarisasi Pajak</p>
              <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
            </li>
            <li className='flex items-center'>
              <p className='text-gray-800'>Data Inventarisasi Pajak</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between pb-8'>
              <div className='flex md:flex-row flex-col items-center'>
                <Link to='/tambahinventaris'>
                  <ButtonTabel
                    text='Tambah Data'
                    icon={<FaPlus size={16} />}
                    bgColor='bg-tambah-data'
                  />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center'>
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

export default DataInventaris;
