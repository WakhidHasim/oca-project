import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import ButtonTabel from '../../Button/ButtonTabel';

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
          <p className="text-gray-600 text-sm italic"> 
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
          <select
            className="w-full p-2 border rounded-md text-sm mb-2"
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
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">NIK</label>
          <span className="text-red-500 p-1">*</span>
          <p className='text-sm italic'>
            <span className='text-red-500'>*</span>
            Isikan 16 digit angka NIK di KTP
          </p>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 mt-2 text-sm border rounded-md"
          />
        </div>
         
        <div className="mb-4">
           <label className="inline-block font-semibold text-base mb-2">Upload KTP</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="file" 
            className="w-full p-2 border rounded-md mt-2 text-sm"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5 relative">
           <label className="inline-block font-semibold text-base mb-2">Bank Transfer</label>
          <span className="text-red-500 p-1">*</span>
          <select
            className="w-full p-2 border rounded-md mt-2 text-sm"
          >
            <option value="bank1">BRI</option>
            <option value="bank2">BNI</option>
          </select>
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Nomor Rekening</label>
          <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md text-sm mt-2"
          />
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Nama Pemegang Rekening</label>
          <span className="text-red-500 p-1">*</span>
          <p className='text-sm italic'>
            <span className='text-red-600'>*</span>
            Apakah sesuai dengan nama KTP? klik jika sesuai
          </p>
          <input
            type="text"
            className="w-full p-2 mt-2 text-sm border rounded-md"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Upload Foto Identitas Rekening</label>
          <span className="text-red-500 p-1">*</span>
           <p className=" text-sm italic"> 
            <span className='text-red-500'>*</span>Dapat berupa: foto identitas buku tabungan atau screenshot info rekening & nama m-banking</p>
          <input
            type="file" 
            className="w-full p-2 mt-2 text-sm border rounded-md"
            onChange={handleFileUpload}
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Apakah Memiliki NPWP?</label>
          <span className="text-red-500 p-1">*</span>
           <select
            className="w-full p-2 border mt-2 text-sm rounded-md"
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
          <label className="inline-block font-semibold text-base mb-2">Nama Wajib Pajak</label>
          <span className="text-red-500 p-1">*</span>
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
        </div>
        )}

        {citizenship === 'wna' && (
        <div>
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
      </div>
      )}
      
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
export default FormTambahWPOP;
