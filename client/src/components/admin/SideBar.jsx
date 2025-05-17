import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import {
  FiHome,
  FiPlusCircle,
  FiBook,
  FiUsers
} from 'react-icons/fi';

const EducatorSidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/educator',
      icon: <FiHome className="text-xl" />,
    },
    {
      name: 'Add Course',
      path: '/educator/add-course',
      icon: <FiPlusCircle className="text-xl" />,
    },
    {
      name: 'My Courses',
      path: '/educator/my-courses',
      icon: <FiBook className="text-xl" />,
    },
    {
      name: 'Students Enrolled',
      path: '/educator/student-enrolled',
      icon: <FiUsers className="text-xl" />,
    },
  ];

  if (!isEducator) return null;

  return (
    <div className="w-full sm:w-64 h-full bg-white shadow-lg border-r border-gray-100">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center h-17 border-b px-4">
        <h2 className="text-xl font-semibold text-gray-800 tracking-wide">
          Educator Panel
        </h2>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3  transition-all duration-300 group ${
                isActive
                  ? 'bg-gradient-to-r from-blue-800 to-blue-900 text-white  font-semibold shadow'
                  : 'text-gray-600 hover:bg-gray-50 hover:shadow hover:text-blue-600'
              }`
            }
          >
            <span
              className="group-hover:scale-110 transition-transform duration-200"
            >
              {item.icon}
            </span>
            <span className="text-base tracking-wide">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default EducatorSidebar;
