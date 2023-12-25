import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import CardDetailInformasi from "../../components/Card/CardDetailInformasi";
import { Link } from 'react-router-dom';

const DetailPanduanPPh23: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-8">
        <div className="rounded-xl px-2 md:px-7">
            <div className="my-3 pl-3">
                <h1 className='text-base md:text-lg font-semibold py-2'>Pajak Penghasilan (PPh) 23</h1>
                <ol className="list-none inline-flex text-xs md:text-sm">
                    <Link to="/dashboard">
                    <li className="flex items-center  ">
                        <p className="text-gray-800">Dashboard</p>
                        <IoIosArrowForward className="fill-current w-3 h-3 mx-3"/>
                    </li>
                    </Link>

                    <Link to="/panduan">
                    <li className="flex items-center  ">
                        <p className="text-gray-800">Informasi PPh</p>
                        <IoIosArrowForward className="fill-current w-3 h-3 mx-3"/>
                    </li>
                    </Link>

                
                    <li className="flex items-center">
                        <p className="text-gray-800">Detail Informasi PPh 23</p>
                    </li>
                </ol>
            </div>

           <div className='w-full mx-auto p-2 pt-5'>
               <CardDetailInformasi
                    text='23'
                    objekPajak={{
                        title: 'Objek Pajak',
                        items: ['Hadiah', 'Dividen', 'Bunga', 'Royalti', 'Sewa', 'Jasa kepada Wajib Pajak dan Bentuk Usaha Tetap (BUT)'],
                    }}
                    tarifPajak={{
                        title: 'Tarif Pajak',
                        items: ['15% dikenakan untuk penghasilan bunga, dividen,royalti, dan hadiah WP BUT', '2% dikenakan untuk jasa dan sewa ber-NPWP', '4% dikenakan untuk jasa dan sewa Non-NPWP'],
                    }}
                    keterangan='Pengiriman Bukti Potong langsung dari DJP (Direktorat Jenderal Pajak) ke email yang dicantumkan.'
                    />
           </div>
        </div>
    </div>
    );
};

export default DetailPanduanPPh23;