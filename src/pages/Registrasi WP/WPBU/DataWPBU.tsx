import React, { useState, useEffect } from 'react';
import TabelData from '../../../components/Tabel/TabelData';
import { IoIosArrowForward } from 'react-icons/io';
import ButtonTabel from '../../../components/Button/ButtonTabel';
import SearchBar from '../../../components/Search/SearchBar';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const MySwal = withReactContent(Swal);

import { toast } from 'react-toastify';

export type ApiData = {
  kodeWajibPajakBadanUsaha: string;
  namaBadan: string;
  email: string;
  npwp?: string;
  namaNpwp?: string;
  kotaNpwp?: string;
  bankTransfer?: string;
  noRekening?: string;
  namaRekening?: string;
  namaNaraHubung: string;
  kontakNaraHubung: string;
  adaSkbPPh23: boolean;
  masaBerlakuBebasPPh23?: string;
  fileFotoIdentitasBadan: string;
  fileFotoBuktiRekening: string;
  fileFotoNpwp?: string;
  fileSuratBebasPPh23?: string;
  statusPkp: string;
};

const DataWPBU: React.FC = () => {
  const [apiData, setApiData] = useState<ApiData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wajib-pajak-badan-usaha`
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
  }, []);

  const handleDelete = async (kodeWajibPajakBadanUsaha: string) => {
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
        const url = `http://localhost:3000/api/wajib-pajak-badan-usaha/${kodeWajibPajakBadanUsaha}`;
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

  const ActionsButtons: React.FC<{ kodeWajibPajakBadanUsaha: string }> = ({
    kodeWajibPajakBadanUsaha,
  }) => (
    <div className='flex space-x-2 items-center text-white'>
      <Link to='/editWPBU'>
        <ButtonTabel
          text='Edit'
          icon={<FaEdit size={16} />}
          bgColor='bg-orange'
        />
      </Link>

      <ButtonTabel
        onClick={() => handleDelete(kodeWajibPajakBadanUsaha)}
        text='Hapus'
        icon={<RiDeleteBin6Fill size={16} />}
        bgColor='bg-delete'
      />
    </div>
  );

  const columns = ['No', 'Nama Badan Usaha', 'NPWP', 'Bank Transfer', 'Aksi'];

  return (
    <div className='pl-4 lg:pl-60 xl:pl-72 pt-24 xl:pt-28 w-full min-h-screen relative'>
      <div className='rounded-xl px-7'>
        <div className='my-3 pl-3 pb-4'>
          <h1 className='text-base md:text-lg font-semibold py-2'>
            Data Registrasi WPBU
          </h1>
          <ol className='list-none inline-flex text-xs md:text-sm'>
            <li className='flex items-center  '>
              <p className='text-gray-800'>Registrasi WPBU</p>
              <IoIosArrowForward className='fill-current w-3 h-3 mx-3' />
            </li>
            <li className='flex items-center'>
              <p className='text-gray-800'>Data Registrasi WPBU</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-5 rounded'>
          <div className='w-full mx-auto p-5 rounded'>
            <div className='flex flex-col md:flex-row py-3 justify-between'>
              <div className='flex md:flex-row flex-col items-center ml-5'>
                <Link to='/tambahWPBU'>
                  <ButtonTabel
                    text='Tambah Data'
                    icon={<FaPlus size={16} />}
                    bgColor='bg-tambah-data'
                  />
                </Link>
              </div>
              <div className='flex md:flex-row flex-col items-center'>
                <div className='flex justify-end mr-5'>
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
                  col1: item.namaBadan,
                  col2: item.npwp,
                  col3: item.bankTransfer,
                  col5: (
                    <ActionsButtons
                      kodeWajibPajakBadanUsaha={item.kodeWajibPajakBadanUsaha}
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

export default DataWPBU;
