import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";

const blogIconSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-8 w-8 sm:h-10 sm:w-10 text-sky-400"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

const socialIcons = [
  { name: "Twitter", url: "https://twitter.com", icon: <FaTwitter className="text-lg sm:text-xl" /> },
  { name: "Facebook", url: "https://facebook.com", icon: <FaFacebookF className="text-lg sm:text-xl" /> },
  { name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedinIn className="text-lg sm:text-xl" /> },
  { name: "GitHub", url: "https://github.com", icon: <FaGithub className="text-lg sm:text-xl" /> },
];

const footer_data = [
  {
    title: "Discover",
    links: [
      { name: "All Posts", url: "/posts" },
      { name: "Popular", url: "/popular" },
      { name: "Authors", url: "/authors" },
      { name: "Categories", url: "/categories" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Our Mission", url: "/mission" },
      { name: "Contact", url: "/contact" },
      { name: "Careers", url: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help Center", url: "/help" },
      { name: "Start Writing", url: "/create-post" },
      { name: "Community", url: "/community" },
      { name: "Style Guide", url: "/style-guide" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300 relative z-10 font-sans">
      <div className="bg-gray-900/50 px-4 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-16 shadow-inner border-t-2 border-gray-800">
        <div className="flex flex-col lg:flex-row justify-between gap-4 xs:gap-4 lg:gap-8 pb-10">
          <div className="w-full lg:max-w-md">
            <div className="flex items-center gap-2 sm:gap-3 mb-4">
              {blogIconSvg}
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">
                BlogPulse
              </span>
            </div>

            <p className="text-gray-400 text-sm sm:text-xl leading-relaxed mb-6 w-full">
              BlogPulse is your platform for sharing stories, insights, and
              ideas. We provide a clean, simple, and powerful space for writers
              and readers to connect.
            </p>

            <div className="flex gap-4 sm:gap-4 flex-wrap">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 transition-colors duration-300"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column (Links) */}
          <div className="grid grid-cols-3 xs:grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 w-full lg:w-auto">
            {footer_data.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-3 border-b-2 border-blue-500/50 pb-1 inline-block">
                  {section.title}
                </h3>
                <ul className="space-t-1 sm:space-t-2 md:space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link
                        to={link.url}
                        className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-lg hover:text-white transition-colors hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-2 sm:pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-center md:text-left">
          <p className="text-gray-500 text-xs sm:text-sm lg:text-lg">
            &copy; {new Date().getFullYear()} BlogPulse | All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
            <Link
              to="/privacy"
              className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm lg:text-lg transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm lg:text-lg transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-500 hover:text-gray-300 text-xs sm:text-sm lg:text-lg transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
