import React from 'react';
import { Outlet } from 'react-router-dom';
 import EducatorSidebar from '../../components/admin/SideBar';
import NavbarEducator from '../../components/admin/NavbarEducator';

const EducatorLayout = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <EducatorSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavbarEducator />
        
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default EducatorLayout;