import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import CardDetailInformasi from "../../components/Card/CardDetailInformasi";
import { Link } from 'react-router-dom';

const DetailPanduanPPh21: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-8">
        <div className="rounded-xl px-2 md:px-7">
            <div className="my-3 pl-3">
                <h1 className='text-base md:text-lg font-semibold py-2'>Pajak Penghasilan (PPh) 21</h1>
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
                        <p className="text-gray-800">Detail Informasi PPh 21</p>
                    </li>
                </ol>
            </div>

           <div className='w-full mx-auto p-2 pt-5'>
                <CardDetailInformasi
                    text='21'
                    objekPajak={{
                        title: 'Objek Pajak',
                        items: ['Upah', 'Honorarium', 'Tunjangan dan pembayaran lainnya yang terkait dengan pekerjaan atau jabatan', 'Jasa dan kegiatan yang dilakukan oleh perorangan'],
                    }}
                    tarifPajak={{
                        title: 'Tarif Pajak',
                        items: ['Pegawai tetap, penerimaan gabung gaji tarif pkp x penghasilan Bruto keseluruhan penghasilan', 'Pegawai tetap, penerimaan pisah gaji 50% x lapisan tarif potong x penghasilan Bruto', 'Pegawai tetap dan bukan pegawai 50% x penghasilan Bruto x 5% ber NPWP, 20% lebih tinggi bagi Non NPWP', 'Hadiah / Penghargaan WP Orang Pribadi 5% penghasilan Bruto ber NPWP, 20% lebih tinggi bagi Non NPWP'],
                    }}
                    keterangan='Tanggal Input PPh  berakhir pada tanggal 30 setiap akhir bulan. Pastikan sudah input sebelum batas waktu yang ditentukan!'
                    />
           </div>
        </div>
    </div>
    );
};

export default DetailPanduanPPh21;