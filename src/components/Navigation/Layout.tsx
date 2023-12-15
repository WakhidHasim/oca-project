// Layout.tsx
import React, {useEffect, useState} from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from '../../pages/Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
 const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)'); 
        const handleResize = () => {
        if (!mediaQuery.matches) {
            setIsSidebarOpen(true); 
        } else {
            setIsSidebarOpen(false); 
        }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        
        return () => window.removeEventListener('resize', handleResize);
    }, []);


  return (
    <>
        <div className="flex">
            <Navbar toggleSidebar={toggleSidebar} />
            {isSidebarOpen && <Sidebar />}
        </div>
        <div className='bg-gray-100'>
           {children}
            
            <div>
              <Footer />
            </div>
        </div>
        
       
    </>
    
  );
};

export default Layout;
