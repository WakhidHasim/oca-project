import React, { useState, useEffect } from 'react';
import TabelData from '../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../components/Button/ButtonTabel';
import DateRange from '../../components/Filter/DateRange';
import SearchBar from '../../components/Search/SearchBar';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { TbListDetails } from 'react-icons/tb';
import { FaPlus } from 'react-icons/fa6';
import { indonesianDate } from '../../utils/FormatIndonesianDate';
import { currencyRupiah } from '../../utils/FormatRupiah';

import { Link, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);

interface ApiData {
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

interface PengajuanAnggaran {
  idKegiatanAnggaran: string;
  tahun: string;
  kegiatan: string;
  noPengajuan: string;
  idl: string;
  jumlahPengajuan: number;
  metodePengajuan: string;
  statusPengajuan: string;
  tanggalPengajuan: string;
}

const DataKegiatanPPh21: React.FC = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [pengajuanAnggaranValue, setPengajuanAnggaranValue] = useState<
    PengajuanAnggaran[]
  >([]);

  const noPengajuan = (idKegiatanAnggaran: string) => {
    const pengajuanAnggaran = pengajuanAnggaranValue.find(
      (pengajuanAnggaran) =>
        pengajuanAnggaran.idKegiatanAnggaran === idKegiatanAnggaran
    );
    return pengajuanAnggaran
      ? pengajuanAnggaran.noPengajuan
      : 'no Pengajuan Not Found';
  };

  // const token = localStorage.getItem('token');

  const fetchData = async () => {
    const idl = localStorage.getItem('idl') || '';

    try {
      const response = await fetch(
        `/api/kegiatan-penghasilan-orang-pribadi?idl=${idl}`
      );

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

    fetch('/api/pengajuan-anggaran')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: PengajuanAnggaran[];
        }) => {
          if (data.status.code === 200) {
            setPengajuanAnggaranValue(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );
  }, []);

  const handleDelete = async (kodeKegiatanOP: string) => {
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
        const url = `/api/kegiatan-penghasilan-orang-pribadi/${kodeKegiatanOP}`;
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

  const handleAddPenerima = (kodeKegiatanBadan: string) => {
    navigate(`/detailPenerima21`, { state: { kodeKegiatanBadan } });
  };

  const handleEditClick = (kodeKegiatanOP: string) => {
    navigate(`/dataKegiatan21/editKegiatan21`, { state: { kodeKegiatanOP } });
  };

  const ActionsButtons: React.FC<{ kodeKegiatanOP: string }> = ({
    kodeKegiatanOP,
  }) => (
    <div className='flex space-x-2 items-center text-white'>
      <ButtonTabel
        text='Penerima'
        icon={<TbListDetails size={16} />}
        onClick={() => handleAddPenerima(kodeKegiatanOP)}
        bgColor='bg-detail'
      />
      <ButtonTabel
        text='Edit'
        icon={<FaEdit size={16} />}
        onClick={() => handleEditClick(kodeKegiatanOP)}
        bgColor='bg-orange'
      />
      <Link to=''>
        <ButtonTabel
          text='Hapus'
          icon={<RiDeleteBin6Fill size={16} />}
          bgColor='bg-delete'
          onClick={() => handleDelete(kodeKegiatanOP)}
        />
      </Link>
    </div>
  );

  const columns = [
    'No',
    'Tanggal Input',
    'Uraian Kegiatan',
    'No Pengajuan',
    'Total Pajak',
    'Total Penghasilan Bruto',
    'Aksi',
  ];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  relative'>
      <div className='rounded-xl px-7'>
        <div className='my-3 pl-3 pb-4'>
          <h1 className='text-base md:text-lg font-semibold py-2'>
            Data Kegiatan 21
          </h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <li className='flex items-center  '>
              <p className='text-gray-800'>PPh 21</p>
              <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
            </li>
            <li className='flex items-center'>
              <p className='text-gray-800'>Data Kegiatan PPh 21</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center ml-5'>
                <Link to='/dataKegiatan21/tambahKegiatan21'>
                  <ButtonTabel
                    text='Tambah Data'
                    icon={<FaPlus size={16} />}
                    bgColor='bg-tambah-data'
                  />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center'>
                <div className='flex justify-end items-center mr-5'>
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
                  col1: indonesianDate(item.tanggalInput),
                  col2: item.uraianKegiatan,
                  col3: noPengajuan(item.idKegiatanAnggaran),
                  col4: currencyRupiah(item.totalPotonganPajak),
                  col5: currencyRupiah(item.totalPenghasilanBruto),
                  col6: <ActionsButtons kodeKegiatanOP={item.kodeKegiatanOP} />,
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataKegiatanPPh21;
