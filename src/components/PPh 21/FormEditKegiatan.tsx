import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
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

const FormEditKegiatan: React.FC = () => {
  const { kodeKegiatanBadan } = useParams();
  const navigate = useNavigate();

  const [, setBilling] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const [optionsjenisPenghasilan, setOptionsjenisPenghasilan] = useState<
    { value: number; label: string }[]
  >([]);

  const [optionsPengajuanAnggaran, setOptionsPengajuanAnggaran] = useState<
    { value: string; label: string }[]
  >([]);

  const optionsPencairanPenghasilan = [{ value: 'dpk', label: 'DPK' }];

  const [kegiatanData, setKegiatanData] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: 0,
    picPencairanPenghasilan: '',
    mintaBillingSendiri: false,
  });

  const [formData, setFormData] = useState({
    kodeKegiatanOP: '',
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: 0,
    picPencairanPenghasilan: '',
    mintaBillingSendiri: false,
  });

  useEffect(() => {
    const fetchKegiatanPenghasilanOrangPribadi = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/kegiatan-penghasilan-orang-pribadi/${kodeKegiatanOP}`
        );
        const data = await response.json();

        if (data && data.result) {
          const kegiatan = data.result[0];

          setKegiatanData({
            uraianKegiatan: kegiatan.uraianKegiatan,
            idKegiatanAnggaran: kegiatan.idKegiatanAnggaran,
            kodeJenisPenghasilan: kegiatan.kodeJenisPenghasilan,
            picPencairanPenghasilan: kegiatan.picPencairanPenghasilan,
            mintaBillingSendiri: kegiatan.mintaBillingSendiri,
          });

          setFormData({
            kodeKegiatanOP: kegiatan.kodeKegiatanOP,
            uraianKegiatan: kegiatan.uraianKegiatan,
            idKegiatanAnggaran: kegiatan.idKegiatanAnggaran,
            kodeJenisPenghasilan: kegiatan.kodeJenisPenghasilan,
            picPencairanPenghasilan: kegiatan.picPencairanPenghasilan,
            mintaBillingSendiri: kegiatan.mintaBillingSendiri,
          });
        }
      } catch (error) {
        console.error('Error fetching kegiatan data:', error);
      }
    };

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
        console.error('Error fetching Pengajuan Anggaran options:', error);
      }
    };

    fetchPengajuanAnggaranOptions();
    fetchJenisPenghasilanOptions();
    fetchKegiatanPenghasilanOrangPribadi();
  }, [kodeKegiatanOP]);

  const handleBilling = (value: string) => {
    setBilling(value);
    setShowForm(value === 'ya');
    setFormData((prevData) => ({
      ...prevData,
      mintaBillingSendiri: value === 'ya',
    }));
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

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/update-kegiatan`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status && data.status.code === 200) {
        console.log('Data updated:', data.result);

        setKegiatanData({
          uraianKegiatan: data.result.uraianKegiatan,
          idKegiatanAnggaran: data.result.idKegiatanAnggaran,
          kodeJenisPenghasilan: data.result.kodeJenisPenghasilan,
          picPencairanPenghasilan: data.result.picPencairanPenghasilan,
          mintaBillingSendiri: data.result.mintaBillingSendiri,
        });

        navigate('/dataKegiatan21');
      } else {
        console.error('Error updating data:', data.status.description);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className='w-full mx-auto p-6 md:p-10 rounded bg-white h-full'>
      <form className='w-full' onSubmit={handleUpdate}>
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
            value={optionsjenisPenghasilan.find(
              (option) => option.value === kegiatanData.kodeJenisPenghasilan
            )}
            onChange={(selectedOption) =>
              setKegiatanData((prevData) => ({
                ...prevData,
                kodeJenisPenghasilan: selectedOption?.value || 0,
              }))
            }
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
            value={kegiatanData.uraianKegiatan}
            onChange={(e) =>
              setKegiatanData((prevData) => ({
                ...prevData,
                uraianKegiatan: e.target.value,
              }))
            }
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

        <button type='button' onClick={handleUpdate}>
          <ButtonTabel
            text='Edit'
            icon={<FaEdit size={16} />}
            bgColor='bg-orange'
          />
        </button>
      </div>
    </div>
  );
};

export default FormEditKegiatan;
