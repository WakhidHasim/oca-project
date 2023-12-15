import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar:React.FC = () =>{
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };


    return(
        <div className="flex gap-2 items-center mb-3 sm:mb-0">
            <div className="relative p-2 pb-3 pr-8 rounded pt-2 border text-xs">
              <div className="absolute flex items-center">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchText}
                onChange={handleSearchChange}
                className="w-full border-none pl-5 focus:outline-none"
              />
            </div>
          </div>
    )
}

export default SearchBar;