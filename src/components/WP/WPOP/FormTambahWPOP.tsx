import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const FormTambahWPOP: React.FC = () => {
   const [citizenship, setCitizenship] = useState<string>('');

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
          <label className="block ">Nama Lengkap</label>
          <input
            type="text"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>

        <div className="mb-5">
          <label className="block">Email</label>
          <span className="text-gray-600 text-sm italic"> *Isikan email aktif untuk menerima bukti potong</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>

         <div className="mb-4">
          <label className="block mb-2">Kewarganegaraan</label>
          <select
            className="w-full p-2 border rounded-md"
            value={citizenship}
            onChange={(e) => setCitizenship(e.target.value)}
          >
            <option>Select Kewarganegaraan </option>
            <option value="wni">WNI</option>
            <option value="wna">WNA</option>
          </select>
        </div>

      {citizenship === 'wni' && (
      <div>
        <div className="mb-4">
          <label className="block">NIK</label>
          <span className="text-gray-600 text-sm italic"> *Isikan 16 digit angka NIK di KTP</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
         
        <div className="mb-4">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload KTP</label>
          <input
            type="file" 
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
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
          <label className="block mb-2">Nomor Rekening</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

       <div className="mb-5">
          <label className="block">Nama Pemegang Rekening</label>
          <span className="text-gray-600 text-sm italic"> *Apakah sesuai dengan nama KTP? klik jika sesuai</span>
          <input
            type="text"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block">Upload Foto Identitas Rekening</label>
           <span className="text-gray-600 text-sm italic"> *Dapat berupa: foto identitas buku tabungan atau screenshot info rekening & nama m-banking</span>
          <input
            type="file" 
            className="w-full p-2 mt-3 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Apakah Memiliki NPWP?</label>
           <select
            className="w-full p-2 border rounded-md"
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
          <label className="block ">Nama Wajib Pajak</label>
          <input
            type="text"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
       <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload Foto NPWP</label>
            <input
            type="file" 
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
        </div>
        </div>
        )}

        {citizenship === 'wna' && (
        <div>
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
              <option value="Belanda">Belanda</option>
              <option value="Belgia">Belgia</option>
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
        </div>
      )}
      
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to="/dataWPOP">
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
export default FormTambahWPOP;
