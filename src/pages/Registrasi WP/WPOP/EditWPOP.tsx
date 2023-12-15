import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FormEditPWOP from '../../../components/WP/WPOP/FormEditPWOP';
import { Link } from 'react-router-dom';

const EditWPOP: React.FC = () => {
  return (
    <div className="pl-4 lg:pl-60 xl:pl-64 xl:p-10 pt-24 xl:pt-28 w-full min-h-screen">
      <div className="rounded-xl px-7">
        <div className="font-semibold my-3 pl-3">
          <h1 className='text-lg pb-2'>Edit Data Registrasi WPOP</h1>
          <ol className="list-none inline-flex text-xs md:text-sm">
            <Link to="/dataWPOP">
            <li className="flex items-center text-purple">
              <p className="text-gray-800">Registrasi WPOP</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>

            <Link to="/dataWPOP">
             <li className="flex items-center text-purple">
              <p className="text-gray-800">Data Registrasi WPOP</p>
              <IoIosArrowForward className="fill-current w-3 h-3 mx-3" />
            </li>
            </Link>
            
            <li className="flex items-center">
              <p className="text-gray-800">Edit Data Registrasi WPOP</p>
            </li>
          </ol>
        </div>
        <div className='bg-white mt-8 rounded'>
           <FormEditPWOP />
        </div>
      </div>
    </div>
  );
};

export default EditWPOP;
