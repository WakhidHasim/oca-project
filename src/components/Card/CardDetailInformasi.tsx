import React from 'react';

interface DetailProps {
    text:string;
}

const CardPanduan: React.FC<DetailProps> = ({text}) => {
  return (
    <div className="w-full mx-auto ">
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className="bg-orange py-4 px-6">
                <h1 className="text-white font-semibold">Deskripsi</h1>
            </div>
            <div className="p-6">
                <h2 className="text-base font-semibold mb-4">Objek Pajak</h2>
                <ul className="list-disc pl-5 text-sm">
                    <li className="mb-2">Upah</li>
                    <li className="mb-2">Honorarium</li>
                    <li className="mb-2">Tunjangan dan pembayaran lainnya yang terkait dengan pekerjaan atau jabatan</li>
                    <li className="mb-2">Jasa dan kegiatan yang dilakukan oleh perorangan</li>
                </ul>
            </div>
            <div className="px-6 pt-3">
                <h2 className="text-base font-semibold mb-4">Tarif Pajak</h2>
                <ul className="list-disc pl-5 text-sm">
                    <li className="mb-2">Pegawai tetap, penerimaan gabung gaji tarif pkp x penghasilan Bruto keseluruhan penghasilan</li>
                    <li className="mb-2">Pegawai tetap, penerimaan pisah gaji 50% x lapisan tarif potong x penghasilan Bruto</li>
                    <li className="mb-2">Pegawai tetap dan bukan pegawai 50% x penghasilan Bruto x 5% ber NPWP, 20% lebih tinggi bagi Non NPWP</li>
                    <li className="mb-2">Hadiah / Penghargaan WP Orang Pribadi 5% penghasilan Bruto ber NPWP, 20% lebih tinggi bagi Non NPWP</li>
                </ul>
            </div>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mt-6'>
            <div className="bg-orange py-4 px-6">
                <h1 className="text-white font-semibold">Keterangan</h1>
            </div>
            <div className="p-6">
                <ul className="list-disc pl-5 text-sm">
                    <li className="mb-2">Tanggal Input PPh {text} berakhir pada tanggal 30 setiap akhir bulan. Pastikan sudah input sebelum batas waktu yang ditentukan!</li>
                </ul>
            </div>
        </div>

    </div>
  );
};

export default CardPanduan;
