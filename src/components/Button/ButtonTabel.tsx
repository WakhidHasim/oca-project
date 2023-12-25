import React, { ReactNode } from 'react';

interface ButtonTabelProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  bgColor?: string;
   
}

const ButtonTabel: React.FC<ButtonTabelProps> = ({ text, icon, onClick, bgColor }) => {
  return (
    <div className=''>
      <button onClick={onClick} 
        className={`text-white p-2 flex gap-2 text-sm px-3 rounded shadow-md ${bgColor || ''}`}>
          {icon && 
        <span className="">
            {icon}
        </span>}
        {text}
      </button>
    </div>
  );
};

export default ButtonTabel;
