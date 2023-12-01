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
        <div className="flex items-center p-4 gap-5">
          <FaDatabase size={50} className="mr-4 " />
          <div className="flex flex-col">
            <h1 className="font-medium text-lg">{text}</h1>
            <span className="text-2xl md:text-3xl pt-5 font-semibold text-gray-500 text-right ">60</span>
          </div>
        </div>
        <div>
          <button className="flex items-center justify-between bg-purple text-white hover:bg-purple hover:opacity-75 rounded-b p-2 w-full">
            <p className="ml-2">Lihat Data</p>
            <MdKeyboardDoubleArrowRight size={20} className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDashboard;
