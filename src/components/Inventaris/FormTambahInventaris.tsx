import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../Button/ButtonTabel';
// import { formatRupiah } from '../../utils/FormatRupiah';

interface PengajuanAnggaran {
  idKegiatanAnggaran: string;
  noPengajuan: string;
  kegiatan: string;
}

interface ObjekPajak {
  kodeObjek: string;
  objekPajak: string;
  tarifNpwp: number;
  tarifNonNpwp: number;
}

const FormTambahInventaris: React.FC = () => {
  const navigate = useNavigate();

  const [fileBukti, setFileBukti] = useState<File | null>(null);

  const [optionsPengajuanAnggaran, setOptionsPengajuanAnggaran] = useState<
    { value: string; label: string }[]
  >([]);
  const [optionsObjekPajak, setOptionsObjekPajak] = useState<
    { value: string; label: string; tarifNpwp: number }[]
  >([]);

  const optionsJenisPajak = [
    { value: 'pph21', label: 'PPh 21' },
    { value: 'pph23', label: 'PPh 23' },
    { value: 'pph4Ayat2', label: 'PPh 4 Ayat 2' },
  ];

  const idl = localStorage.getItem('idl') || '';

  const [errors, setErrors] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    nominalDPP: '',
    jenisPajak: '',
    kodeObjek: '',
    nominalPajak: '',
    fileBukti: '',
    npwpPemotong: '',
    namaPemotong: '',
    idl: '',
  });

  const [formData, setFormData] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    nominalDPP: 0,
    jenisPajak: '',
    kodeObjek: '',
    nominalPajak: 0,
    fileBukti: '',
    npwpPemotong: '',
    namaPemotong: '',
    idl: '',
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'fileBukti':
          setFileBukti(file);
          setFormData({
            ...formData,
            fileBukti: file.name,
          });
          break;
        default:
          break;
      }
    }
  };

  const fetchPengajuanAnggaranOptions = async () => {
    try {
      const response = await fetch(`/api/pengajuan-anggaran`);
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
      console.error('Error fetching Pengajuan Anggaran options:', error);
    }
  };

  const fetchObjekPajakOptions = async () => {
    try {
      const response = await fetch(`/api/objek-pajak`);
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const objekPajakOptions = data.result.map((objek: ObjekPajak) => ({
          value: objek.kodeObjek,
          label: objek.objekPajak,
          tarifNpwp: objek.tarifNpwp,
        }));
        setOptionsObjekPajak(objekPajakOptions);
      }
    } catch (error) {
      console.error('Error fetching Objek Pajak options:', error);
    }
  };

  useEffect(() => {
    fetchPengajuanAnggaranOptions();
    fetchObjekPajakOptions();
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

    if (!formData.idKegiatanAnggaran) {
      newErrors.idKegiatanAnggaran = 'Pengajuan Anggaran harus dipilih';
      isValid = false;
    } else {
      newErrors.idKegiatanAnggaran = '';
    }

    if (!formData.nominalDPP) {
      newErrors.nominalDPP = 'Nominal DPP harus diisi';
      isValid = false;
    } else {
      newErrors.nominalDPP = '';
    }

    if (!formData.jenisPajak) {
      newErrors.jenisPajak = 'Jenis Pajak harus dipilih';
      isValid = false;
    } else {
      newErrors.jenisPajak = '';
    }

    if (!formData.kodeObjek) {
      newErrors.kodeObjek = 'Objek Pajak harus dipilih';
      isValid = false;
    } else {
      newErrors.kodeObjek = '';
    }

    if (!formData.nominalPajak) {
      newErrors.nominalPajak = 'Nominal Pajak harus diisi';
      isValid = false;
    } else {
      newErrors.nominalPajak = '';
    }

    if (!formData.npwpPemotong) {
      newErrors.npwpPemotong = 'NPWP Pemotong harus dipilih';
      isValid = false;
    } else {
      newErrors.npwpPemotong = '';
    }

    if (!formData.namaPemotong) {
      newErrors.namaPemotong = 'NPWP Pemotong harus dipilih';
      isValid = false;
    } else {
      newErrors.namaPemotong = '';
    }

    if (!formData.fileBukti) {
      newErrors.fileBukti = 'File Bukti Dokumentasi harus diisi';
      isValid = false;
    } else {
      newErrors.fileBukti = '';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('uraianKegiatan', formData.uraianKegiatan);
      formDataToSubmit.append(
        'idKegiatanAnggaran',
        formData.idKegiatanAnggaran
      );
      formDataToSubmit.append('nominalDPP', formData.nominalDPP.toString());
      formDataToSubmit.append('jenisPajak', formData.jenisPajak);
      formDataToSubmit.append('kodeObjek', formData.kodeObjek);
      formDataToSubmit.append('nominalPajak', formData.nominalPajak.toString());
      formDataToSubmit.append('fileBukti', fileBukti || '');
      formDataToSubmit.append('namaPemotong', formData.namaPemotong);
      formDataToSubmit.append('npwpPemotong', formData.npwpPemotong);

      formDataToSubmit.append('idl', idl);

      const url = '/api/inventarisasi-pajak';
      const response = await axios.post(url, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle response
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
          toast.success('Data Berhasil Ditambahkan!');
          navigate('/inventaris');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error submitting data:', error.message);
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
            onChange={(e) =>
              setFormData({
                ...formData,
                uraianKegiatan: e.target.value,
              })
            }
            className='w-full p-2 mt-2 border rounded-md text-sm'
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
            Nominal DPP (Dasar Penghasilan Pajak)
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                nominalDPP: parseInt(e.target.value),
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.nominalDPP && (
            <p className='text-red-500 text-sm'>{errors.nominalDPP}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Jenis Pajak</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsJenisPajak}
            isSearchable
            isClearable
            placeholder='Pilih Jenis Pajak'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  jenisPajak: selectedOption.value,
                });
              }
            }}
          />
          {errors.jenisPajak && (
            <p className='text-red-500 text-sm'>{errors.jenisPajak}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Objek Pajak</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsObjekPajak}
            isSearchable
            isClearable
            placeholder='Pilih Objek Pajak'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeObjek: selectedOption.value,
                });
              }
            }}
          />
          {errors.kodeObjek && (
            <p className='text-red-500 text-sm'>{errors.kodeObjek}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nominal Pajak
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='number'
            onChange={(e) =>
              setFormData({
                ...formData,
                nominalPajak: parseInt(e.target.value),
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.nominalPajak && (
            <p className='text-red-500 text-sm'>{errors.nominalPajak}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Pemotong
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaPemotong: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.namaPemotong && (
            <p className='text-red-500 text-sm'>{errors.namaPemotong}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            NPWP Pemotong
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                npwpPemotong: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.npwpPemotong && (
            <p className='text-red-500 text-sm'>{errors.npwpPemotong}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Bukti Dokumentasi
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            accept='.pdf'
            name='fileBukti'
            className='w-full p-2 border rounded-md mt-2 text-sm'
            onChange={(e) => handleFileUpload(e, 'fileBukti')}
          />
          {errors.fileBukti && (
            <p className='text-red-500 text-sm'>{errors.fileBukti}</p>
          )}
        </div>

        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/inventaris'>
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
export default FormTambahInventaris;
