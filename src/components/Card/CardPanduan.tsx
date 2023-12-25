import React from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface CardProps {
  text: string;
  imageSrc: string;
}

const CardPanduan: React.FC<CardProps> = ({text, imageSrc}) => {
  return (
    <div className="w-full max-w-md mx-auto bg-white">
      <div className="border rounded shadow-md">
        <div className="flex items-center justify-center p-4 h-52 gap-5 ">   
          <img src={imageSrc} className="w-3/4" alt="Card Image" />
        </div>
        <div>
           <button className="flex items-center justify-between text-sm bg-orange  hover:bg-orange hover:opacity-75 rounded-b p-2 w-full">
            <p className="ml-2 "> {text}</p>
            <MdKeyboardDoubleArrowRight size={20} className="mr-2" />
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default CardPanduan;
