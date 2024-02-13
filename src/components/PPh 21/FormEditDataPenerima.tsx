import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';
import ButtonTabel from '../Button/ButtonTabel';

const FormEditDataPenerima: React.FC = () => {
  const optionsPenerima = [{ value: 'no1', label: 'Wiwi Widayani, M.Kom' }];

  const optionsMetodePotong = [
    { value: 'no1', label: 'Pegawai Tetap Pisah Gaji' },
  ];

  const optionsObjekPajak = [{ value: 'no1', label: 'Pegawai Tetap' }];

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full'>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Nama Penerima</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsPenerima}
            isSearchable
            isClearable
            placeholder='Pilih Nama Penerima'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Jenis Wajib Pajak / Status Pegawai
          </label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>NPWP</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>No Rekening</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Nama Rekening</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Bank Transfer</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Lapisan</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Metode Potong</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsMetodePotong}
            isSearchable
            isClearable
            placeholder='Pilih Metode Potong'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Objek Pajak</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsObjekPajak}
            isSearchable
            isClearable
            placeholder='Pilih Objek Pajak'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Penghasilan Bruto
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input type='text' className='w-full p-2 border rounded-md mt-2' />
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Tarif Pajak</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Potongan Pajak</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Penghasilan Diterima
          </label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2 disabled:bg-gray-200'
          />
        </div>
      </form>
      <div className='flex gap-5 justify-end pt-8 text-white '>
        <Link to='/detailPenerima21'>
          <ButtonTabel
            text='Kembali'
            icon={<IoArrowUndoSharp size={16} />}
            bgColor='bg-detail'
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
export default FormEditDataPenerima;
