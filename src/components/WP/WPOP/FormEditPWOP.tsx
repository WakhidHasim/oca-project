import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { TiCancel } from "react-icons/ti";

const FormEditPWOP: React.FC = () => {
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      console.log('File uploaded:', file.name);
    }
  };

  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
         <div className="mb-4">
          <label className="block mb-2">Nama Lengkap</label>
          <input
            type="text"
            id="noPengajuan"
            name="noPengajuan"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <span className="text-gray-600 text-sm italic"> *Isikan email aktif untuk menerima bukti potong</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Kewarganegaraan</label>
          <input
            type="text"
            id="noPengajuan"
            name="noPengajuan"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">NIK</label>
          <span className="text-gray-600 text-sm italic"> *Isikan 16 digit angka NIK di KTP</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload KTP</label>
          <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Bank Transfer</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nomor Rekening</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
       <div className="mb-4">
          <label className="block mb-2">Nama Pemegang Rekening</label>
          <span className="text-gray-600 text-sm italic"> *Apakah sesuai dengan nama KTP? klik jika sesuai</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload Foto Identitas Rekening</label>
           <span className="text-gray-600 text-sm italic"> *Dapat berupa: foto identitas buku tabungan atau screenshot info rekening & nama m-banking</span>
          <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Apakah Memiliki NPWP?</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">NPWP</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Nama Wajib Pajak</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
       <div className="mb-4">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload Foto NPWP</label>
            <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
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
export default FormEditPWOP;
