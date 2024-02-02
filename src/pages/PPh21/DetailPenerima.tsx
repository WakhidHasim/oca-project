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

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { toast } from 'react-toastify';

interface ApiData {
  id: string;
  kodeKegiatanOP: string;
  kodeWPOP: string;
  statusPegawai: string;
  npwp?: string;
  lapisan?: number;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  penghasilanBruto: number;
  kodeObjek: string;
  tarifBerlaku: number;
  potonganPajak: number;
  penghasilanDiterima: number;
  metodePotong: string;
  fileBuktiPotong?: string;
  status: string;
}

interface WajibPajakOrangPribadi {
  kodeWPOP: string;
  nama: string;
  email: string;
  kewarganegaraan: string;
  namaNegara: string;
  idOrangPribadi: string;
  namaIdentitas: string;
  masaBerlakuPassport?: Date;
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
}

const DetailPenerima: React.FC = () => {
  const navigate = useNavigate();

  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [namaWPOP, setNamaWPOP] = useState<WajibPajakOrangPribadi[]>([]);

  const mapNamaWPOP = (kodeWPOP: string) => {
    const wpop = namaWPOP.find((wpop) => wpop.kodeWPOP === kodeWPOP);
    return wpop ? wpop.nama : 'Nama Badan Not Found';
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/pph21');

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

    fetch('http://localhost:3000/api/wpop')
      .then((response) => response.json())
      .then(
        (data: {
          status: { code: number; description: string };
          result: WajibPajakOrangPribadi[];
        }) => {
          if (data.status.code === 200) {
            setNamaWPOP(data.result);
          } else {
            console.error('Error fetching data:', data.status.description);
          }
        }
      );
  }, []);

  const handleDelete = async (id: string) => {
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
        const url = `http://localhost:3000/api/pph21/${id}`;
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

  const formatCurrency = (amount: number): string => {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

    return formattedAmount;
  };

  const ActionsButtons: React.FC<{ id: string }> = ({ id }) => (
    <div className='flex space-x-2 items-center text-white'>
      <Link to='/editPenerima21'>
        <ButtonTabel
          text='Edit'
          icon={<FaEdit size={16} />}
          bgColor='bg-orange'
        />
      </Link>
      <ButtonTabel
        onClick={() => handleDelete(id)}
        text='Hapus'
        icon={<RiDeleteBin6Fill size={16} />}
        bgColor='bg-delete'
      />
    </div>
  );

  const columns = [
    'No',
    'Nama Penerima',
    'Jenis WP',
    'Penghasilan Bruto',
    'Tarif Pajak',
    'Potongan Pajak',
    'Penghasilan Diterima',
    'Aksi',
  ];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen  pb-10'>
      <div className='rounded-xl px-7'>
        <div className='font-semibold my-3 pl-3 pb-4'>
          <h1 className='text-lg xl:text-2xl py-2'>
            Data Detail Penerima Kegiatan PPh 21
          </h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <Link to='/dataKegiatan21'>
              <li className='flex items-center  '>
                <p className='text-gray-800'>PPh 21</p>
                <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
              </li>
            </Link>

            <Link to='/dataKegiatan21'>
              <li className='flex items-center  '>
                <p className='text-gray-800'>Data PPh 21</p>
                <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
              </li>
            </Link>

            <li className='flex items-center'>
              <p className='text-gray-800'>
                Data Detail Penerima Kegiatan PPh 21
              </p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center'>
                <Link to='/tambahPenerima21'>
                  <ButtonTabel
                    text='Tambah Data'
                    icon={<FaPlus size={16} />}
                    bgColor='bg-tambah-data'
                  />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center'>
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
                  col1: mapNamaWPOP(item.kodeWPOP),
                  col2: item.statusPegawai,
                  col3: formatCurrency(item.penghasilanBruto),
                  col4: formatCurrency(item.potonganPajak),
                  col5: item.tarifBerlaku,
                  col6: formatCurrency(item.penghasilanDiterima),
                  col7: <ActionsButtons id={item.id} />,
                }))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPenerima;
