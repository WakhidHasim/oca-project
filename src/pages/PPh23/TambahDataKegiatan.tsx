import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FormTambahKegiatan from '../../components/PPh 23/FormTambahKegiatan23';
import { Link } from 'react-router-dom';

const TambahDataKegiatan: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-10">
      <div className="rounded-xl px-7">
        <div className=" my-3 pl-3">
          <h1 className='text-base md:text-lg font-semibold pb-2'>Form Tambah Data Kegiatan PPh 23</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            
            <Link to="/dataKegiatan23">
            <li className="flex items-center  ">
              <p className="text-gray-800">PPh 23</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>

            <Link to="/dataKegiatan23">
            <li className="flex items-center  ">
              <p className="text-gray-800">Data PPh 23</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>
            <li className="flex items-center">
              <p className="text-gray-800">Tambah Data Kegiatan PPh 23</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5  rounded'>
            <FormTambahKegiatan />
        </div>
      </div>
    </div>
  );
};

export default TambahDataKegiatan;
