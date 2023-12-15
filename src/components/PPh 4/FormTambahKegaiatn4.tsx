import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { TiCancel } from "react-icons/ti";

const FormTambahKegaiatn4: React.FC = () => {
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
          <label className="block">Uraian Kegiatan</label>
          <span className="text-gray-600 text-xs"> * Berisi nama imbalan, kegiatan, subyek prodi (jika ada), periode (ke- atau bulan tahun), PTT/BP atau PT (jika waktu penerimaan dibedakan untuk PT dan PTT)</span>
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
          <label className="block mb-2">No Dokumentasi Referensi</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
          />
        </div>

         <div className="mb-5">
          <label className="block mb-2">Jenis Dokumentasi Terkait</label>
          <select
            className="w-full p-2 border rounded"
          >
            <option value="jenis1">Belum Setor</option>
            <option value="jenis2">Sudah Setor</option>
          </select>
        </div>

        <div className="mb-5">
          <label htmlFor="uploadBuktiBayar" className="block mb-2">Upload Bukti Pendukung</label>
          <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md"
            onChange={handleFileUpload}
          />
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
          <label className="block mb-2">Nama Badan Usaha</label>
           <select
            className="w-full p-2 border rounded-md"
          >
            <option value="nama1">Belum Setor</option>
            <option value="nama2">Sudah Setor</option>
          </select>

        </div>
        <div className="mb-5">
          <label className="block mb-2">NPWP</label>
          <input
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Objek Pajak</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Penghasilan Bruto</label>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Tarif Pajak</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2">Potongan Pajak</label>
          <input
            type="text"
           disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Penghasilan Diterima</label>
          <input
            type="text"
           disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2">Tanggal Potong</label>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md  disabled:bg-gray-200"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="tanggal" className="block mb-2">Tanggal Transaksi</label>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="w-full p-2 border rounded-md"
          />
        </div>

        
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
        <Link to="/kegiatanPPh4">
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
export default FormTambahKegaiatn4;
