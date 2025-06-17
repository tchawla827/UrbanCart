import React, { useContext } from 'react'
import { Menu, X, ChevronRight, ShoppingCart, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addProducts } from '../redux/slices/products';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { ThemeContext } from '../ThemeContext.jsx';

const menuItems = [
  { name: 'Home', link: '/page/1' },
  { name: 'Contact', link: '/contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navigate = useNavigate();
  const handleGoToCart = () => navigate("/page/cart");

  const cartItemsCount = useSelector((state) => Object.keys(state.cart.cartItems).length);
  const dispatch = useDispatch();

  const fetchAllData = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=0`);
      const jsonData = await response.json();
      dispatch(addProducts(jsonData.products));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (value) => fetchAllData(value);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo & Brand */}
        <div className="inline-flex items-center space-x-2">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 180 60"
              className="text-gray-900 dark:text-white transition-colors duration-200"
              aria-labelledby="urbanCartTitle"
              role="img"
            >
              <title id="urbanCartTitle">UrbanCart Logo</title>
              <path d="M30 20h30l10 20H40l-5-10h-5z"
                fill="none" stroke="currentColor"
                strokeWidth="3" strokeLinejoin="round"
              />
              <circle cx="38" cy="40" r="6" fill="currentColor" />
              <circle cx="62" cy="40" r="6" fill="currentColor" />
            </svg>
          </div>
          <span className="font-bold text-xl text-gray-900 dark:text-white transition-colors duration-200">
            UrbanCart
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:items-center lg:space-x-8">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              to={item.link} 
              className="relative text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-green-600 dark:after:bg-green-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full h-10 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent transition-all duration-200"
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Cart Button */}
          <button
            onClick={handleGoToCart}
            type="button"
            className="relative p-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            aria-label={`Shopping cart with ${cartItemsCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-green-500 text-white text-xs font-semibold flex items-center justify-center animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* Login/Logout Button */}
          <button
            onClick={handleLogout}
            type="button"
            className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            type="button"
            className="p-2.5 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? 
              <Sun className="h-5 w-5 text-yellow-500" /> : 
              <Moon className="h-5 w-5 text-gray-700" />
            }
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleMenu}
          />
          <div className={`fixed right-0 top-0 h-full w-80 max-w-sm transform bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex h-full flex-col">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 180 60"
                    className="text-gray-900 dark:text-white"
                  >
                    <path d="M30 20h30l10 20H40l-5-10h-5z"
                      fill="none" stroke="currentColor"
                      strokeWidth="3" strokeLinejoin="round"
                    />
                    <circle cx="38" cy="40" r="6" fill="currentColor" />
                    <circle cx="62" cy="40" r="6" fill="currentColor" />
                  </svg>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">UrbanCart</span>
                </div>
                <button
                  onClick={toggleMenu}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <nav className="flex-1 px-6 py-6 space-y-2">
                {menuItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.link} 
                    onClick={toggleMenu}
                    className="flex items-center justify-between p-3 text-base font-semibold text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {isLoggedIn ? "Signed in" : "Not signed in"}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm font-semibold rounded-full hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    {isLoggedIn ? "Logout" : "Login"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
