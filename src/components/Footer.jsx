import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="inline-flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 180 60"
                                className="text-gray-900 dark:text-white transition-colors duration-200"
                                aria-labelledby="urbanCartFooterTitle"
                                role="img"
                            >
                                <title id="urbanCartFooterTitle">UrbanCart Logo</title>
                                <path d="M30 20h30l10 20H40l-5-10h-5z"
                                    fill="none" stroke="currentColor"
                                    strokeWidth="3" strokeLinejoin="round"
                                />
                                <circle cx="38" cy="40" r="6" fill="currentColor" />
                                <circle cx="62" cy="40" r="6" fill="currentColor" />
                            </svg>
                            <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                                UrbanCart
                            </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                            Your trusted partner for modern shopping experiences. Discover quality products with fast delivery and exceptional service.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="lg:flex lg:justify-center">
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link 
                                        to="/page/1" 
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link 
                                        to="/contact" 
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                    >
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href="#" 
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                                    >
                                        Return Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Social Links & Contact */}
                    <div className="space-y-4 lg:flex lg:flex-col lg:items-end">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                                Follow Us
                            </h3>
                            <div className="flex space-x-3">
                                <a 
                                    href="#" 
                                    aria-label="Follow us on Facebook"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    aria-label="Follow us on Twitter"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                    </svg>
                                </a>
                                <a 
                                    href="#" 
                                    aria-label="Follow us on Instagram"
                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-all duration-200"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.81 3.76 13.299 3.76 11.716c0-1.583.438-3.094 1.366-3.975.875-.807 2.026-1.297 3.323-1.297 1.297 0 2.448.49 3.323 1.297.928.881 1.366 2.392 1.366 3.975 0 1.583-.438 3.094-1.366 3.975-.875.807-2.026 1.297-3.323 1.297zm6.844-6.872c0 .584-.474 1.058-1.058 1.058s-1.058-.474-1.058-1.058.474-1.058 1.058-1.058 1.058.474 1.058 1.058zm2.646 0c0-1.297-.49-2.448-1.297-3.323-.807-.875-1.907-1.366-3.094-1.366s-2.287.491-3.094 1.366c-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.807.875 1.907 1.366 3.094 1.366s2.287-.491 3.094-1.366c.807-.875 1.297-2.026 1.297-3.323z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            © {new Date().getFullYear()} UrbanCart. All rights reserved.
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Made for better shopping experiences
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
