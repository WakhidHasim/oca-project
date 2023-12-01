import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import TabelData from '../components/TabelData';

const DataPPh21Shortcut: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-64  xl:p-10 pt-24 xl:pt-28 w-full min-h-screen">
        <div className="min-h-screen rounded-xl px-7">
            <div className="text-sm font-semibold my-3 pl-3">
                <h1 className='text-2xl pb-2 text-custom-purple'>Informasi Total PPh tahun 2023</h1>
                <ol className="list-none inline-flex">
                <li className="flex items-center text-purple">
                    <p className="text-gray-800">Dashboard</p>
                    <IoIosArrowForward className="fill-current w-3 h-3 mx-3"/>
                </li>
                <li className="flex items-center">
                    <p className="text-gray-800">Data PPh 21 Verifikasi</p>
                </li>
                </ol>
            </div>

            <div className='pt-5'>
                <TabelData />
            </div>
        </div>
    </div>
    );
};

export default DataPPh21Shortcut;