import React, { ReactNode } from 'react';

interface ButtonTabelProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
   
}

const ButtonTabel: React.FC<ButtonTabelProps> = ({ text, icon, onClick }) => {
  return (
    <div>
      <button  onClick={onClick} className="bg-purple text-white p-2  flex gap-2 text-sm bg-purple  px-3 rounded">
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
