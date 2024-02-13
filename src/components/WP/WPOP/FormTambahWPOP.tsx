import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';

import ButtonTabel from '../../Button/ButtonTabel';

type CitizenshipType = { value: string; label: string };

const FormTambahWPOP: React.FC = () => {
  const [citizenship, setCitizenship] = useState<CitizenshipType | null>(null);

  const optionsKewarganegaraan = [
    { value: 'wni', label: 'WNI' },
    { value: 'wna', label: 'WNA' },
  ];
  const optionsNegara = [{ value: 'no1', label: 'Indonesia' }];
  const optionsBank = [{ value: 'no1', label: 'Mandiri' }];
  const optionsNPWP = [{ value: 'no1', label: 'Ya' }];
  const optionsStatusPegawai = [{ value: 'no1', label: 'Ya' }];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full'>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Lengkap
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Status Pegawai
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsStatusPegawai}
            isSearchable
            isClearable
            placeholder='Pilih Status Pegawai'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            E-mail
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-gray-600 text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan email aktif untuk menerima bukti potong
          </p>

          <input
            type='text'
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kewarganegaraan
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsKewarganegaraan}
            isSearchable
            isClearable
            placeholder='Pilih Warga Kenegaraan'
            value={citizenship}
            onChange={(selectedOption) => setCitizenship(selectedOption)}
          />
        </div>

        {citizenship?.value === 'wni' && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Negara
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsNegara}
                isSearchable
                isClearable
                placeholder='Pilih Nama Negara'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                NIK
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className='text-sm italic'>
                <span className='text-red-500'>*</span>
                Isikan 16 digit angka NIK di KTP
              </p>
              <input
                type='text'
                id='uraian'
                name='uraian'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama KTP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                id='uraian'
                name='uraian'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-4'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload KTP
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
                Bank Transfer
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
                No Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Pemegang Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className='text-sm italic'>
                <span className='text-red-600'>*</span>
                Apakah sesuai dengan nama KTP? klik jika sesuai
              </p>
              <input
                type='text'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload Foto Identitas Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className=' text-sm italic'>
                <span className='text-red-500'>*</span>Dapat berupa: foto
                identitas buku tabungan atau screenshot info rekening & nama
                m-banking
              </p>
              <input
                type='file'
                className='w-full p-2 mt-2 text-sm border rounded-md'
                onChange={handleFileUpload}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Apakah Memiliki NPWP?
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select options={optionsNPWP} placeholder='Pilih NPWP' />
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
                Nama NPWP
              </label>
              <span className='text-red-500 p-1'>*</span>
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
                className='w-full p-2 mt-2 text-sm border rounded-md'
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
          </div>
        )}

        {citizenship?.value === 'wna' && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Negara
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsNegara}
                isSearchable
                isClearable
                placeholder='Pilih Nama Negara'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                ID Pasport
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Foto Passport
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
                Tanggal Berakhir Passport
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Bank Transfer
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
                No Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>
          </div>
        )}
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/registerWP/dataWPOP'>
          <ButtonTabel
            text='Kembali'
            icon={<IoArrowUndoSharp size={16} />}
            bgColor='bg-detail'
          />
        </Link>

        <Link to=''>
          <ButtonTabel
            text='Simpan'
            icon={<IoIosSave size={16} />}
            bgColor='bg-tambah-data'
          />
        </Link>
      </div>
    </div>
  );
};
export default FormTambahWPOP;
