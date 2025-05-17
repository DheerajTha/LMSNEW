import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Searchbar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/course-list/${input.trim()}`);
    }
  };

  return (
    <div className="w-full mb-4">
      <form
        onSubmit={onSearchHandler}
        className="flex items-stretch rounded-lg overflow-hidden border border-gray-200 hover:border-[#7a1cac] transition duration-200 focus-within:ring-2 focus-within:ring-[#7a1cac] focus-within:border-transparent"
      >
         <div className="flex items-center justify-center px-3 sm:px-4 bg-gray-100 text-gray-500 text-base">
          <FaSearch />
        </div>

         <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search courses..."
          className="flex-grow h-12 px-3 sm:px-4 py-2 text-sm sm:text-base focus:outline-none"
        />

         <button
          type="submit"
          className="px-4 sm:px-6 bg-[#7a1cac] text-white text-sm sm:text-base hover:bg-[#5e1488] transition duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
