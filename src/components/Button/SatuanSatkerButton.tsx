import React from 'react';
import { MdAccountCircle } from "react-icons/md";


const SatuanSatkerButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <button className='flex gap-4 bg-purple hover:bg-[#FFAC00] hover:shadow-md p-2 px-8 rounded-md text-white w-full'>
      <MdAccountCircle sixe={25}/>
      <span className='uppercase text-xs md:text-sm'>{text}</span>
    </button>
  );
};

export default SatuanSatkerButton;
