import React, { useEffect, useRef, useState} from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  //if User is Logged In 
  let isLogIn = useRef(false);

  // const isusername= localStorage.getItem('username');

    let isToken = localStorage.getItem('token');

    useEffect(() => {
      if(isToken){
      isLogIn.current = true;
      }
    }, []);

    const LogOutHandler = () => {
      localStorage.removeItem('token');
      isLogIn.current = false;
    }



  return (
      <nav className="bg-gray-800 text-white m-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="/army.ico" alt="army" className="w-12 h-auto" /> 
            </div>
            <div className="hidden md:flex space-x-6">
              <p href="#home" className="hover:text-white-300 transition"> <Link to={'/'}> Home </Link></p>
              <a href="#about" className="hover:text-white-300 transition">About</a>
              <a href="#contact" className="hover:text-white-300 transition">Contact</a>

              {isLogIn.current? 
              (<p href="#logout" className="hover:text-white-300 transition" onClick={LogOutHandler}>Logout </p>)
              :
              (<p href="#Login" className="hover:text-white-300 transition"><Link to={'/Login'}> Login </Link></p>)
              }
              
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-300 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <p href="#home" className="block text-gray-200 hover:text-white"><Link to={'/'}>Home</Link></p>
            <a href="#about" className="block text-gray-200 hover:text-white">About</a>
            <a href="#contact" className="block text-gray-200 hover:text-white">Contact</a>
            <p href="#login" className="block text-gray-200 hover:text-white"><Link to={'/Login'}>Login</Link></p>
          </div>
        )}
      </nav>
  );
};

export default Navbar;
