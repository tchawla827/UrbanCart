import React from 'react';

function Skeleton({ className = '' }) {
  return (
    <div className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className}`}></div>
  );
}

export { Skeleton };
export default Skeleton;
