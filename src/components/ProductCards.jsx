import React from 'react'
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
            navigate("/login");
        }
        else {
            if (tempCartItems[item.id]) {
                let tempQuantity = tempCartItems[item.id].quantity;
                dispatch(addToCart({ data: item, quantity: tempQuantity + 1, id: item.id, totalAmount: (item.price) / (1 - (item.discountPercentage / 100)), discountAmount: (item.price * (item.discountPercentage / 100)) / (1 - (item.discountPercentage / 100)), finalAmount: item.price }));
                addToCartToast();
            }
            else {
                addToCartToast();
                dispatch(addToCart({ data: item, quantity: 1, id: item.id, totalAmount: (item.price) / (1 - (item.discountPercentage / 100)), discountAmount: (item.price * (item.discountPercentage / 100)) / (1 - (item.discountPercentage / 100)), finalAmount: item.price }));
            }
        }
    }

    return (
        <div 
            onClick={() => { handleProductClick(item.id) }} 
            className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
            <div className="relative overflow-hidden">
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[3.5rem] mb-2">
                    {item.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
                    {item.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-900/30 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-300">
                        {item.brand}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-gray-50 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
                        {item.category}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/30 px-3 py-1 text-xs font-medium text-green-700 dark:text-green-300">
                        ${item.price}
                    </span>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Colors:</span>
                    <div className="flex gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-400 border-2 border-white dark:border-gray-600 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                        <div className="w-5 h-5 rounded-full bg-purple-400 border-2 border-white dark:border-gray-600 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                        <div className="w-5 h-5 rounded-full bg-orange-400 border-2 border-white dark:border-gray-600 shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Size:</span>
                    <div className="flex gap-2">
                        {['8 UK', '9 UK', '10 UK'].map((size) => (
                            <span 
                                key={size}
                                className="cursor-pointer rounded-lg border border-gray-200 dark:border-gray-600 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                {size}
                            </span>
                        ))}
                    </div>
                </div>
                
                <button
                    onClick={(e) => { addItemToCart(e, item) }}
                    type="button"
                    aria-label={`Add ${item.title} to cart`}
                    className="w-full rounded-lg bg-gray-900 dark:bg-gray-700 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 dark:hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:focus-visible:outline-gray-500 transition-colors duration-200 active:scale-95"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCards
