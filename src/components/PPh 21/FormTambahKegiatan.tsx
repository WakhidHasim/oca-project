import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';

import ButtonTabel from '../Button/ButtonTabel';

interface PengajuanAnggaran {
  idKegiatanAnggaran: string;
  noPengajuan: string;
  kegiatan: string;
}

interface JenisPenghasilan {
  kodeJenisPenghasilan: number;
  jenisPenghasilan: string;
}

const FormTambahKegiatan: React.FC = () => {
  const navigate = useNavigate();

  const [optionsjenisPenghasilan, setOptionsjenisPenghasilan] = useState<
    { value: number; label: string }[]
  >([]);

  const [optionsPengajuanAnggaran, setOptionsPengajuanAnggaran] = useState<
    { value: string; label: string }[]
  >([]);

  const optionsPencairanPenghasilan = [{ value: 'dpk', label: 'DPK' }];

  const [formData, setFormData] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: 0,
    picPencairanPenghasilan: '',
    mintaBillingSendiri: false,
  });

  useEffect(() => {
    const fetchJenisPenghasilanOptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/jenis-penghasilan-pph23`
        );
        const data = await response.json();
        if (data && data.result && data.result.length > 0) {
          const optionsjenisPenghasilan = data.result.map(
            (objek: JenisPenghasilan) => ({
              value: objek.kodeJenisPenghasilan,
              label: objek.jenisPenghasilan,
            })
          );
          setOptionsjenisPenghasilan(optionsjenisPenghasilan);
        }
      } catch (error) {
        console.error('Error fetching Objek Pajak options:', error);
      }
    };

    const fetchPengajuanAnggaranOptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/pengajuan-anggaran`
        );
        const data = await response.json();
        if (data && data.result && data.result.length > 0) {
          const optionsPengajuanAnggaran = data.result.map(
            (objek: PengajuanAnggaran) => ({
              value: objek.idKegiatanAnggaran,
              label: objek.noPengajuan + ' - ' + objek.kegiatan,
            })
          );
          setOptionsPengajuanAnggaran(optionsPengajuanAnggaran);
        }
      } catch (error) {
        console.error('Error fetching Objek Pajak options:', error);
      }
    };

    fetchPengajuanAnggaranOptions();
    fetchJenisPenghasilanOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/kegiatan-penghasilan-orang-pribadi',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data) {
        const responseData = response.data;

        if (
          responseData.status &&
          responseData.status.code === 200 &&
          responseData.result
        ) {
          setFormData({
            ...formData,
          });

          console.log(setFormData);
          toast.success('Data added successfully!');
          navigate('/dataKegiatan21');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full' onSubmit={handleSubmit}>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Jenis Penghasilan
          </label>
          <span className='text-red-500 p-1'>*</span>

          <Select
            options={optionsjenisPenghasilan}
            isSearchable
            isClearable
            placeholder='Pilih Jenis Penghasilan'
            onChange={(
              selectedOption: SingleValue<{ value: number; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeJenisPenghasilan: selectedOption.value,
                });
              }
            }}
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
            name='uraianKegiatan'
            className='w-full p-2 mt-2 border rounded-md text-sm '
            onChange={(e) =>
              setFormData({
                ...formData,
                uraianKegiatan: e.target.value,
              })
            }
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
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  idKegiatanAnggaran: selectedOption.value,
                });
              }
            }}
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
                name='mintaBillingSendiri'
                value='true'
                className='mr-2'
                onChange={() =>
                  setFormData({ ...formData, mintaBillingSendiri: true })
                }
              />
              YA
            </label>
            <label htmlFor='billingTidak'>
              <input
                type='radio'
                id='billingTidak'
                name='mintaBillingSendiri'
                value='false'
                className='mr-2'
                onChange={() =>
                  setFormData({ ...formData, mintaBillingSendiri: false })
                }
              />
              Tidak
            </label>
          </div>
        </div>
        <div className='flex gap-5 justify-start pt-8 text-white'>
          <Link to='/dataKegiatan21'>
            <ButtonTabel
              text='Kembali'
              icon={<IoArrowUndoSharp size={16} />}
              bgColor='bg-gray'
            />
          </Link>

          <ButtonTabel
            text='Simpan'
            type='submit'
            icon={<IoIosSave size={16} />}
            bgColor='bg-tambah-data'
          />
        </div>
      </form>
    </div>
  );
};
export default FormTambahKegiatan;
