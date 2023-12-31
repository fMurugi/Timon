'use client'
import React from 'react';
import Sidebar from '../component/documents.js'; // Import the Sidebar component

const DashboardLayout=({children}) =>{
   return (
    <div className="h-screen w-screen relative">
        <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10">
            Documents
            <Sidebar/>
        </aside>
        <div className="ml-[200px] h-full">
            <header className="h-[60px] border-b  border-black/10">  
                <div className="h-full w-full px-6 flex items-center justify-end">
                </div>
            </header>
          
            <div className="h-[clac(100vh-60px)]">{children}</div>
        </div>
        </div>
    )
  
}
export default DashboardLayout;