import React, { useEffect, useState } from 'react';
import Select, { SingleValue } from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosSave } from 'react-icons/io';
import { IoArrowUndoSharp } from 'react-icons/io5';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonTabel from '../../Button/ButtonTabel';

interface BankTransfer {
  kodeBank: number;
  namaBank: string;
}

interface Negara {
  kodeNegara: string;
  namaNegara: string;
}

// type CitizenshipType = { value: string; label: string };

const FormTambahWPOP: React.FC = () => {
  const navigate = useNavigate();

  // const [citizenship, setCitizenship] = useState<CitizenshipType | null>(null);

  const [fileFotoIdOrangPribadi, setfileFotoIdOrangPribadi] =
    useState<File | null>(null);
  const [fileFotoBuktiRekening, setFileFotoBuktiRekening] =
    useState<File | null>(null);
  const [fileFotoNpwp, setFileFotoNpwp] = useState<File | null>(null);

  const [optionsBank, setOptionsBank] = useState<
    { value: number; label: string }[]
  >([]);
  const [optionsNegara, setOptionsNegara] = useState<
    { value: string; label: string }[]
  >([]);

  const [errors, setErrors] = useState({
    nama: '',
    email: '',
    kewarganegaraan: '',
    namaNegara: '',
    idOrangPribadi: '',
    namaIdentitas: '',
    fileFotoIdOrangPribadi: '',
    statusPegawai: '',
  });

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    kewarganegaraan: '',
    namaNegara: '',
    idOrangPribadi: '',
    namaIdentitas: '',
    masaBerlakuPassport: '',
    npwp: '',
    namaNpwp: '',
    kotaNpwp: '',
    bankTransfer: '',
    noRekening: '',
    namaRekening: '',
    statusPegawai: '',
    fileFotoNpwp: '',
    fileFotoIdOrangPribadi: '',
    fileFotoBuktiRekening: '',
  });

  const optionsKewarganegaraan = [
    { value: 'wni', label: 'WNI' },
    { value: 'wna', label: 'WNA' },
  ];

  const optionsStatusPegawai = [
    { value: 'PT', label: 'Pegawai Tetap' },
    { value: 'BP', label: 'Bukan Pegawai' },
  ];

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    fileType: string
  ) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      switch (fileType) {
        case 'fileFotoIdOrangPribadi':
          setfileFotoIdOrangPribadi(file);
          setFormData({
            ...formData,
            fileFotoIdOrangPribadi: file.name,
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
        default:
          break;
      }
    }
  };

  const fetchBankOptions = async () => {
    try {
      const response = await fetch(`/api/bank`);
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

  const fetchNegaraOptions = async () => {
    try {
      const response = await fetch(`/api/negara`);
      const data = await response.json();
      if (data && data.result && data.result.length > 0) {
        const optionsNegara = data.result.map((objek: Negara) => ({
          value: objek.kodeNegara,
          label: objek.namaNegara,
        }));
        setOptionsNegara(optionsNegara);
      }
    } catch (error) {
      console.error('Error fetching Jenis Penghasilan options:', error);
    }
  };

  useEffect(() => {
    fetchNegaraOptions();
    fetchBankOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.nama) {
      newErrors.nama = 'Nama Wajib Pajak Orang Pribadi harus diisi';
      isValid = false;
    } else {
      newErrors.nama = '';
    }

    if (!formData.statusPegawai) {
      newErrors.statusPegawai = 'Status Pegawai harus dipilih';
      isValid = false;
    } else {
      newErrors.statusPegawai = '';
    }

    const validateEmail = (email: string): boolean => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    if (!formData.email) {
      newErrors.email = 'Email harus diisi';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Format email tidak valid';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!formData.kewarganegaraan) {
      newErrors.kewarganegaraan = 'Kewarganegaraan harus dipilih';
      isValid = false;
    } else {
      newErrors.kewarganegaraan = '';
    }

    if (!formData.namaNegara) {
      newErrors.namaNegara = 'Nama Negara harus dipilih';
      isValid = false;
    } else {
      newErrors.namaNegara = '';
    }

    if (!formData.idOrangPribadi) {
      newErrors.idOrangPribadi = 'Id Identitas Pribadi harus diisi';
      isValid = false;
    } else {
      newErrors.idOrangPribadi = '';
    }

    if (!formData.namaIdentitas) {
      newErrors.namaIdentitas = 'Nama Identitas Pribadi harus diisi';
      isValid = false;
    } else {
      newErrors.namaIdentitas = '';
    }

    if (!formData.fileFotoIdOrangPribadi) {
      newErrors.fileFotoIdOrangPribadi =
        'File Foto Identitas Pribadi harus diisi';
      isValid = false;
    } else {
      newErrors.fileFotoIdOrangPribadi = '';
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('nama', formData.nama);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('kewarganegaraan', formData.kewarganegaraan);
      formDataToSubmit.append('namaNegara', formData.namaNegara);
      formDataToSubmit.append('idOrangPribadi', formData.idOrangPribadi);
      formDataToSubmit.append('namaIdentitas', formData.namaIdentitas);
      formDataToSubmit.append(
        'masaBerlakuPassport',
        formData.masaBerlakuPassport
      );
      formDataToSubmit.append('npwp', formData.npwp);
      formDataToSubmit.append('namaNpwp', formData.namaNpwp);
      formDataToSubmit.append('kotaNpwp', formData.kotaNpwp);
      formDataToSubmit.append('bankTransfer', formData.bankTransfer);
      formDataToSubmit.append('noRekening', formData.noRekening);
      formDataToSubmit.append('namaRekening', formData.namaRekening);
      formDataToSubmit.append('statusPegawai', formData.statusPegawai);

      formDataToSubmit.append(
        'fileFotoIdOrangPribadi',
        fileFotoIdOrangPribadi ? fileFotoIdOrangPribadi : ''
      );
      formDataToSubmit.append(
        'fileFotoBuktiRekening',
        fileFotoBuktiRekening ? fileFotoBuktiRekening : ''
      );
      formDataToSubmit.append('fileFotoNpwp', fileFotoNpwp ? fileFotoNpwp : '');

      const url = '/api/wpop';
      const response = await axios.post(url, formDataToSubmit, {
        headers: {
          'Content-Type': 'multipart/form-data',
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
          toast.success('Data Berhasil Ditambahkan!');
          navigate('/registerWP/dataWPOP');
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
            Nama Lengkap
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                nama: e.target.value,
              })
            }
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
          {errors.nama && <p className='text-red-500 text-sm'>{errors.nama}</p>}
        </div>
        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Status Pegawai
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsStatusPegawai}
            isSearchable
            isClearable
            placeholder='Pilih Status Pegawai'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  statusPegawai: selectedOption.value,
                });
              }
            }}
          />
          {errors.statusPegawai && (
            <p className='text-red-500 text-sm'>{errors.statusPegawai}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            E-mail
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-gray-600 text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan email aktif untuk menerima bukti potong
          </p>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kewarganegaraan
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsKewarganegaraan}
            isSearchable
            isClearable
            placeholder='Pilih Warga Kenegaraan'
            // value={citizenship}
            onChange={(selectedOption) => {
              // setCitizenship(selectedOption);
              if (selectedOption) {
                setFormData({
                  ...formData,
                  kewarganegaraan: selectedOption.value,
                });
              }
            }}
          />
          {errors.kewarganegaraan && (
            <p className='text-red-500 text-sm'>{errors.kewarganegaraan}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Negara
          </label>
          <span className='text-red-500 p-1'>*</span>
          <Select
            options={optionsNegara}
            isSearchable
            isClearable
            placeholder='Pilih Nama Negara'
            onChange={(
              selectedOption: SingleValue<{ value: string; label: string }>
            ) => {
              if (selectedOption) {
                setFormData({
                  ...formData,
                  namaNegara: selectedOption.label,
                });
              }
            }}
          />
          {errors.namaNegara && (
            <p className='text-red-500 text-sm'>{errors.namaNegara}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            ID Orang Pribadi
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan No KTP untuk WNI / No Passport untuk WNA
          </p>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                idOrangPribadi: e.target.value,
              })
            }
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
          {errors.idOrangPribadi && (
            <p className='text-red-500 text-sm'>{errors.idOrangPribadi}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Identitas
          </label>
          <span className='text-red-500 p-1'>*</span>
          <p className='text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan Nama Sesuai Dengan KTP untuk WNI / Passport untuk WNA
          </p>
          <input
            type='text'
            onChange={(e) =>
              setFormData({
                ...formData,
                namaIdentitas: e.target.value,
              })
            }
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
          {errors.namaIdentitas && (
            <p className='text-red-500 text-sm'>{errors.namaIdentitas}</p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Tanggal Berakhir Passport
          </label>
          <input
            type='date'
            onChange={(e) =>
              setFormData({
                ...formData,
                masaBerlakuPassport: new Date(e.target.value).toISOString(),
              })
            }
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>

        <div className='mb-4'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload File Foto Identitas Pribadi
          </label>
          <span className='text-red-500 p-1'>*</span>
          <input
            type='file'
            className='w-full p-2 border rounded-md mt-2 text-sm'
            onChange={(e) => handleFileUpload(e, 'fileFotoIdOrangPribadi')}
          />
          {errors.fileFotoIdOrangPribadi && (
            <p className='text-red-500 text-sm'>
              {errors.fileFotoIdOrangPribadi}
            </p>
          )}
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Bank Transfer
          </label>
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
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            No Rekening
          </label>
          <input
            type='text'
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama Pemegang Rekening
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto Identitas Rekening
          </label>
          <input
            type='file'
            className='w-full p-2 mt-2 text-sm border rounded-md'
            onChange={(e) => handleFileUpload(e, 'fileFotoBuktiRekening')}
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            NPWP
          </label>
          <input
            type='text'
            className='w-full p-2 border rounded-md text-sm mt-2'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Nama NPWP
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Kota NPWP
          </label>
          <input
            type='text'
            className='w-full p-2 mt-2 text-sm border rounded-md'
          />
        </div>

        <div className='mb-5 relative'>
          <label className='inline-block font-semibold text-base mb-2'>
            Upload Foto NPWP
          </label>
          <input
            type='file'
            className='w-full p-2 border rounded-md text-sm mt-2'
            onChange={(e) => handleFileUpload(e, 'fileFotoNpwp')}
          />
        </div>

        {/* {citizenship?.value === 'wni' && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Negara
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsNegara}
                isSearchable
                isClearable
                placeholder='Pilih Nama Negara'
                onChange={(
                  selectedOption: SingleValue<{ value: string; label: string }>
                ) => {
                  if (selectedOption) {
                    setFormData({
                      ...formData,
                      namaNegara: selectedOption.label,
                    });
                  }
                }}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                NIK
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className='text-sm italic'>
                <span className='text-red-500'>*</span>
                Isikan 16 digit angka NIK di KTP
              </p>
              <input
                type='text'
                id='uraian'
                name='uraian'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama KTP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                id='uraian'
                name='uraian'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-4'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload KTP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='file'
                className='w-full p-2 border rounded-md mt-2 text-sm'
                onChange={(e) => handleFileUpload(e, 'fileFotoIdOrangPribadi')}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Bank Transfer
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsBank}
                isSearchable
                isClearable
                placeholder='Pilih Nama Bank'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                No Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Pemegang Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className='text-sm italic'>
                <span className='text-red-600'>*</span>
                Apakah sesuai dengan nama KTP? klik jika sesuai
              </p>
              <input
                type='text'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload Foto Identitas Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <p className=' text-sm italic'>
                <span className='text-red-500'>*</span>Dapat berupa: foto
                identitas buku tabungan atau screenshot info rekening & nama
                m-banking
              </p>
              <input
                type='file'
                className='w-full p-2 mt-2 text-sm border rounded-md'
                onChange={(e) => handleFileUpload(e, 'fileFotoBuktiRekening')}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                NPWP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama NPWP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Kota NPWP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 mt-2 text-sm border rounded-md'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Upload Foto NPWP
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='file'
                className='w-full p-2 border rounded-md text-sm mt-2'
                onChange={(e) => handleFileUpload(e, 'fileFotoNpwp')}
              />
            </div>
          </div>
        )} */}

        {/* {citizenship?.value === 'wna' && (
          <div>
            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Negara
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsNegara}
                isSearchable
                isClearable
                placeholder='Pilih Nama Negara'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                ID Pasport
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Foto Passport
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='file'
                className='w-full p-2 border rounded-md text-sm mt-2'
                onChange={(e) => handleFileUpload(e, 'fileFotoIdOrangPribadi')}
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Tanggal Berakhir Passport
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Bank Transfer
              </label>
              <span className='text-red-500 p-1'>*</span>
              <Select
                options={optionsBank}
                isSearchable
                isClearable
                placeholder='Pilih Nama Bank'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                No Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>

            <div className='mb-5 relative'>
              <label className='inline-block font-semibold text-base mb-2'>
                Nama Rekening
              </label>
              <span className='text-red-500 p-1'>*</span>
              <input
                type='text'
                className='w-full p-2 border rounded-md text-sm mt-2'
              />
            </div>
          </div>
        )} */}

        <div className='flex gap-5 justify-start pt-8 text-white '>
          <Link to='/registerWP/dataWPOP'>
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
export default FormTambahWPOP;
