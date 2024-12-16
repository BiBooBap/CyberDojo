import React from "react";
import "../index.css";

// Footer component
const Footer = () => {

  return (
    <footer className="bg-[#54295c] text-white p-6 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Il sito</h3>
          <ul className="space-y-2">
            <li>
              <a href="/homepage" className="hover:text-gray-300">
                Home
              </a>
            </li>
            <li>
              <a href="/homepage" className="hover:text-gray-300">
                Corsi
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Legale</h3>
          <ul className="space-y-2">
            <li>
              <a href="/privacy" className="hover:text-gray-300">
                Privacy
              </a>
            </li>
            <li>
              <a href="/termAndCondition" className="hover:text-gray-300">
                Termini e condizioni
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">FAQ</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://web.unisa.it/servizi-on-line/helpdesk" className="hover:text-gray-300">
                Supporto
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Social</h3>
          <div className="flex space-x-4">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" className="hover:text-gray-300">
              <img src="/img/facebook.png" alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/sesa_lab?igsh=MWIybnEyd3FnbW1wdQ==" className="hover:text-gray-300">
              <img src="/img/insta.png" alt="Instagram" className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/dinfunisa?igsh=MWFpeWd5M2V3ZTVqMw==" className="hover:text-gray-300">
              <img src="/img/logox.png" alt="Twitter" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
