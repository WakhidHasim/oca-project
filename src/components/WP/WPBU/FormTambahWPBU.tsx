import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../../Button/ButtonTabel';

interface BankTransfer {
  kodeBank: number;
  namaBank: string;
}

const FormTambahWPBU: React.FC = () => {
  const navigate = useNavigate();

  const [fileFotoIdentitasBadan, setFileFotoIdentitasBadan] =
    useState<File | null>(null);
  const [fileFotoBuktiRekening, setFileFotoBuktiRekening] =
    useState<File | null>(null);
  const [fileFotoNpwp, setFileFotoNpwp] = useState<File | null>(null);
  const [fileSuratBebasPPh23, setFileSuratBebasPPh23] = useState<File | null>(
    null
  );

  const [, setskbpph23] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);

  const [optionsBank, setOptionsBank] = useState<
    { value: number; label: string }[]
  >([]);

  const [errors, setErrors] = useState({
    namaBadan: '',
    email: '',
    npwp: '',
    namaNpwp: '',
    kotaNpwp: '',
    bankTransfer: '',
    noRekening: '',
    namaRekening: '',
    namaNaraHubung: '',
    kontakNaraHubung: '',
    adaSkbPPh23: '',
    fileFotoIdentitasBadan: '',
    fileFotoBuktiRekening: '',
    fileFotoNpwp: '',
    statusPkp: '',
  });

  const [formData, setFormData] = useState({
    namaBadan: '',
    email: '',
    npwp: '',
    namaNpwp: '',
    kotaNpwp: '',
    bankTransfer: '',
    noRekening: '',
    namaRekening: '',
    namaNaraHubung: '',
    kontakNaraHubung: '',
    adaSkbPPh23: '',
    masaBerlakuBebasPPh23: '',
    fileFotoIdentitasBadan: '',
    fileFotoBuktiRekening: '',
    fileFotoNpwp: '',
    fileSuratBebasPPh23: '',
    statusPkp: '',
  });

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'fileFotoIdentitasBadan':
          setFileFotoIdentitasBadan(file);
          setFormData({
            ...formData,
            fileFotoIdentitasBadan: file.name,
          });
          break;
        case 'fileFotoBuktiRekening':
          setFileFotoBuktiRekening(file);
          setFormData({
            ...formData,
            fileFotoBuktiRekening: file.name,
          });
          break;
        case 'fileFotoNpwp':
          setFileFotoNpwp(file);
          setFormData({
            ...formData,
            fileFotoNpwp: file.name,
          });
          break;
        case 'fileSuratBebasPPh23':
          setFileSuratBebasPPh23(file);
          setFormData({
            ...formData,
            fileSuratBebasPPh23: file.name,
          });
          break;
        default:
          break;
      }
    }
  };

  const fetchBankOptions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/bank`);
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const optionsBank = data.result.map((objek: BankTransfer) => ({
          value: objek.kodeBank,
          label: objek.namaBank,
        }));
        setOptionsBank(optionsBank);
      }
    } catch (error) {
      console.error('Error fetching Jenis Penghasilan options:', error);
    }
  };

  useEffect(() => {
    fetchBankOptions();
  }, []);

  const handleSkbpph23Change = (value: string) => {
    setskbpph23(value);
    setShowForm(value === 'ya');
    if (value === 'tidak') {
      setFormData({
        ...formData,
        adaSkbPPh23: 'ya',
        masaBerlakuBebasPPh23: '',
        fileSuratBebasPPh23: '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.namaBadan) {
      newErrors.namaBadan = 'Nama Badan harus diisi';
      isValid = false;
    } else {
      newErrors.namaBadan = '';
    }

    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.npwp) {
      newErrors.npwp = 'NPWP harus diisi';
      isValid = false;
    } else {
      newErrors.npwp = '';
    }

    if (!formData.namaNpwp) {
      newErrors.namaNpwp = 'Nama NPWP harus diisi';
      isValid = false;
    } else {
      newErrors.namaNpwp = '';
    }

    if (!formData.kotaNpwp) {
      newErrors.kotaNpwp = 'Kota NPWP harus diisi';
      isValid = false;
    } else {
      newErrors.kotaNpwp = '';
    }

    if (!formData.noRekening) {
      newErrors.noRekening = 'No Rekening harus diisi';
      isValid = false;
    } else {
      newErrors.noRekening = '';
    }

    if (!formData.namaRekening) {
      newErrors.namaRekening = 'Nama Rekening harus diisi';
      isValid = false;
    } else {
      newErrors.namaRekening = '';
    }

    if (!formData.bankTransfer) {
      newErrors.bankTransfer = 'Nama Bank harus dipilih';
      isValid = false;
    } else {
      newErrors.bankTransfer = '';
    }

    if (!formData.namaNaraHubung) {
      newErrors.namaNaraHubung = 'Nama Narahubung harus diisi';
      isValid = false;
    } else {
      newErrors.namaNaraHubung = '';
    }

    if (!formData.kontakNaraHubung) {
      newErrors.kontakNaraHubung = 'Kontak Narahubung harus diisi';
      isValid = false;
    } else {
      newErrors.kontakNaraHubung = '';
    }

    if (!formData.adaSkbPPh23) {
      newErrors.adaSkbPPh23 = 'SKB PPh 23 harus diisi';
      isValid = false;
    } else {
      newErrors.adaSkbPPh23 = '';
    }

    if (!formData.fileFotoIdentitasBadan) {
      newErrors.fileFotoIdentitasBadan =
        'File Foto Identitas Badan harus diisi';
      isValid = false;
    } else {
      newErrors.fileFotoIdentitasBadan = '';
    }

    if (!formData.fileFotoBuktiRekening) {
      newErrors.fileFotoBuktiRekening = 'File Foto Bukti Rekening harus diisi';
      isValid = false;
    } else {
      newErrors.fileFotoBuktiRekening = '';
    }

    if (!formData.fileFotoNpwp) {
      newErrors.fileFotoNpwp = 'File Foto NPWP harus diisi';
      isValid = false;
    } else {
      newErrors.fileFotoNpwp = '';
    }

    if (!formData.statusPkp) {
      newErrors.statusPkp = 'Status PKP harus diisi';
      isValid = false;
    } else {
      newErrors.statusPkp = '';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('namaBadan', formData.namaBadan);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('npwp', formData.npwp);
      formDataToSubmit.append('namaNpwp', formData.namaNpwp);
      formDataToSubmit.append('kotaNpwp', formData.kotaNpwp);
      formDataToSubmit.append('bankTransfer', formData.bankTransfer);
      formDataToSubmit.append('noRekening', formData.noRekening);
      formDataToSubmit.append('namaRekening', formData.namaRekening);
      formDataToSubmit.append('namaNaraHubung', formData.namaNaraHubung);
      formDataToSubmit.append('kontakNaraHubung', formData.kontakNaraHubung);
      formDataToSubmit.append('adaSkbPPh23', formData.adaSkbPPh23);

      formDataToSubmit.append(
        'fileFotoIdentitasBadan',
        fileFotoIdentitasBadan ? fileFotoIdentitasBadan : ''
      );
      formDataToSubmit.append(
        'fileFotoBuktiRekening',
        fileFotoBuktiRekening ? fileFotoBuktiRekening : ''
      );
      formDataToSubmit.append('fileFotoNpwp', fileFotoNpwp ? fileFotoNpwp : '');
      if (formData.adaSkbPPh23 === 'ya') {
        formDataToSubmit.append(
          'masaBerlakuBebasPPh23',
          formData.masaBerlakuBebasPPh23
        );
        formDataToSubmit.append(
          'fileSuratBebasPPh23',
          fileSuratBebasPPh23 ? fileSuratBebasPPh23 : ''
        );
      }
      formDataToSubmit.append('statusPkp', formData.statusPkp);

      const url = 'http://localhost:3000/api/wajib-pajak-badan-usaha';
      const response = await axios.post(url, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(formDataToSubmit);
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
          navigate('/dataWPBU');
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
            Nama Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaBadan: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.namaBadan && (
            <p className='text-red-500 text-sm'>{errors.namaBadan}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Email
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md mt-2 text-sm'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto Identitas Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            className='w-full p-2 border rounded-md mt-2 text-sm'
            onChange={(e) => handleFileUpload(e, 'fileFotoIdentitasBadan')}
          />
          {errors.fileFotoIdentitasBadan && (
            <p className='text-red-500 text-sm'>
              {errors.fileFotoIdentitasBadan}
            </p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                npwp: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
          {errors.npwp && <p className='text-red-500 text-sm'>{errors.npwp}</p>}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama NPWP Wajib Pajak / Badan Usaha
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className=' text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan sesuai nama identitas NPWP. Jika belum ber-NPWP iskan nama
            Badan Usaha
          </p>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaNpwp: e.target.value,
              })
            }
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
          {errors.namaNpwp && (
            <p className='text-red-500 text-sm'>{errors.namaNpwp}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kota NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                kotaNpwp: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
          {errors.kotaNpwp && (
            <p className='text-red-500 text-sm'>{errors.kotaNpwp}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto NPWP
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'fileFotoNpwp')}
          />
          {errors.fileFotoNpwp && (
            <p className='text-red-500 text-sm'>{errors.fileFotoNpwp}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            No Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                noRekening: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md'
          />
          {errors.noRekening && (
            <p className='text-red-500 text-sm'>{errors.noRekening}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaRekening: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md'
          />
          {errors.namaRekening && (
            <p className='text-red-500 text-sm'>{errors.namaRekening}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Bank
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsBank}
            isSearchable
            isClearable
            placeholder='Pilih Nama Bank'
            onChange={(
              selectedOption: SingleValue<{ value: number; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  bankTransfer: selectedOption.label,
                });
              }
            }}
          />
          {errors.bankTransfer && (
            <p className='text-red-500 text-sm'>{errors.bankTransfer}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto Bukti Rekening
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'fileFotoBuktiRekening')}
          />
          {errors.fileFotoBuktiRekening && (
            <p className='text-red-500 text-sm'>
              {errors.fileFotoBuktiRekening}
            </p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Narahubung
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaNaraHubung: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md'
          />
          {errors.namaNaraHubung && (
            <p className='text-red-500 text-sm'>{errors.namaNaraHubung}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kontak Narahubung
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                kontakNaraHubung: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md'
          />
          {errors.kontakNaraHubung && (
            <p className='text-red-500 text-sm'>{errors.kontakNaraHubung}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Ada SKBPPh23
          </label>
          <span className='text-red-500 p-1'>*</span>
          <div className='flex items-center mt-2'>
            <label htmlFor='hasSKBPPh23ya' className='mr-4'>
              <input
                type='radio'
                id='hasSKBPPh23ya'
                name='billing'
                value='ya'
                onChange={(e) => handleSkbpph23Change(e.target.value)}
                className='mr-2'
              />
              YA
            </label>
            <label htmlFor='hasSKBPPh23tidak'>
              <input
                type='radio'
                id='hasSKBPPh23tidak'
                name='billing'
                onChange={() =>
                  setFormData({ ...formData, adaSkbPPh23: 'tidak' })
                }
                className='mr-2'
              />
              Tidak
            </label>
          </div>
          {errors.adaSkbPPh23 && (
            <p className='text-red-500 text-sm'>{errors.adaSkbPPh23}</p>
          )}
        </div>

        {showForm && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Masa Berlaku Bebas PPh 23
              </label>
              <input
                type='date'
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    masaBerlakuBebasPPh23: new Date(
                      e.target.value
                    ).toISOString(),
                  })
                }
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload File Surat Bebas PPh 23
              </label>
              <input
                type='file'
                accept='.png, .jpg, .jpeg'
                className='w-full p-2 border rounded-md text-sm mt-2'
                onChange={(e) => handleFileUpload(e, 'fileSuratBebasPPh23')}
              />
            </div>
          </div>
        )}

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Status PKP
          </label>
          <span className='text-red-500 p-1'>{'*'}</span>
          <div className='flex items-center mt-2'>
            <label htmlFor='StatusPKPya' className='mr-4'>
              <input
                type='radio'
                id='StatusPKPya'
                name='status'
                className='mr-2'
                onChange={() => setFormData({ ...formData, statusPkp: 'ya' })}
              />
              YA
            </label>
            <label htmlFor='StatusPKPtidak'>
              <input
                type='radio'
                id='StatusPKPtidak'
                name='status'
                className='mr-2'
                onChange={() =>
                  setFormData({ ...formData, statusPkp: 'tidak' })
                }
              />
              Tidak
            </label>
          </div>
          {errors.statusPkp && (
            <p className='text-red-500 text-sm'>{errors.statusPkp}</p>
          )}
        </div>
        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/dataWPBU'>
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
export default FormTambahWPBU;
