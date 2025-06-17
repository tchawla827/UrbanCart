import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductSkeletonLoader from './ProductSkeletonLoader';
import ProductCards from './ProductCards';
import { useSelector } from 'react-redux';

function ProductLists({ addToCart, setCartItems, cartItems, page }) {
  const productData = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const [allProductData, setAllProductData] = useState([]);

  useEffect(() => {
    setAllProductData(productData);
  }, [productData]);

  const handleProductClick = (id) => {
    navigate(`/page/product_detail/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log('Card Clicked');
  };

  if (allProductData.length === 0) {
    return (
      <div className="relative">
        <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 backdrop-blur-sm lg:col-span-10 lg:col-start-3 lg:h-full mx-auto p-8 md:p-10 lg:p-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
              >
                <ProductSkeletonLoader />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-900 backdrop-blur-sm lg:col-span-10 lg:col-start-3 lg:h-full mx-auto p-8 md:p-10 lg:p-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 auto-rows-fr">
          {allProductData.slice(0, 8 * page).map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in opacity-0 hover:scale-[1.02] transition-all duration-300"
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <ProductCards
                addToCartToast={addToCart}
                cartItems={cartItems}
                setCartItems={setCartItems}
                item={item}
                handleProductClick={handleProductClick}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductLists;
