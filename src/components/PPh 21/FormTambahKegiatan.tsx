import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import ButtonTabel from '../Button/ButtonTabel';

const FormTambahKegiatan: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Tanggal Kegiatan</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="w-full p-2 border rounded-md text-sm"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Uraian Kegiatan</label>
           <span className="text-red-500 p-1">*</span>
          <p className="text-sm block mt-1">
            <span className='text-red-500 pr-2'>*</span>
              Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode (ke- atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan dibedakan untuk PT dan PTT)
          </p>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 mt-2 border rounded-md text-sm "
          />
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">No Pengajuan Anggaran</label>
           <span className="text-red-500 p-1">*</span>
          <select
            id="noPengajuan"
            name="noPengajuan"
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value="no1">009765678</option>
            <option value="no2">008766789</option>
          </select>
        </div>
        
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">PIC (Pencairan Penghasilan)</label>
           <span className="text-red-500 p-1">*</span>
          <select
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md mt-2"
          >
            <option value="pic1">PIC 1</option>
            <option value="pic2">PIC 2</option>
          </select>
        </div>
         <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Mnghendaki Billing Terpisah?</label>
           <span className="text-red-500 p-1">*</span>
          <div className="flex items-center mt-2">
            <label htmlFor="billingYa" className="mr-4">
              <input
                type="radio"
                id="billingYa"
                name="billing"
                value="ya"
                className="mr-2"
              />
              YA
            </label>
            <label htmlFor="billingTidak">
              <input
                type="radio"
                id="billingTidak"
                name="billing"
                value="tidak"
                className="mr-2"
              />
              Tidak
            </label>
          </div>
        </div>
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
         <Link to="/dataKegiatan21">
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
export default FormTambahKegiatan;
