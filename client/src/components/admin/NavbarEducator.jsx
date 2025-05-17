import React from 'react';
import { dummyEducatorData } from '../../../public/assets/assets';
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa6";

const NavbarEducator = () => {
  const educator = dummyEducatorData;
  const { user } = useUser();

  return (
    <header className="w-full z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src="../../../public/assets/logo.png" 
              alt="Logo" 
              className="w-24 md:w-28 lg:w-32 h-auto" 
            />
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3 sm:gap-5">
            <p className="text-sm sm:text-base text-gray-700 font-medium hidden sm:block">
              Hey! 😎  {user ? user.fullName : "Developer"}
            </p>
            
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100">
              {user ? (
                <UserButton 
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 sm:w-9 sm:h-9  "
                    }
                  }}
                />
              ) : (
                <FaUserTie className="text-gray-600 text-lg sm:text-xl" />
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarEducator;