import React from 'react';
import { FaUser } from 'react-icons/fa';


const SatuanSatkerButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button className='flex gap-5 bg-purple hover:bg-[#FFAC00] p-2 px-8 rounded-md text-white w-full'>
      <FaUser sixe={20} />
      <span className='uppercase text-xs md:text-sm'>{text}</span>
    </button>
  );
};

export default SatuanSatkerButton;
