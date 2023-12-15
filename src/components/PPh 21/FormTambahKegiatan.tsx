import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const FormTambahKegiatan: React.FC = () => {
  return (
    <div className="w-full mx-auto p-6 md:p-10 rounded bg-white h-full">
      <form className="w-full">
        <div className="mb-5">
          <label className="block mb-2">Tanggal Kegiatan</label>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block">Uraian Kegiatan</label>
          <span className="text-gray-600 text-sm"> * Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode (ke- atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan dibedakan untuk PT dan PTT)</span>
          <input
            type="text"
            id="uraian"
            name="uraian"
            className="w-full p-2 mt-3 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">No Pengajuan Anggaran</label>
          <select
            id="noPengajuan"
            name="noPengajuan"
            className="w-full p-2 border rounded-md"
          >
            <option value="no1">009765678</option>
            <option value="no2">008766789</option>
          </select>
        </div>
        
        <div className="mb-5">
          <label className="block mb-2">PIC (Pencairan Penghasilan)</label>
          <select
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          >
            <option value="pic1">PIC 1</option>
            <option value="pic2">PIC 2</option>
          </select>
        </div>
         <div className="mb-5">
          <label className="block mb-2">Menghendaki Billing Terpisah?</label>
          <div className="flex items-center">
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
export default FormTambahKegiatan;
