import React, { useState } from 'react';
import Select from 'react-select';
import { FaEdit } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

import ButtonTabel from '../../Button/ButtonTabel';

const FormEditWPBU: React.FC = () => {
  const [, setskbpph23] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const optionsBank = [{ value: 'no1', label: 'Mandiri' }];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  const handleSkbpph23Change = (value: string) => {
    setskbpph23(value);
    setShowForm(value === 'ya');
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full'>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Email
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto Identitas Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            className='w-full p-2 border rounded-md mt-2 text-sm'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Wajib Pajak / Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className=' text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan sesuai nama identitas NPWP. Jika belum ber-NPWP iskan nama
            Badan Usaha
          </p>
          <input
            type='text'
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kota NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            No Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Bank
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsBank}
            isSearchable
            isClearable
            placeholder='Pilih Nama Bank'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto Bukti Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className=' text-sm italic'>
            Dapat berupa: foto identitas buku tabungan atau screenshot info
            rekening & nama m-banking
          </p>
          <input
            type='file'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Narahubung
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kontak Narahubung
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input type='text' className='w-full p-2 border rounded-md' />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Ada SKBPPh23
          </label>
          <span className='text-red-500 p-1'>*</span>
          <div className='flex items-center mt-2'>
            <label htmlFor='ya' className='mr-4'>
              <input
                type='radio'
                id='ya'
                name='billing'
                value='ya'
                onChange={(e) => handleSkbpph23Change(e.target.value)}
                className='mr-2'
              />
              YA
            </label>
            <label htmlFor='tidak'>
              <input
                type='radio'
                id='tidak'
                name='billing'
                value='tidak'
                onChange={(e) => handleSkbpph23Change(e.target.value)}
                className='mr-2'
              />
              Tidak
            </label>
          </div>
        </div>

        {showForm && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Masa Berlaku Bebas PPh 23
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload File Surat Bebas PPh 23
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='file'
                className='w-full p-2 border rounded-md text-sm mt-2'
                onChange={handleFileUpload}
              />
            </div>
          </div>
        )}

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Status PKP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <div className='flex items-center mt-2'>
            <label htmlFor='ya' className='mr-4'>
              <input
                type='radio'
                id='ya'
                name='billing'
                value='ya'
                onChange={(e) => setskbpph23(e.target.value)}
                className='mr-2'
              />
              YA
            </label>
            <label htmlFor='tidak'>
              <input
                type='radio'
                id='tidak'
                name='billing'
                value='tidak'
                className='mr-2'
              />
              Tidak
            </label>
          </div>
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/dataWPBU'>
          <ButtonTabel
            text='Kembali'
            icon={<IoArrowUndoSharp size={16} />}
            bgColor='bg-gray'
          />
        </Link>

        <Link to=''>
          <ButtonTabel
            text='Edit'
            icon={<FaEdit size={16} />}
            bgColor='bg-orange'
          />
        </Link>
      </div>
    </div>
  );
};
export default FormEditWPBU;
