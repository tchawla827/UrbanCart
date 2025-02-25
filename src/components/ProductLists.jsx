import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ProductSkeletonLoader from './ProductSkeletonLoader';
import ProductCards from './ProductCards';
import { useSelector } from 'react-redux';

function ProductLists({ addToCart, setCartItems, cartItems, page }) {

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
            <div className="rounded-lg border-2 border-dashed lg:col-span-10 lg:col-start-3 lg:h-full mx-auto grid w-full max-w-full items-center space-y-4 px-10 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-2 xl:grid-cols-4">
                {
                    Array.from({ length: 10 }).map((_, index) => (
                        <ProductSkeletonLoader key={index} />
                    ))
                }

            </div>
        )
    }
    else {
        return (
            <div className="rounded-lg border-2 border-dashed lg:col-span-10 lg:col-start-3 lg:h-full mx-auto grid w-full max-w-full items-center space-y-4 px-10 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-2 xl:grid-cols-4">
                {allProductData.slice(0, 8 * page).map((item, index) =>
                (
                    <ProductCards addToCartToast={addToCart} key={index} cartItems={cartItems} setCartItems={setCartItems} item={item} handleProductClick={handleProductClick} />
                )
                )}
            </div>
        )
    }


}

export default ProductLists