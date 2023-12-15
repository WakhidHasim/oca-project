import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const FormTambahDataPenerima: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
        <div className="mb-5">
          <label  className="block mb-2">Nama Penerima</label>
          <select
            className="w-full p-2 border rounded-md px-2"
          >
            <option value="nama1">Kristina</option>
            <option value="nama2">Galih</option>
          </select>
        </div>
        <div className="mb-5">
          <label  className="block mb-2">Jenis Wajib Pajak</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5">
          <label  className="block mb-2">Metode Potong</label>
         <select
            className="w-full p-2 border rounded-md px-2"
          >
            <option value="metode1">Cek</option>
            <option value="metode2">ATM</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block mb-2">Penghasilan Bruto</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Tarif Pajak</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Potongan Pajak</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5">
          <label  className="block mb-2">Penghasilan Diterima</label>
          <input
            type="text"
             disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5">
          <label  className="block mb-2">Tanggal Potong</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
         
      </form>
        <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to="/inventaris">
          <button className='bg-gray-400 p-2 rounded px-4 flex gap-1 text-sm'>
          <TiCancel size={20} clasName="p-1 text-white  "/>
          <span>Kembali</span>
        </button>
        </Link>
        <button className='bg-purple p-2 rounded px-4 flex gap-1 text-sm'>
          <IoIosSave size={18} clasName="p-1" />
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};
export default FormTambahDataPenerima;
