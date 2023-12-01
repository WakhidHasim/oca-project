import React from 'react';
import { FaUser } from 'react-icons/fa';

interface SatuanSatkerButtonProps {
  text: string;
  index: number;
}

const SatuanSatkerButton: React.FC<SatuanSatkerButtonProps> = ({ text, index }) => {
  const isPurple = index % 2 === 0; 

  const buttonColorClass = isPurple ? 'bg-purple' : 'bg-orange';

  return (
    <button className={`flex  gap-5 ${buttonColorClass} p-2 px-8 rounded-md text-white w-full`}>
      <FaUser sixe={20} />
      <span className='uppercase text-xs md:text-sm'>{text}</span>
    </button>
  );
};

export default SatuanSatkerButton;
