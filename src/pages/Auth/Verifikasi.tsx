import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import SatuanSatkerButton from '../../components/Button/SatuanSatkerButton';

const Verifikasi: React.FC = () => {
  const navigate = useNavigate();

  const [agentName, setAgentName] = useState<string | null>(null);
  const [namaSatker, setNamaSatker] = useState<string[] | null>(null);
  const [nip, setNip] = useState<string>('');
  const [, setSelectedSatker] = useState<string>('');
  const [idl, setIdl] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { nip, nama_pegawai, nama_satker, idl } = JSON.parse(
        atob(token.split('.')[1])
      );

      setNip(nip);
      setAgentName(nama_pegawai);
      setNamaSatker(Array.isArray(nama_satker) ? nama_satker : [nama_satker]);
      setIdl(idl || '');
    }
  }, []);

  const handleSatkerSelection = (
    selectedSatker: string,
    selectedIdl: string
  ) => {
    setSelectedSatker(selectedSatker);
    setIdl(selectedIdl);
    localStorage.setItem('nip', nip || '');
    localStorage.setItem('nama_agent', agentName || '');
    localStorage.setItem('idl', [selectedIdl][0]);
    localStorage.setItem('nama_satker', [selectedSatker][0]);

    navigate('/dashboard', { state: { selectedSatker } });
  };

  const buttonData = namaSatker || [];

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#E9E9E9] '>
      <div className='max-w-3xl md:max-w-4xl p-8 w-full'>
        <div className='relative flex flex-col md:flex-row gap-10'>
          <div className='text-center items-center bg-slate-50 p-8 flex flex-col justify-center w-full rounded-2xl py-16 shadow-lg'>
            <div className='py-6 text-center'>
              <div className='flex gap-4 items-center justify-center'>
                <div className='w-12 lg:w-26 drop-shadow-md'>
                  <img src={logo} className='w-full' alt='Login' />
                </div>
                <h1 className='font-bold text-lg md:text-2xl py-2 pb-3 uppercase drop-shadow-md'>
                  One Collecting Agent
                </h1>
              </div>
              <h2 className='font-semibold text-base lg:text-lg pb-2'>
                {agentName}
              </h2>
              <p className='text-sm'>Pilih Satuan Kerja </p>
              <div className='pt-3 space-y-4 justify-start flex items-center flex-col'>
                {buttonData.map((text, index) => (
                  <SatuanSatkerButton
                    key={index}
                    text={text}
                    onClick={() => handleSatkerSelection(text, idl[index])}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifikasi;
