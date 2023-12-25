import React from 'react';
import { Link } from 'react-router-dom';
import {IoIosSave } from "react-icons/io"
import { IoArrowUndoSharp, } from "react-icons/io5";
import ButtonTabel from '../../Button/ButtonTabel';


const DetailWNA: React.FC = () => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Nama Lengkap</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">E-mail</label>
          <span className="text-red-500 p-1">*</span>
          <p className="text-sm italic"> 
          <span className='text-red-500'>*</span>
          Isikan email aktif untuk menerima bukti potong
          </p>

          <input
            type="text"
            className="w-full p-2 mt-2 text-sm border rounded-md"
          />
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Kewarganegaraan</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            value="WNA"
            disabled
            className="w-full p-2 border rounded-md text-sm mt-2 disabled:bg-gray-200"
          />
        </div>
        
       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">ID Pasport</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Foto Passport</label>
          <span className="text-red-500 p-1">*</span>
            <input
            type="file" 
            className="w-full p-2 border rounded-md text-sm mt-2"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Negara Asal</label>
          <span className="text-red-500 p-1">*</span>
           <select
            className="w-full p-2 border rounded-md mt-2 text-sm"
          >
            <option value="bank1">Belanda</option>
            <option value="bank2">Belgia</option>
          </select>
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Tanggal Berakhir Passport</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Bank Transfer</label>
          <span className="text-red-500 p-1">*</span>
           <select
            className="w-full p-2 border rounded-md text-sm mt-2"
          >
            <option value="bank1">BRI</option>
            <option value="bank2">BNI</option>
          </select>
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">No Rekening</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
         <Link to="/dataWPOP">
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
export default DetailWNA;
