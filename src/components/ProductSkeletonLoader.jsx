import React from 'react';
import { Skeleton } from './ui/skeleton';

function ProductSkeletonLoader() {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Skeleton className="aspect-[4/3] w-full h-[200px]" />
      </div>

      <div className="p-6 space-y-5">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full" />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="w-4 h-4 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-8" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-8 rounded-md" />
            <Skeleton className="h-6 w-8 rounded-md" />
            <Skeleton className="h-6 w-8 rounded-md" />
          </div>
        </div>

        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
}

export default ProductSkeletonLoader;
