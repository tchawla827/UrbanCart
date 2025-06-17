import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200/50 dark:border-gray-700/50 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
          {/* Brand Section */}
          <div className="space-y-6 lg:max-w-sm">
            <div className="group flex items-center space-x-3">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-green-500/10 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-2.5 rounded-xl shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 180 60"
                    className="text-white"
                    aria-labelledby="urbanCartFooterTitle"
                    role="img"
                  >
                    <title id="urbanCartFooterTitle">UrbanCart Logo</title>
                    <path
                      d="M30 20h30l10 20H40l-5-10h-5z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                    <circle cx="38" cy="40" r="6" fill="currentColor" />
                    <circle cx="62" cy="40" r="6" fill="currentColor" />
                  </svg>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  UrbanCart
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Modern Shopping
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Your trusted partner for modern shopping experiences. Discover quality products with fast delivery and exceptional service that puts customers first.
            </p>
            <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Serving customers worldwide since 2024</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:flex lg:justify-center">
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/page/1"
                    className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                  >
                    <span className="relative">
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                  >
                    <span className="relative">
                      Contact Us
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                  >
                    <span className="relative">
                      Privacy Policy
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                  >
                    <span className="relative">
                      Terms of Service
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="group inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                  >
                    <span className="relative">
                      Return Policy
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-500 group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Links & Contact */}
          <div className="space-y-6 lg:flex lg:flex-col lg:items-end">
            <div className="lg:text-right">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4 lg:justify-end">
                <a
                  href="#"
                  aria-label="Follow us on Facebook"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50 dark:hover:from-green-900/20 dark:hover:to-green-800/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:scale-110 transition-transform duration-200"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Follow us on Twitter"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50 dark:hover:from-green-900/20 dark:hover:to-green-800/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:scale-110 transition-transform duration-200"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="Follow us on Instagram"
                  className="group flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gradient-to-br hover:from-green-100 hover:to-green-50 dark:hover:from-green-900/20 dark:hover:to-green-800/20 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:scale-110 transition-transform duration-200"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.81 3.76 13.299 3.76 11.716c0-1.583.438-3.094 1.366-3.975.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928.881 1.366 2.392 1.366 3.975 0 1.583-.438 3.094-1.366 3.975-.875.807-2.026 1.297-3.323 1.297zm6.844-6.872c0 .584-.474 1.058-1.058 1.058s-1.058-.474-1.058-1.058.474-1.058 1.058-1.058 1.058.474 1.058 1.058zm2.646 0c0-1.297-.49-2.448-1.297-3.323-.807-.875-1.907-1.366-3.094-1.366s-2.287.491-3.094 1.366c-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.807.875 1.907 1.366 3.094 1.366s2.287-.491 3.094-1.366c.807-.875 1.297-2.026 1.297-3.323z" />
                  </svg>
                </a>
              </div>
              <div className="mt-8 space-y-2 lg:text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Ready to start shopping?
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Join thousands of satisfied customers
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-gray-200/50 dark:border-gray-700/50 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {new Date().getFullYear()} UrbanCart. All rights reserved.
              </p>
              <div className="hidden md:block w-1 h-1 bg-gray-400 rounded-full" />
              <p className="hidden md:block text-sm text-gray-500 dark:text-gray-500">
                Version 1.0
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Made for better shopping experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
