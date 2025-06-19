import React from 'react';

const ProductDetailsSkeleton = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 animate-pulse">
      <div className="pt-8">
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
        </div>
      </div>
      
      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          <div className="col-span-2 h-96 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
          <div className="h-48 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
        
        <div className="col-span-4 pt-8 lg:pt-0 space-y-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
            <div className="flex items-center space-x-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-32"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
