import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../Button/ButtonTabel';

type SelectedBadanUsaha = {
  value: string;
  label: string;
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

interface JenisPenghasilan {
  kodeJenisPenghasilan: number;
  jenisPenghasilan: string;
}

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

interface BadanUsaha {
  kodeWajibPajakBadanUsaha: string;
  namaBadan: string;
  email: string;
  npwp: string;
  namaNpwp: string;
  kotaNpwp: string;
  bankTransfer: string;
  noRekening: string;
  namaRekening: string;
  namaNaraHubung: string;
  kontakNaraHubung: string;
  adaSkbPPh23: boolean;
  masaBerlakuBebasPPh23: string;
  fileFotoIdentitasBadan: string;
  fileFotoBuktiRekening: string;
  fileFotoNpwp: string;
  fileSuratBebasPPh23: string;
  statusPkp: string;
}

const FormTambahKegaiatn4: React.FC = () => {
  const navigate = useNavigate();

  const [invoiceFile, setInvoiceFile] = useState<File | null>(null);
  const [fakturPajakFile, setFakturPajakFile] = useState<File | null>(null);
  const [dokumenKerjasamaFile, setDokumenKerjasamaFile] = useState<File | null>(
    null
  );
  const [optionsObjekPajak, setOptionsObjekPajak] = useState<
    { value: string; label: string; tarifNpwp: number }[]
  >([]);
  const [optionsBadanUsaha, setOptionsBadanUsahaOptions] = useState<
    { value: string; label: string; npwp: string }[]
  >([]);
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

  const [selectedBadanUsaha, setSelectedBadanUsaha] =
    useState<SelectedBadanUsaha>(null);
  const [selectedObjekPajak, setSelectedObjekPajak] =
    useState<SelectedObjekPajak>(null);
  const [potonganPajak, setPotonganPajak] = useState<number | null>(null);
  const [penghasilanDiterima, setPenghasilanDiterima] = useState<number | null>(
    null
  );

  const [errors, setErrors] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: '',
    picPencairanPenghasilan: '',
    kodeWajibPajakBadanUsaha: '',
    penghasilanBruto: '',
    kodeObjek: '',
    invoice: '',
    dokumenKerjasamaKegiatan: '',
  });

  const [formData, setFormData] = useState({
    uraianKegiatan: '',
    idKegiatanAnggaran: '',
    kodeJenisPenghasilan: '',
    picPencairanPenghasilan: '',
    kodeWajibPajakBadanUsaha: '',
    penghasilanBruto: '',
    kodeObjek: '',
    invoice: '',
    fakturPajak: '',
    dokumenKerjasamaKegiatan: '',
    idl: '',
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'invoice':
          setInvoiceFile(file);
          setFormData({
            ...formData,
            invoice: file.name,
          });
          break;
        case 'fakturPajak':
          setFakturPajakFile(file);
          setFormData({
            ...formData,
            fakturPajak: file.name,
          });
          break;
        case 'dokumenKerjasamaKegiatan':
          setDokumenKerjasamaFile(file);
          setFormData({
            ...formData,
            dokumenKerjasamaKegiatan: file.name, // Menyimpan hanya nama file
          });
          break;
        default:
          break;
      }
    }
  };

  const fetchJenisPenghasilanOptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/jenis-penghasilan/pph4-ayat-2`
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
      console.error('Error fetching Pengajuan Anggaran options:', error);
    }
  };

  const fetchObjekPajakOptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/objek-pajak/pph4-ayat-2`
      );
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

  const fetchBadanUsahaOptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wajib-pajak-badan-usaha`
      );
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const optionsBadanUsaha = data.result.map((objek: BadanUsaha) => ({
          value: objek.kodeWajibPajakBadanUsaha,
          label: objek.namaBadan,
          npwp: objek.npwp,
          noRekening: objek.noRekening,
          namaRekening: objek.namaRekening,
          bankTransfer: objek.bankTransfer,
        }));
        setOptionsBadanUsahaOptions(optionsBadanUsaha);
      }
    } catch (error) {
      console.error('Error fetching Badan Usaha options:', error);
    }
  };

  useEffect(() => {
    fetchJenisPenghasilanOptions();
    fetchPengajuanAnggaranOptions();
    fetchObjekPajakOptions();
    fetchBadanUsahaOptions();
  }, []);

  const handlePenghasilanBrutoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newPenghasilanBruto = event.target.value;
    setFormData({ ...formData, penghasilanBruto: newPenghasilanBruto });
  };

  useEffect(() => {
    if (formData.penghasilanBruto && selectedObjekPajak?.tarifNpwp) {
      const penghasilanBruto = parseFloat(formData.penghasilanBruto);
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

    if (!formData.kodeWajibPajakBadanUsaha) {
      newErrors.kodeWajibPajakBadanUsaha = 'Nama Badan Usaha harus dipilih';
      isValid = false;
    } else {
      newErrors.kodeWajibPajakBadanUsaha = '';
    }

    if (!formData.kodeObjek) {
      newErrors.kodeObjek = 'Objek Pajak harus dipilih';
      isValid = false;
    } else {
      newErrors.kodeObjek = '';
    }

    if (!formData.penghasilanBruto) {
      newErrors.penghasilanBruto = 'Penghasilan Bruto harus diisi';
      isValid = false;
    } else {
      newErrors.penghasilanBruto = '';
    }

    if (!formData.picPencairanPenghasilan) {
      newErrors.picPencairanPenghasilan =
        'PIC Pencairan Penghasilan harus dipilih';
      isValid = false;
    } else {
      newErrors.picPencairanPenghasilan = '';
    }

    if (!formData.invoice) {
      newErrors.invoice = 'Invoice harus diisi';
      isValid = false;
    } else {
      newErrors.invoice = '';
    }

    if (!formData.dokumenKerjasamaKegiatan) {
      newErrors.dokumenKerjasamaKegiatan =
        'Dokumen Kerjasama Kegiatan harus diisi';
      isValid = false;
    } else {
      newErrors.dokumenKerjasamaKegiatan = '';
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
      formDataToSubmit.append(
        'kodeJenisPenghasilan',
        formData.kodeJenisPenghasilan
      );
      formDataToSubmit.append(
        'picPencairanPenghasilan',
        formData.picPencairanPenghasilan
      );
      formDataToSubmit.append(
        'kodeWajibPajakBadanUsaha',
        formData.kodeWajibPajakBadanUsaha
      );
      formDataToSubmit.append('penghasilanBruto', formData.penghasilanBruto);
      formDataToSubmit.append('kodeObjek', formData.kodeObjek);
      formDataToSubmit.append('invoice', invoiceFile ? invoiceFile : '');
      formDataToSubmit.append(
        'fakturPajak',
        fakturPajakFile ? fakturPajakFile : ''
      );
      formDataToSubmit.append(
        'dokumenKerjasamaKegiatan',
        dokumenKerjasamaFile ? dokumenKerjasamaFile : ''
      );
      formDataToSubmit.append('idl', idl);

      const url = 'http://localhost:3000/api/kegiatan-penghasilan-badan/pph4';
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
          toast.success('Data added successfully!');
          navigate('/kegiatanPPh4');
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
                  kodeJenisPenghasilan: selectedOption.value.toString(),
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
            Nama Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>

          <Select
            options={optionsBadanUsaha}
            isSearchable
            isClearable
            placeholder='Pilih Badan Usaha'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeWajibPajakBadanUsaha: selectedOption.value,
                });
                const selectedBadan = optionsBadanUsaha.find(
                  (objek: { value: string; label: string }) =>
                    objek.value === selectedOption.value
                ) as SelectedBadanUsaha;

                setSelectedBadanUsaha(selectedBadan);
              }
            }}
          />
          {errors.kodeWajibPajakBadanUsaha && (
            <p className='text-red-500 text-sm'>
              {errors.kodeWajibPajakBadanUsaha}
            </p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>NPWP</label>
          <input
            type='text'
            value={selectedBadanUsaha?.npwp || ''}
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
              selectedBadanUsaha
                ? `${selectedBadanUsaha.bankTransfer || ''} - ${
                    selectedBadanUsaha.noRekening || ''
                  } - ${selectedBadanUsaha.namaRekening || ''}`
                : ''
            }
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
          {errors.kodeObjek && (
            <p className='text-red-500 text-sm'>{errors.kodeObjek}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Penghasilan Bruto
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='number'
            id='penghasilanBruto'
            onChange={handlePenghasilanBrutoChange}
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.penghasilanBruto && (
            <p className='text-red-500 text-sm'>{errors.penghasilanBruto}</p>
          )}
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Tarif Pajak
          </label>
          <input
            type='text'
            value={
              selectedObjekPajak?.tarifNpwp
                ? `${selectedObjekPajak.tarifNpwp}%`
                : ''
            }
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
            value={formatRupiah(potonganPajak)}
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
            value={formatRupiah(penghasilanDiterima)}
            disabled
            className='w-full p-2 border rounded-md mt-2 text-sm disabled:bg-gray-200'
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
            Upload Dokumen Invoice
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            id='invoice'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'invoice')}
          />
          {errors.invoice && (
            <p className='text-red-500 text-sm'>{errors.invoice}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Dokumen Faktur Pajak
          </label>
          <input
            type='file'
            id='fakturPajak'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'fakturPajak')}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Dokumen Kerjasama Kegiatan
          </label>
          <input
            type='file'
            id='dokumenKerjasamaKegiatan'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'dokumenKerjasamaKegiatan')}
          />
          {errors.dokumenKerjasamaKegiatan && (
            <p className='text-red-500 text-sm'>
              {errors.dokumenKerjasamaKegiatan}
            </p>
          )}
        </div>
        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/dataKegiatan23'>
            <ButtonTabel
              text='Kembali'
              icon={<IoArrowUndoSharp size={16} />}
              bgColor='bg-detail'
            />
          </Link>

          <ButtonTabel
            type='submit'
            text='Simpan'
            icon={<IoIosSave size={16} />}
            bgColor='bg-tambah-data'
          />
        </div>
      </form>
    </div>
  );
};
export default FormTambahKegaiatn4;
