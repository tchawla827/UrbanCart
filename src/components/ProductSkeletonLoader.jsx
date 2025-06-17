import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function ProductSkeletonLoader() {
  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="relative overflow-hidden rounded-t-2xl">
        <Skeleton className="aspect-[4/3] w-full" />
      </div>

      <div className="p-6 space-y-5">
        <div className="space-y-3">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="flex flex-wrap gap-2.5">
          <Skeleton className="h-6 w-16 rounded-xl" />
          <Skeleton className="h-6 w-20 rounded-xl" />
          <Skeleton className="h-6 w-14 rounded-xl" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-12" />
          <div className="flex gap-2.5">
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
            <Skeleton className="w-6 h-6 rounded-full" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-4 w-8" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-12 rounded-lg" />
            <Skeleton className="h-8 w-12 rounded-lg" />
            <Skeleton className="h-8 w-12 rounded-lg" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export default ProductSkeletonLoader;
