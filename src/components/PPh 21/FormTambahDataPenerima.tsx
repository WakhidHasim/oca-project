import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import ButtonTabel from '../Button/ButtonTabel';

const FormTambahDataPenerima: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
       <div className="mb-5 relative">
          <label className="inline-block font-semibold">Nama Penerima</label>
           <span className="text-red-500 p-1">*</span>
          <select
            className="w-full p-2 border rounded-md px-2 mt-2"
          >
            <option value="nama1">Eka</option>
            <option value="nama2">Galih</option>
          </select>
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold">Jenis Wajib Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
       <div className="mb-5 relative">
          <label className="inline-block font-semibold">Metode Potong</label>
           <span className="text-red-500 p-1">*</span>
         <select
            className="w-full p-2 border rounded-md px-2 mt-2"
          >
            <option value="metode1">Cek</option>
            <option value="metode2">ATM</option>
          </select>
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold">Penghasilan Bruto</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold">Tarif Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md mt-2  disabled:bg-gray-200"
          />
        </div>
       <div className="mb-5 relative">
          <label className="inline-block font-semibold">Potongan Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md mt-2  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold">Penghasilan Diterima</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
             disabled
            className="w-full p-2 border rounded-md mt-2 disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold">Tanggal Potong</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md mt-2 disabled:bg-gray-200"
          />
        </div>
         
      </form>
        <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to="/detailPenerima21">
          <ButtonTabel 
            text='Kembali' 
            icon={<IoArrowUndoSharp size={16}/>} 
            bgColor='bg-gray'
          /> 
        </Link>

        <Link to="">
        <ButtonTabel 
          text='Simpan' 
          icon={<IoIosSave size={16}/>} 
          bgColor='bg-tambah-data'/> 
      </Link>
      </div>
    </div>
  );
};
export default FormTambahDataPenerima;
