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
    <div className="relative w-full bg-white dark:bg-gray-800">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        
        {/* ✅ Enlarged SVG Logo & Reduced Space Between Name & Logo */}
        <div className="inline-flex items-center space-x-1">  {/* Reduced space */}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"  // Increased width
              height="100" // Increased height
              viewBox="0 0 180 60"
              className="text-black scale-125" // Slight scale increase for better visibility
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
          </span>
          <span className="font-bold text-lg dark:text-white">UrbanCart</span>  {/* Reduced text size slightly */}
        </div>

        <div className="hidden lg:block">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.link} className="text-sm font-semibold text-gray-800 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex grow justify-end">
          <input
            onChange={(e) => handleSearch(e.target.value)}
            className="h-10 w-[250px] rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-600 dark:placeholder:text-gray-300 focus:ring-1 focus:ring-black/30"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* CART BUTTON */}
        <button
          onClick={handleGoToCart}
          type="button"
          className="relative ml-8 bg-black dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-white rounded-full shadow-sm hover:bg-black/80 dark:hover:bg-gray-600"
        >
          <ShoppingCart />
          {cartItemsCount > 0 && (
            <span className="absolute w-[20px] h-[20px] top-[-5px] right-[-5px] rounded-full bg-green-500 text-white text-xs text-center">
              {cartItemsCount}
            </span>
          )}
        </button>

        {/* LOGIN / LOGOUT BUTTON */}
        <button
          onClick={handleLogout}
          type="button"
          className="ml-8 bg-black dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-white rounded-full shadow-sm hover:bg-black/80 dark:hover:bg-gray-600"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </button>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          type="button"
          className="ml-4 rounded-full p-2 bg-gray-200 dark:bg-gray-700"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* MOBILE MENU TOGGLE */}
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 p-2 transform lg:hidden">
            <div className="divide-y-2 divide-gray-50 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                        viewBox="0 0 180 60"
                        className="text-black scale-125"
                      >
                        <path d="M30 20h30l10 20H40l-5-10h-5z"
                          fill="none" stroke="currentColor"
                          strokeWidth="3" strokeLinejoin="round"
                        />
                        <circle cx="38" cy="40" r="6" fill="currentColor" />
                        <circle cx="62" cy="40" r="6" fill="currentColor" />
                      </svg>
                    </span>
                    <span className="font-bold text-lg dark:text-white">UrbanCart</span>
                  </div>
                  <button
                    onClick={toggleMenu}
                    className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 dark:hover:bg-gray-700"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <Link key={item.name} to={item.link} className="flex items-center p-3 text-sm font-semibold rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
                        <span className="ml-3 text-gray-900 dark:text-gray-200">{item.name}</span>
                        <ChevronRight className="ml-3 h-4 w-4" />
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
