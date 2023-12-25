import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FormTambahWPBU from '../../../components/WP/WPBU/FormTambahWPBU';
import { Link } from 'react-router-dom';

const TambahWPBU: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-10">
      <div className="rounded-xl px-7">
        <div className=" my-3 pl-3">
          <h1 className='text-base md:text-lg font-semibold pb-2'>Tambah Data Registrasi WPBU</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <Link to="/dataWPBU">
            <li className="flex items-center  ">
              <p className="text-gray-800">Registrasi WPBU</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>

            <Link to="/dataWPBU">
             <li className="flex items-center  ">
              <p className="text-gray-800">Data Registrasi WPBU</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>
            <li className="flex items-center">
              <p className="text-gray-800">Tambah Data Registrasi WPBU</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-8 rounded'>
           <FormTambahWPBU />
        </div>
      </div>
    </div>
  );
};

export default TambahWPBU;
