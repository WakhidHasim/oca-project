import React, { ReactNode } from 'react';

interface ButtonTabelProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  bgColor?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonTabel: React.FC<ButtonTabelProps> = ({
  text,
  icon,
  onClick,
  bgColor,
  type = 'button',
}) => {
  return (
    <div className=''>
      <button
        onClick={onClick}
        type={type}
        className={`text-white p-2 flex gap-2 text-sm px-3 rounded shadow-md ${
          bgColor || ''
        }`}
      >
        {icon && <span className=''>{icon}</span>}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default ButtonTabel;
