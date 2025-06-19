import React, { useContext, useState, useCallback } from 'react';
import { Menu, X, ChevronRight, ShoppingCart, Sun, Moon, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts } from '../redux/slices/products';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { ThemeContext } from '../ThemeContext.jsx';

const menuItems = [
  { name: 'Home', link: '/page/1' },
  { name: 'Contact', link: '/contact' },
];

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const cartItemsCount = useSelector((state) => Object.keys(state.cart.cartItems).length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const handleGoToCart = useCallback(() => {
    navigate('/page/cart');
  }, [navigate]);

  const fetchAllData = async (query) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=0`);
      const jsonData = await response.json();
      dispatch(setProducts(jsonData.products));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
    fetchAllData(value);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200/20 dark:border-gray-700/20 transition-colors duration-200">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">

            {/* Logo & Brand */}
            <Link to="/" className="group flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-green-500/20 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-0 group-hover:opacity-100" />
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-xl shadow-lg">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  UrbanCart
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Modern Shopping
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="group relative px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300"
                >
                  <span className="relative z-10">{item.name}</span>
                  <div className="absolute inset-0 bg-green-50 dark:bg-green-900/20 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                </Link>
              ))}
            </nav>

            {/* Enhanced Search Bar */}
            <div className="flex-1 max-w-md mx-4 lg:mx-8">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-green-500 transition-colors duration-200" />
                <input
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 rounded-full text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 dark:focus:border-green-400 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  type="text"
                  placeholder="Search products..."
                  aria-label="Search products"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Cart Button */}
              <button
                onClick={handleGoToCart}
                type="button"
                className="relative group bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 border-gray-900 dark:border-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 hover:scale-105 transition-all duration-200 rounded-full p-2.5"
                aria-label={`Shopping cart with ${cartItemsCount} items`}
              >
                <ShoppingCart className="h-4 w-4" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-pulse">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-full bg-green-500/20 scale-0 group-hover:scale-110 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
              </button>

              {/* Login/Logout Button */}
              <button
                onClick={handleLogout}
                type="button"
                className="hidden sm:flex px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 border-transparent hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-300 transition-all duration-200 rounded-full font-semibold text-xs shadow-lg hover:shadow-xl hover:scale-105"
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                type="button"
                className="p-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 rounded-full group hover:scale-105"
                aria-label="Toggle theme"
              >
                <div className="relative">
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4 text-yellow-500 group-hover:rotate-180 transition-transform duration-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:-rotate-12 transition-transform duration-300" />
                  )}
                </div>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={toggleMenu}
                type="button"
                className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-full"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={toggleMenu}
          />

          {/* Mobile Menu Panel */}
          <div className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] transform bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex h-full flex-col">

              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
                    <ShoppingCart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">UrbanCart</span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Modern Shopping</p>
                  </div>
                </div>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 rounded-full"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.name}
                    to={item.link}
                    onClick={toggleMenu}
                    className="group flex items-center justify-between p-4 text-base font-semibold text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 dark:hover:from-green-900/10 dark:hover:to-green-800/10 transition-all duration-200 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200">
                      {item.name}
                    </span>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-200" />
                  </Link>
                ))}

                {/* Mobile Search */}
                <div className="pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl"
                      placeholder="Search products..."
                    />
                  </div>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {isLoggedIn ? 'U' : '?'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {isLoggedIn ? 'Welcome back!' : 'Guest User'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isLoggedIn ? 'Signed in' : 'Not signed in'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    type="button"
                    className="flex-1 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-200 dark:hover:to-gray-300 transition-all duration-200 rounded-xl font-semibold shadow-lg"
                  >
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </button>

                  <button
                    onClick={handleGoToCart}
                    type="button"
                    className="relative px-4 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;

