import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left - Logo / Name */}
          <div className="text-lg font-semibold mb-4 md:mb-0">
            © {new Date().getFullYear()} MyCompany. All rights reserved.
          </div>

          {/* Right - Links */}
          <div className="flex space-x-6">
            <a href="/privacy" className="hover:text-white transition">Privacy</a>
            <a href="/terms" className="hover:text-white transition">Terms</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
