import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../Button/ButtonTabel';

type SelectedWPOP = {
  value: string;
  label: string;
  statusPegawai: string;
  npwp: string;
  namaRekening: string;
  noRekening: string;
  bankTransfer: string;
} | null;

type SelectedObjekPajak = {
  value: string;
  label: string;
  tarifNpwp: number;
} | null;

interface ObjekPajak {
  kodeObjek: string;
  objekPajak: string;
  tarifNpwp: number;
  tarifNonNpwp: number;
}

interface WajibPajakOrangPribadi {
  kodeWajibPajakOrangPribadi: string;
  nama: string;
  email: string;
  password?: string;
  kewarganegaraan: string;
  namaNegara: string;
  idOrangPribadi: string;
  namaIdentitas: string;
  masaBerlakuPassport?: string;
  npwp?: string;
  namaNpwp?: string;
  kotaNpwp?: string;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  nip?: string;
  statusPegawai?: string;
  fileFotoNpwp?: string;
  fileFotoIdOrangPribadi: string;
  fileFotoBuktiRekening?: string;
  isApproved: boolean;
  tanggalInput?: string;
}

interface KegiatanPPh21 {
  kodeKegiatanOP: string;
  tanggalInput: string;
  uraianKegiatan: string;
  idKegiatanAnggaran: string;
  kodeJenisPenghasilan: number;
  kodeJenisPajak: number;
  picPencairanPenghasilan: string;
  mintaBillingSendiri: boolean;
  idl: string;
  totalPenghasilanBruto: number;
  totalPotonganPajak: number;
}

const FormTambahDataPenerima: React.FC = () => {
  const navigate = useNavigate();

  const [optionsObjekPajak, setOptionsObjekPajak] = useState<
    { value: string; label: string; tarifNpwp: number }[]
  >([]);
  const [optionsWpop, setOptionsWpopOptions] = useState<
    { value: string; label: string; npwp: string }[]
  >([]);
  const [optionsKegiatanPPh21, setOptionsKegiatanPPh21] = useState<
    { value: string; label: string }[]
  >([]);

  // const [optionsMetodePotong, setOptionsMetodePotong] = useState<
  //   { value: string; label: string }[]
  // >([]);

  const [selectedObjekPajak, setSelectedObjekPajak] =
    useState<SelectedObjekPajak>(null);
  const [potonganPajak, setPotonganPajak] = useState<number | null>(null);
  const [penghasilanDiterima, setPenghasilanDiterima] = useState<number | null>(
    null
  );
  const [selectedWPOP, setSelectedWPOP] = useState<SelectedWPOP>(null);

  const [formData, setFormData] = useState({
    kodeKegiatanOP: '',
    kodeWajibPajakOrangPribadi: '',
    penghasilanBruto: '',
    kodeObjek: '',
    metodePotong: '',
  });

  useEffect(() => {
    const fetchKegiatanPPh21 = async () => {
      try {
        const response = await fetch(
          `/api/kegiatan-penghasilan-orang-pribadi/`
        );
        const data = await response.json();
        if (data && data.result && data.result.length > 0) {
          const objekpph21 = data.result.map((objek: KegiatanPPh21) => ({
            value: objek.kodeKegiatanOP,
            label: objek.uraianKegiatan,
          }));
          setOptionsKegiatanPPh21(objekpph21);
        }
      } catch (error) {
        console.error('Error fetching Objek Pajak options:', error);
      }
    };

    const fetchObjekPajakOptions = async () => {
      try {
        const response = await fetch(`/api/objek-pajak/pph21`);
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

    const fetchWPOPOptions = async () => {
      try {
        const response = await fetch(`/api/wpop`);
        const data = await response.json();
        if (data && data.result && data.result.length > 0) {
          const optionsWpop = data.result.map(
            (objek: WajibPajakOrangPribadi) => ({
              value: objek.kodeWajibPajakOrangPribadi,
              label: objek.nama,
              statusPegawai: objek.statusPegawai,
              npwp: objek.npwp,
              noRekening: objek.noRekening,
              namaRekening: objek.namaRekening,
              bankTransfer: objek.bankTransfer,
            })
          );
          setOptionsWpopOptions(optionsWpop);
        }
      } catch (error) {
        console.error('Error fetching Badan Usaha options:', error);
      }
    };

    fetchKegiatanPPh21();
    fetchObjekPajakOptions();
    fetchWPOPOptions();
  }, []);

  const handlePenghasilanBrutoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPenghasilanBruto = event.target.value; // Mengonversi string menjadi angka
    setFormData({ ...formData, penghasilanBruto: newPenghasilanBruto });
  };

  useEffect(() => {
    if (formData.penghasilanBruto && selectedObjekPajak?.tarifNpwp) {
      const penghasilanBruto = Number(formData.penghasilanBruto);
      const tarifPajak = selectedObjekPajak.tarifNpwp;
      const potongan = penghasilanBruto * (tarifPajak / 100);
      const penghasilanDiterima = penghasilanBruto - potongan;
      setPotonganPajak(potongan);
      setPenghasilanDiterima(penghasilanDiterima);
    } else {
      setPotonganPajak(null);
      setPenghasilanDiterima(null);
    }
  }, [formData.penghasilanBruto, selectedObjekPajak]);

  const optionsMetodePotongPegawaiTetap = [
    { value: 'gabung', label: 'PT Gabung Gaji' },
    { value: 'pisah', label: 'PT Pisah Gaji' },
  ];

  // const optionsMetodePotongBukanPegawai = [
  //   { value: 'ptt/bp', label: 'PTT/BP' },
  //   { value: 'terbulanan', label: 'TER Bulanan' },
  //   { value: 'wna', label: 'WNA' },
  // ];

  // useEffect(() => {
  //   const determineMetodePotongOptions = () => {
  //     if (formData.kodeWajibPajakOrangPribadi) {
  //       const selectedWPOP = optionsWpop.find(
  //         (wpop) => wpop.value === formData.kodeWajibPajakOrangPribadi
  //       );
  //       if (selectedWPOP?.statusPegawai == 'pegawai tetap') {
  //         setOptionsMetodePotong(optionsMetodePotongPegawaiTetap);
  //       } else {
  //         setOptionsMetodePotong(optionsMetodePotongBukanPegawai);
  //       }
  //     }
  //   };

  //   determineMetodePotongOptions();
  // }, [formData.kodeWajibPajakOrangPribadi]);

  const formatRupiah = (value: number | null) => {
    if (value === null) return '';
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('kodeKegiatanOP', formData.kodeKegiatanOP);
      formDataToSubmit.append(
        'kodeWajibPajakOrangPribadi',
        formData.kodeWajibPajakOrangPribadi
      );
      formDataToSubmit.append('penghasilanBruto', formData.penghasilanBruto);

      formDataToSubmit.append('kodeObjek', formData.kodeObjek);
      formDataToSubmit.append('metodePotong', formData.metodePotong);

      const url = '/api/pph21';
      const response = await axios.post(url, formDataToSubmit, {
        headers: {
          'Content-Type': 'application/json',
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
          toast.success('Data added successfully!');
          navigate('/dataKegiatan23');
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
          <label className='inline-block font-semibold'>
            Nama Kegiatan PPh 21
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsKegiatanPPh21}
            isSearchable
            isClearable
            placeholder='Pilih Nama Penerima'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeKegiatanOP: selectedOption.value,
                });
                const selectedWPOP = optionsWpop.find(
                  (objek: { value: string; label: string }) =>
                    objek.value === selectedOption.value
                ) as SelectedWPOP;

                setSelectedWPOP(selectedWPOP);
              }
            }}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Nama Penerima</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsWpop}
            isSearchable
            isClearable
            placeholder='Pilih Nama Penerima'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeWajibPajakOrangPribadi: selectedOption.value,
                });
                const selectedWPOP = optionsWpop.find(
                  (objek: { value: string; label: string }) =>
                    objek.value === selectedOption.value
                ) as SelectedWPOP;

                setSelectedWPOP(selectedWPOP);
              }
            }}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Jenis Wajib Pajak / Status Pegawai
          </label>
          <input
            type='text'
            value={selectedWPOP?.statusPegawai || ''}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>NPWP</label>
          <input
            type='text'
            value={selectedWPOP?.npwp || ''}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Identitas Rekening
          </label>
          <input
            type='text'
            value={
              selectedWPOP
                ? `${selectedWPOP.bankTransfer || ''} - ${
                    selectedWPOP.noRekening || ''
                  } - ${selectedWPOP.namaRekening || ''}`
                : ''
            }
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        {/* <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Lapisan</label>
          <input
            type='text'
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div> */}

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Metode Potong</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsMetodePotongPegawaiTetap}
            isSearchable
            isClearable
            placeholder='Pilih Metode Potong'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  metodePotong: selectedOption.value,
                });
              }
            }}
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
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeObjek: selectedOption.value,
                });
                const selectedObjek = optionsObjekPajak.find(
                  (objek: { value: string; label: string }) =>
                    objek.value === selectedOption.value
                ) as SelectedObjekPajak;

                setSelectedObjekPajak(selectedObjek);
              }
            }}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>
            Penghasilan Bruto
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={handlePenghasilanBrutoChange}
            className='w-full p-2 border rounded-md mt-2'
          />
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Tarif Pajak</label>
          <input
            type='text'
            value={
              selectedObjekPajak?.tarifNpwp
                ? `${selectedObjekPajak.tarifNpwp}%`
                : ''
            }
            disabled
            className='w-full p-2 border rounded-md mt-2  disabled:bg-gray-200'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Potongan Pajak</label>
          <input
            type='text'
            value={formatRupiah(potonganPajak)}
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
            value={formatRupiah(penghasilanDiterima)}
            disabled
            className='w-full p-2 border rounded-md mt-2 disabled:bg-gray-200'
          />
        </div>

        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/detailPenerima21'>
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
export default FormTambahDataPenerima;
