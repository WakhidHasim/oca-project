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

  const idl = localStorage.getItem('idl') || '';
  const nama_satker = localStorage.getItem('nama_satker') || '';

  const optionsPencairanPenghasilan = [
    { value: '233.03', label: 'DPK-Direktorat Perencanaan dan Keuangan' },
    { value: idl, label: nama_satker },
  ];

  const [errors, setErrors] = useState({
    uraianKegiatan: '',
    kodeJenisPenghasilan: '',
    idKegiatanAnggaran: '',
    picPencairanPenghasilan: '',
  });

  const [formData, setFormData] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: 0,
    picPencairanPenghasilan: '',
    mintaBillingSendiri: false,
    idl: idl,
  });

  const fetchJenisPenghasilanOptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/jenis-penghasilan/pph21`
      );
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const optionsjenisPenghasilan = data.result.map(
          (objek: JenisPenghasilan) => ({
            value: objek.kodeJenisPenghasilan.toString(),
            label: objek.jenisPenghasilan,
          })
        );
        setOptionsjenisPenghasilan(optionsjenisPenghasilan);
      }
    } catch (error) {
      console.error('Error fetching Jenis Penghasilan options:', error);
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

  useEffect(() => {
    fetchPengajuanAnggaranOptions();
    fetchJenisPenghasilanOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.uraianKegiatan) {
      newErrors.uraianKegiatan = 'Uraian Kegiatan harus diisi';
      isValid = false;
    } else {
      newErrors.uraianKegiatan = '';
    }

    if (!formData.kodeJenisPenghasilan) {
      newErrors.kodeJenisPenghasilan = 'Jenis Penghasilan harus dipilih';
      isValid = false;
    } else {
      newErrors.kodeJenisPenghasilan = '';
    }

    if (!formData.idKegiatanAnggaran) {
      newErrors.idKegiatanAnggaran = 'Pengajuan Anggaran harus dipilih';
      isValid = false;
    } else {
      newErrors.idKegiatanAnggaran = '';
    }

    if (!formData.picPencairanPenghasilan) {
      newErrors.picPencairanPenghasilan =
        'PIC Pencairan Penghasilan harus dipilih';
      isValid = false;
    } else {
      newErrors.picPencairanPenghasilan = '';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const url =
        'http://localhost:3000/api/kegiatan-penghasilan-orang-pribadi';

      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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
                  kodeJenisPenghasilan: Number(selectedOption.value),
                });
              }
            }}
          />
          {errors.kodeJenisPenghasilan && (
            <p className='text-red-500 text-sm'>
              {errors.kodeJenisPenghasilan}
            </p>
          )}
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
            className='w-full p-2 mt-2 border rounded-md text-sm '
            onChange={(e) =>
              setFormData({
                ...formData,
                uraianKegiatan: e.target.value,
              })
            }
          />
          {errors.uraianKegiatan && (
            <p className='text-red-500 text-sm'>{errors.uraianKegiatan}</p>
          )}
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
          {errors.idKegiatanAnggaran && (
            <p className='text-red-500 text-sm'>{errors.idKegiatanAnggaran}</p>
          )}
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
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  picPencairanPenghasilan: selectedOption.value,
                });
              }
            }}
          />
          {errors.picPencairanPenghasilan && (
            <p className='text-red-500 text-sm'>
              {errors.picPencairanPenghasilan}
            </p>
          )}
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
                checked={formData.mintaBillingSendiri === false}
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
              bgColor='bg-detail'
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
