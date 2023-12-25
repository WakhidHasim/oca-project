import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import CardPanduan from '../../components/Card/CardPanduan';
import pph21 from "../../assets/pph21.png"
import pph23 from "../../assets/pph23.png"
import pph4 from "../../assets/pph4.png"
import { Link } from 'react-router-dom';
import {IoArrowUndoSharp} from "react-icons/io5"

const PanduanInformasi: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-10">
        <div className="rounded-xl px-2 md:px-7">
            <div className=" my-3 pl-3 pb-4">
                <h1 className='text-base md:text-lg font-semibold py-2'>Panduan Informasi Pajak Penghasilan (PPh)</h1>
                <ol className="list-none inline-flex text-xs md:text-sm">
                <Link to="/dashboard">
                <li className="flex items-center  ">
                    <p className="text-gray-800">Dashboard</p>
                    <IoIosArrowForward className="fill-current w-3 h-3 mx-3"/>
                </li>
                </Link>
                
                <li className="flex items-center">
                    <p className="text-gray-800">Informasi PPh</p>
                </li>
                </ol>
            </div>

            <div className='text-white pl-3 pt-7'>
                <Link to="/panduan">
                    <button className='bg-gray-400 p-2 rounded px-4 flex gap-1 text-sm'>
                        <IoArrowUndoSharp size={18} clasName="p-1 text-white  "/>
                        <span>Kembali</span>
                    </button>
                </Link>
            </div>

            <div className="p-2 pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <Link to='/detailPanduan21'>
                    <CardPanduan text='PPh Pasal 21' imageSrc={pph21} />
                </Link>
                <Link to="/detailPanduan23">
                    <CardPanduan text='PPh Pasal 23' imageSrc={pph23} />
                </Link>
                <Link to="/detailPanduan4">
                    <CardPanduan text='PPh Pasal 4 Ayat 2' imageSrc={pph4} />
                </Link>
            </div>
        </div>
    </div>
    );
};

export default PanduanInformasi;