import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { IoArrowUndoSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../Button/ButtonTabel';
import { currencyRupiah } from '../../utils/FormatRupiah';

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

const FormEditKegiatan4: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const kodeKegiatanBadan = location?.state?.kodeKegiatanBadan || '';

  console.log(kodeKegiatanBadan);

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

  const [selectedJenisPenghasilan, setSelectedJenisPenghasilan] =
    useState<number>(0);

  const [selectedPengajuanAnggaran, setSelectedPengajuanAnggaran] =
    useState<string>('');

  const [selectedBadanUsahaValue, setSelectedBadanUsahaValue] =
    useState<string>('');

  const [selectedObjekPajakValue, setSelectedObjekPajakValue] =
    useState<string>('');

  const [selectedPICValue, setSelectedPICValue] = useState<string>('');

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
    npwp: '',
    noRekening: '',
    namaRekening: '',
    bankTransfer: '',
    penghasilanBruto: '',
    kodeObjek: '',
    tarifPajak: 0,
    potonganPajak: 0,
    penghasilanDiterima: 0,
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
            dokumenKerjasamaKegiatan: file.name,
          });
          break;
        default:
          break;
      }
      console.log(`${fileType} uploaded:`, file.name);
    }
  };

  const fetchJenisPenghasilanOptions = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/jenis-penghasilan/pph23`
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
        `http://localhost:3000/api/objek-pajak/pph23`
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

  useEffect(() => {
    const fetchPPh4Ayat2 = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/kegiatan-penghasilan-badan/pph4/${kodeKegiatanBadan}`
        );
        const data = await response.json();

        setSelectedJenisPenghasilan(
          data.result.kodeJenisPenghasilan.toString()
        );
        setSelectedPengajuanAnggaran(data.result.idKegiatanAnggaran);
        setSelectedBadanUsahaValue(data.result.kodeWajibPajakBadanUsaha);
        setSelectedObjekPajakValue(data.result.kodeObjek);
        setSelectedPICValue(data.result.picPencairanPenghasilan);

        setFormData({
          uraianKegiatan: data.result.uraianKegiatan,
          idKegiatanAnggaran: data.result.idKegiatanAnggaran,
          kodeJenisPenghasilan: data.result.kodeJenisPenghasilan.toString(),
          picPencairanPenghasilan: data.result.picPencairanPenghasilan,
          kodeWajibPajakBadanUsaha: data.result.kodeWajibPajakBadanUsaha,
          npwp: data.result.npwp,
          noRekening: data.result.noRekening,
          namaRekening: data.result.namaRekening,
          bankTransfer: data.result.bankTransfer,
          penghasilanBruto: data.result.penghasilanBruto.toString(),
          kodeObjek: data.result.kodeObjek,
          tarifPajak: data.result.tarifPajak,
          potonganPajak: data.result.potonganPajak,
          penghasilanDiterima: data.result.penghasilanDiterima,
          invoice: data.result.invoice,
          fakturPajak: data.result.fakturPajak,
          dokumenKerjasamaKegiatan: data.result.dokumenKerjasamaKegiatan,
          idl: data.result.idl,
        });
      } catch (error) {
        console.error('Error fetching Badan Usaha options:', error);
      }
    };

    fetchPPh4Ayat2();
  }, [kodeKegiatanBadan]);

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
      formDataToSubmit.append('kodeKegiatanBadan', kodeKegiatanBadan);
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

      const url = `http://localhost:3000/api/kegiatan-penghasilan-badan/pph4/${kodeKegiatanBadan}`;
      const response = await axios.put(url, formDataToSubmit, {
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

          toast.success('Data Berhasil Diupdate!');
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
              (option) => option.value === selectedJenisPenghasilan
            )}
            onChange={(
              selectedOption: SingleValue<{ value: number; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kodeJenisPenghasilan: selectedOption.value.toString(),
                });
                setSelectedJenisPenghasilan(selectedOption.value);
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
            id='uraianKegiatan'
            name='uraianKegiatan'
            value={formData.uraianKegiatan}
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
            value={optionsPengajuanAnggaran.find(
              (option) => option.value === selectedPengajuanAnggaran
            )}
            onChange={(
              selectedOption: SingleValue<{
                value: string;
                label: string;
              }> | null
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  idKegiatanAnggaran: selectedOption.value,
                });
                setSelectedPengajuanAnggaran(selectedOption.value);
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
            value={optionsBadanUsaha.find(
              (option) => option.value === selectedBadanUsahaValue
            )}
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
                setSelectedBadanUsahaValue(selectedOption.value);
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
            value={selectedBadanUsaha?.npwp || formData.npwp}
            disabled
            className='w-full p-2 border rounded-md  disabled:bg-gray-200'
          />
        </div>

        <div className='flex flex-wrap gap-5 mb-5'>
          <div className='mb-5 relative'>
            <label className='inline-block font-semibold'>Nama Bank</label>
            <input
              type='text'
              value={selectedBadanUsaha?.bankTransfer || formData.bankTransfer}
              disabled
              className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            />
          </div>

          <div className='mb-5 relative'>
            <label className='inline-block font-semibold'>No Rekening</label>
            <input
              type='text'
              value={selectedBadanUsaha?.noRekening || formData.noRekening}
              disabled
              className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            />
          </div>

          <div className='mb-5 relative'>
            <label className='inline-block font-semibold'>Nama Rekening</label>
            <input
              type='text'
              value={selectedBadanUsaha?.namaRekening || formData.namaRekening}
              disabled
              className='w-full p-2 border rounded-md  disabled:bg-gray-200'
            />
          </div>
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold'>Objek Pajak</label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsObjekPajak}
            isSearchable
            isClearable
            placeholder='Pilih Objek Pajak'
            value={optionsObjekPajak.find(
              (option) => option.value === selectedObjekPajakValue
            )}
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
            value={formData.penghasilanBruto}
            onChange={handlePenghasilanBrutoChange}
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.penghasilanBruto && (
            <p className='text-red-500 text-sm'>{errors.penghasilanBruto}</p>
          )}
        </div>

        <div className='flex flex-wrap gap-5 mb-5'>
          <div className='mb-5 relative'>
            <label className='inline-block font-semibold text-base mb-2'>
              Tarif Pajak
            </label>
            <input
              type='text'
              value={
                selectedObjekPajak?.tarifNpwp
                  ? `${selectedObjekPajak.tarifNpwp}%`
                  : `${formData.tarifPajak}%`
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
              value={currencyRupiah(potonganPajak || formData.potonganPajak)}
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
              value={currencyRupiah(
                penghasilanDiterima || formData.penghasilanDiterima
              )}
              disabled
              className='w-full p-2 border rounded-md mt-2 text-sm disabled:bg-gray-200'
            />
          </div>
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
            value={optionsPencairanPenghasilan.find(
              (option) => option.value === selectedPICValue
            )}
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  picPencairanPenghasilan: selectedOption.value,
                });

                setSelectedPICValue(selectedOption.value);
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
          {formData.invoice ? (
            <p className='text-sm block mt-1'>{formData.invoice}</p>
          ) : (
            ''
          )}
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
          {formData.fakturPajak ? (
            <p className='text-sm block mt-1'>{formData.fakturPajak}</p>
          ) : (
            ''
          )}
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
          <span className='text-red-500 p-1'>*</span>
          {formData.dokumenKerjasamaKegiatan ? (
            <p className='text-sm block mt-1'>
              {formData.dokumenKerjasamaKegiatan}
            </p>
          ) : (
            ''
          )}
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
          <Link to='/kegiatanPPh4'>
            <ButtonTabel
              text='Kembali'
              icon={<IoArrowUndoSharp size={16} />}
              bgColor='bg-detail'
            />
          </Link>

          <ButtonTabel
            type='submit'
            text='Edit'
            icon={<FaEdit size={16} />}
            bgColor='bg-orange'
          />
        </div>
      </form>
    </div>
  );
};
export default FormEditKegiatan4;
