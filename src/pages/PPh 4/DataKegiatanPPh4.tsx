import React, { useState, useEffect } from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { formatIndonesianDate } from '../../utils/FormatIndonesianDate';
import { formatRupiah } from '../../utils/FormatRupiah';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { toast } from 'react-toastify';

interface ApiData {
  kodeKegiatanBadan: string;
  tanggalInput: string;
  uraianKegiatan: string;
  idKegiatanAnggaran: string;
  kodeJenisPenghasilan: number;
  kodeJenisPajak: number;
  pic: string;
  kodeWPBadan: string;
  penghasilanBruto: number;
  kodeObjek: string;
  tarifPajak: number;
  potonganPajak: number;
  penghasilanDiterima: number;
  noRekening: string;
  namaRekening: string;
  bankTransfer: string;
  narahubung: string;
  invoice: string;
  fakturPajak: string;
  dokumenKerjasamaKegiatan: string;
  status: string;
  idl: string;
}

interface WajibPajakBadanUsaha {
  kodeWPBadan: string;
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
  masaBerlakuBebasPPh23: string | null;
  fileFotoIdentitasBadan: string;
  fileFotoBuktiRekening: string;
  fileFotoNpwp: string | null;
  fileSuratBebasPPh23: string | null;
  statusPkp: string;
}

const DataKegiatanPPh4: React.FC = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [badanUsahaOptions, setBadanUsahaOptions] = useState<
    WajibPajakBadanUsaha[]
  >([]);

  const mapNamaBadan = (kodeWPBadan: string) => {
    const badanUsaha = badanUsahaOptions.find(
      (badanUsaha) => badanUsaha.kodeWPBadan === kodeWPBadan
    );
    return badanUsaha ? badanUsaha.namaBadan : 'Nama Badan Not Found';
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/kegiatan-penghasilan-badan/pph4');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setApiData(data.result);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error:', error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    fetch('/api/wajib-pajak-badan-usaha')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: WajibPajakBadanUsaha[];
        }) => {
          if (data.status.code === 200) {
            setBadanUsahaOptions(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );
  }, []);

  const handleDelete = async (kodeKegiatanBadan: string) => {
    MySwal.fire({
      title: 'Apakah Anda Yakin ?',
      text: 'Data yang dihapus tidak bisa dikembalikan!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        const url = `http://localhost:3000/api/kegiatan-penghasilan-badan/pph4/${kodeKegiatanBadan}`;
        const headers = {
          'Content-Type': 'application/json',
        };

        try {
          const response = await fetch(url, {
            method: 'DELETE',
            headers,
          });

          if (!response.ok) {
            throw new Error(`Error deleting data: ${response.status}`);
          }

          fetchData();
          toast.success('Data Berhasil Dihapus!');
        } catch (error) {
          console.error('Error deleting data:', error);
          MySwal.fire(
            'Error',
            'Failed to delete data. Please try again.',
            'error'
          );
        }
      }
    });
  };

  const handleEditClick = (kodeKegiatanBadan: string) => {
    navigate(`/editkegiatanPPh4`, { state: { kodeKegiatanBadan } });
  };

  const ActionsButtons: React.FC<{ kodeKegiatanBadan: string }> = ({
    kodeKegiatanBadan,
  }) => (
    <div className='flex space-x-2 items-center text-white'>
      <ButtonTabel
        text='Edit'
        icon={<FaEdit size={16} />}
        onClick={() => handleEditClick(kodeKegiatanBadan)}
        bgColor='bg-orange'
      />

      <ButtonTabel
        text='Hapus'
        onClick={() => handleDelete(kodeKegiatanBadan)}
        icon={<RiDeleteBin6Fill size={16} />}
        bgColor='bg-delete'
      />
    </div>
  );

  const columns = [
    'No',
    'Tanggal Input',
    'Uraian Kegiatan',
    'Nama Penerima',
    'Penghasilan Bruto',
    'Aksi',
  ];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen pb-10'>
      <div className='rounded-xl px-7'>
        <div className='my-3 pl-3 pb-4'>
          <h1 className='text-base md:text-lg font-semibold py-2'>
            Data PPh 4 ayat 2
          </h1>

          <ol className='list-none inline-flex text-xs md:text-sm'>
            <li className='flex items-center  '>
              <p className='text-gray-800'>PPh 4 Ayat 2</p>
              <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
            </li>
            <li className='flex items-center'>
              <p className='text-gray-800'>Data PPh 4 ayat 2</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center ml-5'>
                <Link to='/tambahkegiatanPPh4'>
                  <ButtonTabel
                    text='Tambah Data'
                    icon={<FaPlus size={16} />}
                    bgColor='bg-tambah-data '
                  />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center mr-5'>
                <div className='flex justify-end'>
                  <DateRange />
                  <SearchBar />
                </div>
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <TabelData
                columns={columns}
                data={apiData.map((item, index) => ({
                  id: index + 1,
                  col1: formatIndonesianDate(item.tanggalInput),
                  col2: item.uraianKegiatan,
                  col3: mapNamaBadan(item.kodeWPBadan),
                  col4: formatRupiah(item.penghasilanBruto),
                  col5: (
                    <ActionsButtons
                      kodeKegiatanBadan={item.kodeKegiatanBadan}
                    />
                  ),
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKegiatanPPh4;
