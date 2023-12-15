import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

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
         <div className="mb-5">
          <label className="block mb-2">Nama Lengkap</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block">Email</label>
          <span className="text-gray-600 text-sm italic"> *Isikan email aktif untuk menerima bukti potong</span>
          <input
            type="text"
            className="w-full p-2 mt-3  border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Kewarganegaraan</label>
          <input
            type="text"
            value="WNA"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        
        <div className="mb-5">
          <label className="block mb-2">ID Passport</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

       <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Foto Passport</label>
            <input
            type="file" 
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Negara Asal</label>
           <select
            className="w-full p-2 border rounded-md"
          >
            <option value="bank1">Belanda</option>
            <option value="bank2">Belgia</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2">Tanggal Berakhir Passport</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Bank Transfer</label>
           <select
            className="w-full p-2 border rounded-md"
          >
            <option value="bank1">BRI</option>
            <option value="bank2">BNI</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-2">No Rekening</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to="/dataWPOP">
          <button className='bg-gray-400 p-2 rounded px-4 flex gap-1 text-sm'>
          <TiCancel size={20} clasName="p-1 text-white  "/>
          <span>Kembali</span>
        </button>
        </Link>
        <button className='bg-orange p-2 rounded px-4 flex gap-1 text-sm'>
          <FaEdit size={18} clasName="p-1" />
          <span>Simpan</span>
        </button>
      </div>
    </div>
  );
};
export default DetailWNA;
