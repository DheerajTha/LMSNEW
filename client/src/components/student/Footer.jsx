import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-200 pt-5 pb-2 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-center mb-3">
          
           <div className="">
            <img
              src="/assets/logo.png"
              alt="Logo"
              className="w-32 lg:w-36 cursor-pointer transition-transform duration-300 hover:scale-105"
            />
          </div>
          
           <div className="flex space-x-5">
            <a 
              href="#" 
              aria-label="Facebook" 
              className="bg-gray-100 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaFacebookF size={18} />
            </a>
            <a 
              href="#" 
              aria-label="Twitter" 
              className="bg-gray-100 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-400 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaTwitter size={18} />
            </a>
            <a 
              href="#" 
              aria-label="Instagram" 
              className="bg-gray-100 p-3 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaInstagram size={18} />
            </a>
            <a 
              href="#" 
              aria-label="LinkedIn" 
              className="bg-gray-100 p-3 rounded-full text-gray-600 hover:text-white hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

         <div className="border-t border-gray-200  "></div>

         <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Dheeraj Thakur. All rights reserved.
          </div>
          
          <div className="text-center mt-6 text-xs text-gray-400">
          Designed & Developed with ❤️ by Dheeraj Thakur
        </div>
        </div>

         
      </div>
    </footer>
  );
};

export default Footer;