import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSkeletonLoader from './ProductSkeletonLoader';
import ProductCards from './ProductCards';
import { useSelector } from 'react-redux';

function ProductLists({ addToCart, setCartItems, cartItems, page }) {
    const PAGE_SIZE = 8;

    const productData = useSelector((state) => state.product.products);

    const navigate = useNavigate();
    const [allProductData, setAllProductData] = useState([]);
    useEffect(() => {
        setAllProductData(productData)
    }, [productData])

    const handleProductClick = (id) => {
        navigate(`/page/product_detail/${id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("Card Clicked")
    }

    if (allProductData.length === 0) {
        return (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-800/50 lg:col-span-10 lg:col-start-3 lg:h-full mx-auto grid w-full max-w-full items-center space-y-6 px-8 py-12 md:grid-cols-2 md:gap-8 md:space-y-0 lg:grid-cols-2 xl:grid-cols-4 backdrop-blur-sm">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div
                        key={index}
                        className="opacity-0 animate-pulse"
                        style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: 'forwards',
                        }}
                    >
                        <ProductSkeletonLoader />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-50/30 to-white/80 dark:from-gray-900/30 dark:to-gray-800/50 lg:col-span-10 lg:col-start-3 lg:h-full mx-auto grid w-full max-w-full items-start space-y-6 px-8 py-12 md:grid-cols-2 md:gap-8 md:space-y-0 lg:grid-cols-2 xl:grid-cols-4 backdrop-blur-sm shadow-lg dark:shadow-2xl transition-all duration-500">

                {allProductData.slice(0, PAGE_SIZE * page).map((item, index) => {
                    const delay = (index % PAGE_SIZE) * 100;

                    return (
                        <div
                            key={index}
                            className="opacity-0 translate-y-4 transition-all duration-500 ease-out"
                            style={{
                                animationDelay: `${delay}ms`,
                                animationFillMode: 'forwards',

                                animation: `fadeInUp 0.5s ease-out ${delay}ms forwards`,

                            }}
                        >
                            <ProductCards
                                addToCartToast={addToCart}
                                item={item}
                                handleProductClick={handleProductClick}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }


}

export default ProductLists