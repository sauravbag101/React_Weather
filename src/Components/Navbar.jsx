import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { title: 'Home', href: '#', active: true },
    { title: 'About', href: '#', active: false },
    { title: 'Services', href: '#', active: false },
    { title: 'Contact', href: '#', active: false },
    { title: 'Feedback', href: '#', active: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className=" h-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full border-y-2  border-slate-200 mt-4 ">
            {/* Logo */}



            <div className="text-black text-2xl font-bold font-serif font-light ">
              The Black house
            </div>
           
            <div className="hidden lg:flex relative w-20 h-20 rounded-full border-[20px] border-white items-center justify-center ml-[200px]">
  <img src="" alt="Logo" className="absolute w-10 h-10 rounded-full z-10" />
</div>
<div className="hidden lg:flex font-Helvetica space-x-2">
  <div className="py-3">
    <div className=" border-blue-800">Administration</div>
  </div>
  <div className="py-3">
    <div className=" border-blue-800">Today News</div>
  </div>
  <div className="py-3">
    <div className=" border-blue-800">Previous News</div>
  </div>
  <div className="py-3">
    <div className=" border-blue-800">Hot Lines</div>
  </div>
  <div className="py-3">
    <div className=" border-blue-800">Trending</div>
  </div>
</div>








            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black p-2 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Navigation */}
            {/* <ul className="hidden md:flex space-x-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`text-black uppercase text-sm px-3 py-2 rounded-md transition-colors duration-500
                      ${item.active ? 'bg-blue-400' : 'hover:bg-blue-400'}`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul> */}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden fixed inset-0 top-20 bg-gray-800 transition-transform duration-500 ease-in-out transform
              ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <ul className="z-100 flex flex-col items-center pt-10 space-y-12">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className={`text-white text-xl uppercase px-3 py-2 transition-colors duration-500
                      ${item.active ? 'text-blue-500' : 'hover:text-blue-500'}`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}>
      </main>
    </div>
   
    
  );
};

export default Navbar;