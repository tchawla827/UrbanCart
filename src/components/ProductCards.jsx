import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cart';
import { useNavigate } from 'react-router-dom';

function ProductCards({ handleProductClick, item, addToCartToast }) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const tempCartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const addItemToCart = (e, item) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      if (tempCartItems[item.id]) {
        let tempQuantity = tempCartItems[item.id].quantity;
        dispatch(
          addToCart({
            data: item,
            quantity: tempQuantity + 1,
            id: item.id,
            totalAmount: item.price / (1 - item.discountPercentage / 100),
            discountAmount:
              (item.price * (item.discountPercentage / 100)) /
              (1 - item.discountPercentage / 100),
            finalAmount: item.price,
          })
        );
        addToCartToast();
      } else {
        addToCartToast();
        dispatch(
          addToCart({
            data: item,
            quantity: 1,
            id: item.id,
            totalAmount: item.price / (1 - item.discountPercentage / 100),
            discountAmount:
              (item.price * (item.discountPercentage / 100)) /
              (1 - item.discountPercentage / 100),
            finalAmount: item.price,
          })
        );
      }
    }
  };

  return (
    <div
      onClick={() => {
        handleProductClick(item.id);
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:-translate-y-1"
    >
      {/* Image Section with Enhanced Overlay */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="aspect-[4/3] w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

        {/* Floating Badge */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-white shadow-lg">
            ${item.price}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Title and Description */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[3.5rem] leading-tight tracking-tight">
            {item.title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Enhanced Badges */}
        <div className="flex flex-wrap gap-2.5">
          <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 px-3.5 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-700/50">
            {item.brand}
          </span>
          <span className="inline-flex items-center rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-3.5 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-600/50">
            {item.category}
          </span>
        </div>

        {/* Enhanced Color Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Colors</span>
          <div className="flex gap-2.5">
            {[
              { color: 'bg-red-400', ring: 'hover:ring-red-300' },
              { color: 'bg-purple-400', ring: 'hover:ring-purple-300' },
              { color: 'bg-orange-400', ring: 'hover:ring-orange-300' },
            ].map((colorOption, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full ${colorOption.color} border-2 border-white dark:border-gray-700 shadow-lg cursor-pointer hover:scale-125 ${colorOption.ring} hover:ring-4 transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Size Selection */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">Size</span>
          <div className="flex gap-2">
            {['8 UK', '9 UK', '10 UK'].map((size) => (
              <span
                key={size}
                className="cursor-pointer rounded-lg border-2 border-gray-200 dark:border-gray-600 px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Add to Cart Button */}
        <button
          onClick={(e) => {
            addItemToCart(e, item);
          }}
          type="button"
          aria-label={`Add ${item.title} to cart`}
          className="w-full rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 px-6 py-4 text-sm font-bold text-white shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-gray-500 transition-all duration-300 active:scale-98 hover:scale-[1.02] transform"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCards;
