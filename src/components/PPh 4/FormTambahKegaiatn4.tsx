import React from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';

import ButtonTabel from '../Button/ButtonTabel';

const FormTambahKegaiatn4: React.FC = () => {
  const optionsPengajuanAnggaran = [{ value: 'no1', label: 'Honorarium' }];
  const optionsBadanUsaha = [{ value: 'no1', label: 'Rivana Inc.' }];
  const optionsJenisPenghasilan = [{ value: 'no1', label: 'Jasa Perbaikan' }];
  const optionsObjekPajak = [{ value: 'no1', label: 'Jasa Perbaikan' }];
  const optionsPencairanPenghasilan = [{ value: 'no1', label: 'DPK' }];

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
            Jenis Penghasilan
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsJenisPenghasilan}
            isSearchable
            isClearable
            placeholder='Pilih Jenis Penghasilan'
          />
        </div>

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
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsBadanUsaha}
            isSearchable
            isClearable
            placeholder='Pilih Badan Usaha'
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
            Penghasilan Bruto
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            id='pic'
            name='pic'
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Tarif Pajak
          </label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2 text-sm disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Potongan Pajak
          </label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2 disabled:bg-gray-200 text-sm'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Penghasilan Diterima
          </label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md mt-2 etxt-sm disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            PIC (Pencaiiran Penghasilan)
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsPencairanPenghasilan}
            isSearchable
            isClearable
            placeholder='Pilih PIC (Pencairan Penghasilan)'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Dokumen Invoice
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Dokumen Faktur Pajak
          </label>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={handleFileUpload}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Dokumen Kerjasama Kegiatan
          </label>
          <input
            type='file'
            id='uploadBuktiBayar'
            name='uploadBuktiBayar'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={handleFileUpload}
          />
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/kegiatanPPh4'>
          <ButtonTabel
            text='Kembali'
            icon={<IoArrowUndoSharp size={16} />}
            bgColor='bg-gray'
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
export default FormTambahKegaiatn4;
