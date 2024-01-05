import React from 'react';
import TabelData from '../../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../../components/Button/ButtonTabel';
import SearchBar from '../../../components/Search/SearchBar';
import { MdDone, MdOutlineClose, MdRefresh } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { TbListDetails } from 'react-icons/tb';

const VerifikasiWPOP: React.FC = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  const ActionsButtons: React.FC = () => (
    <div className='flex space-x-2 justify-center items-center text-white'>
      <Link to=''>
        <ButtonTabel
          text='Detail'
          icon={<TbListDetails size={16} />}
          bgColor='bg-detail'
        />
      </Link>

      <Link to=''>
        <ButtonTabel
          text='Approve'
          icon={<MdDone size={16} />}
          bgColor='bg-approve'
        />
      </Link>

      <Link to=''>
        <ButtonTabel
          text='Reject'
          icon={<MdOutlineClose size={16} />}
          bgColor='bg-delete'
        />
      </Link>
    </div>
  );

  const columns = ['No', 'Nama Pegawai', 'Golongan WP', 'NIK', 'NPWP', 'Aksi'];
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
        <div className=' my-3 pl-3 pb-4'>
          <h1 className='text-base md:text-lg font-semibold py-2'>
            Data Verifikasi WPOP
          </h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <li className='flex items-center  '>
              <p className='text-gray-800'>Verifikasi WPOP</p>
              <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
            </li>
            <li className='flex items-center'>
              <p className='text-gray-800'>Data Verifikasi WPOP</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center'>
                <ButtonTabel
                  text='Refresh'
                  icon={<MdRefresh size={17} />}
                  onClick={refreshPage}
                  bgColor='bg-tambah-data'
                />
              </div>
              <div className='flex md:flex-row flex-col items-center'>
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
