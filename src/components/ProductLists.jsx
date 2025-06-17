import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ProductSkeletonLoader from './ProductSkeletonLoader';
import ProductCards from './ProductCards';
import { useSelector } from 'react-redux';

function ProductLists({ addToCart, setCartItems, cartItems, page }) {
    const productData = useSelector((state) => state.product.products);
    const navigate = useNavigate();
    const [allProductData, setAllProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setAllProductData(productData);
        // Add a small delay to show loading transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, productData.length > 0 ? 300 : 0);
        return () => clearTimeout(timer);
    }, [productData]);

    const handleProductClick = (id) => {
        navigate(`/page/product_detail/${id}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("Card Clicked");
    }

    if (allProductData.length === 0 || isLoading) {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                            aria-hidden="true"
                        >
                            <ProductSkeletonLoader />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Our Products
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover our carefully curated collection of premium products
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {allProductData.slice(0, 8 * page).map((item, index) => (
                    <div
                        key={item.id || index}
                        className="group animate-fade-in transform transition-all duration-300 hover:scale-[1.02] focus-within:scale-[1.02]"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="relative">
                            <ProductCards 
                                addToCartToast={addToCart}
                                cartItems={cartItems}
                                setCartItems={setCartItems}
                                item={item}
                                handleProductClick={handleProductClick}
                            />
                            {/* Hover overlay effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Load More Indicator */}
            {allProductData.length > 8 * page && (
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span>Showing {Math.min(8 * page, allProductData.length)} of {allProductData.length} products</span>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {allProductData.length === 0 && !isLoading && (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            We couldn't find any products to display. Please try again later.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductLists

