import React from 'react';
import { FaEdit } from "react-icons/fa";
import { IoArrowUndoSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import ButtonTabel from '../../Button/ButtonTabel';

const FormEditWPBU: React.FC = () => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
         <div className="mb-5">
          <label className="block mb-2">Nama Badan Usaha</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

         <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Foto Identitas Badan Usaha</label>
          <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Apakah Memiliki NPWP</label>
           <select
            className="w-full p-2 border rounded"
          >
            <option value="ya">YA</option>
            <option value="tidak">TIDAK</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2">NPWP</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-5">
          <label className="block">Nama Wajib Pajak/Badan Usaha</label>
          <span className="text-gray-600 text-sm italic"> *Isikan sesuai nama identitas NPWP. Jika belum ber-NPWP iskan nama Badan Usaha</span>
          <input
            type="text"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload Foto NPWP</label>
        <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Kota / Kabupaten NPWP</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Narahubung (Contact Person)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Nama Narahubung (Contact Person)</label>
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
          text='Edit' 
          icon={<FaEdit size={16}/>} 
          bgColor='bg-orange'/> 
      </Link>
      </div>
    </div>
  );
};
export default FormEditWPBU;
