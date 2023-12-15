import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface CardProps {
  text: string;
}

const CardDashboard: React.FC<CardProps> = ({ text }) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <div className="border rounded shadow-md">
        <div className="flex items-center p-5 gap-1 xl:gap-10 w-fulll mx-auto">
          <div>
            <FaDatabase size={35} className="mr-4 " />
          </div>
          <div className="flex flex-col justify-end">
            <h1 className="font-medium text-basexl:text-lg text-right">{text}</h1>
            <span className="text-2xl md:text-3xl pt-5 text-gray-500 text-right ">60</span>
          </div>
        </div>
      
          <button className="flex items-center justify-between text-sm bg-purple text-white hover:bg-purple hover:opacity-75 rounded-b p-2 w-full">
            <p className="ml-2 ">Lihat Data</p>
            <MdKeyboardDoubleArrowRight size={20} className="mr-2" />
          </button>
       
      </div>
    </div>
  );
};

export default CardDashboard;
