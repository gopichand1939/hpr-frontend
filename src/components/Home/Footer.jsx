import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';

const API = import.meta.env.VITE_API_BASE_URL + '/home/footer';

const Footer = () => {
  const [footer, setFooter] = useState(null);

  const fetchFooter = async () => {
    try {
      const res = await axios.get(API);
      if (res.data && res.data.data) {
        setFooter(res.data.data);
      }
    } catch (err) {
      console.error('Footer fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchFooter();
    const interval = setInterval(fetchFooter, 10000); // Live updates
    return () => clearInterval(interval);
  }, []);

  if (!footer) {
    return (
      <footer className="bg-gray-900 text-white text-center py-8">
        Loading footer...
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-tr from-[#1e1f2b] to-[#111219] text-white pt-16 pb-8 px-6 md:px-20 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Logo and tagline */}
        <div className="flex flex-col items-start">
          {footer.logo && (
            <img
              src={`data:image/png;base64,${footer.logo}`}
              alt="HPR Infra Logo"
              className="h-24 w-auto mb-4 rounded-lg shadow-sm"
            />
          )}
          {footer.tagline && (
            <p className="text-sm text-gray-300 leading-relaxed">{footer.tagline}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Address</h4>
          <p className="text-sm leading-6 whitespace-pre-line text-gray-300">
            {footer.address}
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <p className="text-sm flex items-center gap-2 text-gray-300">
            <FaPhoneAlt className="text-[#56CCF2]" /> {footer.phone}
          </p>
          <p className="text-sm flex items-center gap-2 mt-2 text-gray-300">
            <FaEnvelope className="text-[#56CCF2]" />
            <a
              href={`mailto:${footer.email}`}
              className="hover:text-white underline transition"
            >
              {footer.email}
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Connect With Us</h4>
          <div className="flex gap-4 text-xl">
            <a
              href={footer.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#56CCF2] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href={footer.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E1306C] transition"
            >
              <FaInstagram />
            </a>
            <a
              href={footer.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e76a8] transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 mt-6">
        <p>© {new Date().getFullYear()} HPR Infra LLP. All rights reserved.</p>
        <a
          href="#"
          className="hover:text-white mt-2 md:mt-0 transition underline underline-offset-2"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
