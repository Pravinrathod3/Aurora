import React from 'react';
import Logo from '../assets/logo.png';
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: 'About Us', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '#' },
  ];

  const resources = [
    'SEO Services',
    'PPC Marketing',
    'Social Media',
    'Web Design',
  ];

  const socialMedia = [
    { icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
    { icon: Instagram, label: 'Instagram', color: 'text-pink-500' },
    { icon: Twitter, label: 'Twitter', color: 'text-blue-400' },
    { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700' },
    { icon: Youtube, label: 'YouTube', color: 'text-red-600' },
  ];

  return (
    <footer className="bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-y-12 gap-x-8 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-5">
            <img src={Logo} alt="Company Logo" className="h-20 w-auto" />
            <p className="text-gray-600 text-base max-w-md leading-relaxed">
              Subscribe to our newsletter for updates and insights delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 text-sm rounded-sm w-full sm:w-auto focus:outline-none focus:border-[#FF3E54]"
              />
              <button className="px-6 py-2 bg-[#FF3E54] text-white rounded-sm hover:bg-red-600 transition text-sm font-medium">
                Join
              </button>
            </div>
            <p className="text-sm text-gray-500">We respect your privacy. Read our policy for more details.</p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Useful Links</h4>
            <ul className="space-y-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 text-sm hover:text-gray-900 transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Resources</h4>
            <ul className="space-y-3">
              {resources.map((res, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-600 text-sm hover:text-gray-900 transition"
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Connect With Us</h4>
            <div className="space-y-3">
              {socialMedia.map(({ icon: Icon, label, color }, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center group"
                >
                  <Icon
                    size={20}
                    className={`text-[#FF3E54] group-hover:${color} transition mr-3`}
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 transition">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col lg:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {currentYear} Osumare. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
