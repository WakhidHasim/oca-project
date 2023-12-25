import React from 'react';

interface Section {
  title: string;
  items: string[];
}

interface DetailProps {
  text: string;
  objekPajak: Section;
  tarifPajak: Section;
  keterangan: string;
}

const CardPanduan: React.FC<DetailProps> = ({text, objekPajak, tarifPajak, keterangan}) => {
  return (
    <div className="w-full mx-auto ">
        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
            <div className="bg-orange py-3 px-6">
                <h1 className="font-semibold">Deskripsi</h1>
            </div>
            <div className="p-6">
                <h2 className="font-semibold mb-1">Objek Pajak</h2>
                <p className=' mb-3 text-xs'>Yang termasuk dalam objek pajak pada PPh Pasal {text} adalah :</p>
                 <ul className="list-disc pl-5 text-sm">
                    {objekPajak.items.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                    ))}
                </ul>
            </div>
            <div className="px-6 pb-5">
                <h2 className="font-semibold mb-1">Tarif Pajak</h2>
                <p className=' mb-3 text-xs'>Tarif Pajak pada PPh Pasal {text} adalah :</p>
                 <ul className="list-disc pl-5 text-sm">
                    {tarifPajak.items.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                    ))}
                </ul>
            </div>
        </div>

        <div className='bg-white rounded-lg shadow-md overflow-hidden mt-6'>
            <div className="bg-orange py-3 px-6">
                <h1 className=" font-semibold">Keterangan</h1>
            </div>
            <div className="p-6">
                <ul className="list-disc pl-5 text-sm">
                    <li className="mb-2">{keterangan}</li>
                </ul>
            </div>
        </div>

    </div>
  );
};

export default CardPanduan;
