import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#54295c] text-white p-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Il sito</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">Corsi</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legale</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Privacy</a></li>
            <li><a href="#" className="hover:text-gray-300">Termini e condizioni</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">FAQ</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Supporto</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Social</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;