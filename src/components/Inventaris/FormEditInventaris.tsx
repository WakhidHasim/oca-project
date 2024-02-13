import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { FaEdit } from 'react-icons/fa';
import ButtonTabel from '../Button/ButtonTabel';

const FormEditInventaris: React.FC = () => {
  const optionsPengajuanAnggaran = [{ value: 'no1', label: 'Honorarium' }];
  const optionsObjekPajak = [{ value: 'no1', label: 'Jasa Perbaikan' }];

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
            Uraian Kegiatan
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-sm block mt-1'>
            Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode (ke-
            atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan dibedakan
            untuk PT dan PTT)
          </p>
          <input
            type='text'
            id='uraian'
            name='uraian'
            className='w-full p-2 mt-2 border rounded-md text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Pengajuan Anggaran
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsPengajuanAnggaran}
            isSearchable
            isClearable
            placeholder='Pilih Pengajuan Anggaran'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Jenis Pajak</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsObjekPajak}
            isSearchable
            isClearable
            placeholder='Pilih Jenis Pajak'
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
          <label className='inline-block font-semibold text-base mb-2'>
            Nominal DPP (Dasar Penghasilan Pajak)
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-sm block mt-1'>Form Input Format Rupiah</p>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nominal Pajak
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Pemotong
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            NPWP Pemotong
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Bukti Dokumentasi
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md mt-2 text-sm'
            onChange={handleFileUpload}
          />
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/inventaris'>
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
export default FormEditInventaris;
