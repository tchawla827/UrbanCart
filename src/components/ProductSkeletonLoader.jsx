import React from 'react'

function ProductSkeletonLoader() {
    return (
        <div className="cursor-pointer rounded-md border p-[10px] animate-pulse">
            <div className="aspect-[16/9] h-[200px] w-full rounded-md bg-gray-400"></div>
            <div className="p-4">
                <div className="inline-flex items-center text-lg font-semibold h-[50px] bg-gray-400 rounded w-3/4"></div>
                <div className="mt-3 text-sm text-gray-600 bg-gray-400 h-12 rounded"></div>
                <div className="mt-4">
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-400 px-3 py-1 text-[10px] font-semibold"></span>
                    <br />
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-400 px-3 py-1 text-[10px] font-semibold"></span>
                    <span className="mb-2 mr-2 inline-block rounded-full bg-gray-400 px-3 py-1 text-[10px] font-semibold"></span>
                </div>
                <div className="mt-3 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">Colors : </span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-gray-400"></span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-gray-400"></span>
                    <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-gray-400"></span>
                </div>
                <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">Size : </span>
                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium bg-gray-400"></span>
                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium bg-gray-400"></span>
                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium bg-gray-400"></span>
                </div>
                <div className="mt-4 h-8 bg-black rounded-sm"></div>
            </div>
        </div>
    )
}

export default ProductSkeletonLoader