import React from 'react';
import { IoIosSave } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ButtonTabel from '../../Button/ButtonTabel';

const FormTambahWPBU: React.FC = () => {
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
          <label className="inline-block font-semibold text-base mb-2">Nama Badan Usaha</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 text-sm"
          />
        </div>

         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Foto Identitas Badan Usaha</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="file" 
           
            className="w-full p-2 border rounded-md mt-2 text-sm"
            onChange={handleFileUpload}
          />
        </div>

         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Apakah memiliki NPWP?</label>
          <span className="text-red-500 p-1">*</span>
           <select
            className="w-full p-2 border rounded-md text-sm mt-2"
          >
            <option value="ya">YA</option>
            <option value="tidak">TIDAK</option>
          </select>
        </div>

         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">NPWP</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Nama Wajib Pajak/Badan Usaha</label>
          <span className="text-red-500 p-1">*</span>
          <p className=" text-sm italic"> 
            <span className='text-red-500'>*</span>
            Isikan sesuai nama identitas NPWP. Jika belum ber-NPWP iskan nama Badan Usaha</p>
          <input
            type="text"
            className="w-full p-2 mt-2 text-sm border rounded-md"
          />
        </div>

         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Upload Foto NPWP</label>
          <span className="text-red-500 p-1">*</span>
        <input
            type="file" 
            className="w-full p-2 border rounded-md text-sm mt-2"
            onChange={handleFileUpload}
          />
        </div>
         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Kota / Kabupaten NPWP</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Narahubung (Contact Person)</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

       
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
         <Link to="/dataWPBU">
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
export default FormTambahWPBU;
