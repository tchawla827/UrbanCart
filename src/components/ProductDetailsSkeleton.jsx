import React from 'react'

function ProductDetailsSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
            <div className="pt-8">
                <div className="flex items-center">
                    <ol className="flex w-full items-center overflow-hidden">
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a href="#">Home</a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                products
                            </a>
                        </li>
                        <li className="text-body mt-0.5 text-base">/</li>
                        <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
                            <a className="capitalize" href="#">
                                {/* Placeholder for category */}
                            </a>
                        </li>
                    </ol>
                </div>
            </div>
            <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
                <div className="col-span-5 grid grid-cols-2 gap-2.5">
                    {/* Placeholder for images */}
                    <div className="animate-pulse col-span-2 transition duration-150 ease-in hover:opacity-90">
                        <div className="bg-gray-300 w-full h-96" />
                    </div>
                </div>
                <div className="col-span-4 pt-8 lg:pt-0">
                    <div className="mb-7 border-b border-gray-300 pb-7">
                        {/* Placeholder for title */}
                        <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
                            <div className="animate-pulse space-y-2">
                                <div className="h-10 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        </h2>
                        {/* Placeholder for description */}
                        {/* <p className="text-body text-sm leading-6  lg:text-base lg:leading-8"> */}
                        <div className="animate-pulse space-y-2">
                            <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-100 rounded"></div>
                            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-100 rounded"></div>
                            <div className="h-4 bg-gray-100 rounded w-1/3"></div>
                        </div>
                        {/* </p> */}
                        <div className="mt-5 flex items-center">
                            <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                                {/* Placeholder for price */}
                            </div>
                            {/* Placeholder for discounted price */}
                            <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                                {/* Placeholder for discounted price */}
                            </span>
                        </div>
                    </div>
                    <div className="border-b border-gray-300 pb-3">
                        <div className="animate-pulse mb-4">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">size</h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {/* Placeholder for size options */}
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <li
                                        key={index}
                                        className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                                    >
                                        <div className="bg-gray-200 w-full h-full" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="animate-pulse mb-4">
                            <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">color</h3>
                            <ul className="colors -mr-3 flex flex-wrap">
                                {/* Placeholder for color options */}
                                {Array.from({ length: 4 }).map((_, index) => (
                                    <li
                                        key={index}
                                        className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                                    >
                                        <div className="bg-gray-200 w-full h-full" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
                        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
                            {/* Placeholder for quantity buttons */}
                            <div className="bg-gray-200 h-full w-10" />
                            <span className="duration-250 text-heading flex h-full w-12  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                                {/* Placeholder for quantity */}
                            </span>
                            <div className="bg-gray-200 h-full w-10" />
                        </div>
                        <button
                            type="button"
                            className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            {/* Placeholder for add to cart button */}
                        </button>
                    </div>
                    <div className="py-6">
                        <ul className="space-y-5 pb-1 text-sm">
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">SKU:</span>
                                {/* Placeholder for SKU */}
                            </li>
                            <li>
                                <span className="text-heading inline-block pr-2 font-semibold">Category:</span>
                                <a className="hover:text-heading transition hover:underline" href="#">
                                    {/* Placeholder for category */}
                                </a>
                            </li>
                            <li className="productTags">
                                <span className="text-heading inline-block pr-2 font-semibold">Tags:</span>
                                {/* Placeholder for tags */}
                            </li>
                        </ul>
                    </div>
                    <div className="shadow-sm">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Product Details
                            </h2>
                            <div className="relative flex h-4 w-4 flex-shrink-0 items-center justify-center">
                                <div className="bg-heading h-0.5 w-full rounded-sm" />
                                <div className="bg-heading absolute bottom-0 h-full w-0.5 origin-bottom scale-0 transform rounded-sm transition-transform duration-500 ease-in-out" />
                            </div>
                        </header>
                        <div>
                            <div className="pb-6 text-sm leading-7 text-gray-600 md:pb-7">
                                {/* Placeholder for product details */}
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Additional Information
                            </h2>
                        </header>
                    </div>
                    <div className="">
                        <header className="flex cursor-pointer items-center justify-between border-t border-gray-300 py-5 transition-colors md:py-6">
                            <h2 className="text-heading pr-2 text-sm font-semibold leading-relaxed md:text-base lg:text-lg">
                                Customer Reviews
                            </h2>
                        </header>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsSkeleton