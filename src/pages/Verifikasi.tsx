import React from 'react';
import logo from "../assets/logo.svg";
import SatuanSatkerButton from '../components/SatuanSatkerButton';

const Verifikasi: React.FC = () => {
  const buttonData = [
    'PRODI S1-SISTEM INFORMASI',
    'DIREKTORAT PERENCANAAN DAN KEUANGAN',
    'DIREKTORAT SARANA DAN PRASARANA',
  ];

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-4xl md:max-w-5xl p-8  w-full'>
        <div className='relative flex flex-col md:flex-row gap-10'>
          <div className='text-center items-center bg-slate-50 p-8 py-20 flex flex-col justify-center w-full rounded-2xl shadow-md'>
            <div className='py-6 text-center'>
              <div className='flex md:gap-6 items-center justify-center px-3 pb-3'>
                <div className='w-14 lg:w-26 drop-shadow-md'>
                  <img src={logo} className='w-full' alt='Login' />
                </div>
                <h1 className='font-bold text-base md:text-2xl py-2 uppercase drop-shadow-md'>One Collecting Agent (OCA)</h1>
              </div>
              <h2 className='font-medium text-sm md:text-base pb-2'>Wiwi Widayani, S.Kom M.Kom</h2>
              <p className='text-xs md:text-sm text-slate-500'>Pilih Satuan Kerja (Agent)</p>
              <div className='pt-6 space-y-3 justify-start flex items-center flex-col'>
                {buttonData.map((text, index) => (
                  <SatuanSatkerButton key={index} text={text} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
