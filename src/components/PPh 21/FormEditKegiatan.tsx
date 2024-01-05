import React, { useState } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';

import ButtonTabel from '../Button/ButtonTabel';

const FormEditKegiatan: React.FC = () => {
  const [, setBilling] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const optionsPengajuanAnggaran = [
    { value: 'no1', label: 'Honorarium' },
    {
      value: 'no2',
      label:
        'S1GF/2023/Dec/5 - Biaya pendaftaran pelatihan sertifikasi pilot drone untuk 3 orang dosen',
    },
  ];
  const optionsJenisPenghasilan = [{ value: 'no1', label: 'Jasa Perbaikan' }];
  const optionsPencairanPenghasilan = [{ value: 'no1', label: 'DPK' }];

  const handleBilling = (value: string) => {
    setBilling(value);
    setShowForm(value === 'ya');
  };

  const handleDownload = () => {
    const fileUrl = 'URL_FILE';

    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = 'nama_file_unduhan.ext';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

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
            className='w-full p-2 mt-2 border rounded-md text-sm '
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
            PIC (Pencairan Penghasilan)
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
            Menghendaki Billing Terpisah?
          </label>
          <span className='text-red-500 p-1'>*</span>
          <div className='flex items-center mt-2'>
            <label htmlFor='billingYa' className='mr-4'>
              <input
                type='radio'
                id='billingYa'
                name='billing'
                value='ya'
                className='mr-2'
                onChange={(e) => handleBilling(e.target.value)}
              />
              YA
            </label>
            <label htmlFor='billingTidak'>
              <input
                type='radio'
                id='billingTidak'
                name='billing'
                value='tidak'
                className='mr-2'
                onChange={(e) => handleBilling(e.target.value)}
              />
              Tidak
            </label>
          </div>
        </div>

        {showForm && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Download Billing
              </label>
              <a
                href='#'
                onClick={handleDownload}
                className='w-full p-2 border rounded-md bg-gray-500 text-white block'
              >
                Download Billing
              </a>
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Kode Billing
              </label>
              <input
                type='text'
                disabled
                className='w-full p-2 border rounded-md mt-2 etxt-sm disabled:bg-gray-200'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload Bukti Bayar
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='file'
                id='uploadBuktiBayar'
                name='uploadBuktiBayar'
                className='w-full p-2 border rounded-md'
                onChange={handleFileUpload}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Kode NTPN
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                id='uraian'
                name='uraian'
                className='w-full p-2 mt-2 border rounded-md text-sm '
              />
            </div>
          </div>
        )}
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to='/dataKegiatan21'>
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

export default FormEditKegiatan;
