import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosSave } from "react-icons/io";
import { IoArrowUndoSharp } from "react-icons/io5";
import ButtonTabel from '../Button/ButtonTabel';

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
            className="w-full p-2 mt-2 border rounded-md text-sm"
          />
        </div> 

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">No Pengajuan Anggaran</label>
           <span className="text-red-500 p-1">*</span>
          <select
            id="noPengajuan"
            name="noPengajuan"
            className="w-full p-2 mt-2 border rounded-md text-sm"
          >
            <option value="no1">009765678</option>
            <option value="no2">008766789</option>
          </select>  
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">No Dokumntasi Referensi</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            className="w-full p-2 border rounded-md mt-2 text-sm"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Jenis Dokumentasi Terkait</label>
           <span className="text-red-500 p-1">*</span>
          <select
            className="w-full p-2 border rounded-md mt-2 text-sm"
          >
            <option value="jenis1">Belum Setor</option>
            <option value="jenis2">Sudah Setor</option>
          </select>
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Uplod Bukti Pendukung</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="file" 
            id="uploadBuktiBayar"
            name="uploadBuktiBayar"
            className="w-full p-2 border rounded-md mt-2 text-sm"
            onChange={handleFileUpload}
          />
        </div>

      <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">PIIC (Pencaiiran Penghasilan)</label>
           <span className="text-red-500 p-1">*</span>
          <select
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md mt-2 text-sm"
          >
            <option value="pic1">PIC 1</option>
            <option value="pic2">PIC 2</option>
          </select>
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Nama Badan Usaha</label>
           <span className="text-red-500 p-1">*</span>
           <select
            className="w-full p-2 border rounded-md mt-2 text-sm"
          >
            <option value="nama1">Belum Setor</option>
            <option value="nama2">Sudah Setor</option>
          </select>

        </div>
       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">NPWP</label>
           <span className="text-red-500 p-1">*</span>
          <input
            disabled
            className="w-full p-2 border rounded-md mt-2 disabled:bg-gray-200 text-sm"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Objek Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md mt-2 text-sm"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Penghasilan Bruto</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            id="pic"
            name="pic"
            className="w-full p-2 border rounded-md mt-2 text-sm"
          />
        </div>
       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Tarif Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md mt-2 text-sm disabled:bg-gray-200"
          />
        </div>
        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Potongan Pajak</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
           disabled
            className="w-full p-2 border rounded-md mt-2 disabled:bg-gray-200 text-sm"
          />
        </div>

       <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Penghasilan Diterima</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
           disabled
            className="w-full p-2 border rounded-md mt-2 etxt-sm disabled:bg-gray-200"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Tanggal Potong</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="text"
            disabled
            className="w-full p-2 border rounded-md mt-2  disabled:bg-gray-200 text-sm"
          />
        </div>

        <div className="mb-5 relative">
          <label className="inline-block font-semibold text-base mb-2">Tanggal Transaksi</label>
           <span className="text-red-500 p-1">*</span>
          <input
            type="date"
            id="tanggal"
            name="tanggal"
            className="w-full p-2 border mt-2 rounded-md text-sm"
          />
        </div>

        
      </form>
      <div className='flex gap-5 justify-start pt-8 text-white '>
         <Link to="/kegiatanPPh4">
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
export default FormTambahKegaiatn4;
