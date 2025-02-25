import React from 'react'
import { useSelector } from 'react-redux'
import OrderDetailscard from '../components/OrderDetailscard';
import { useParams } from 'react-router-dom';

export const Thankyou = () => {
    const products = useSelector((state) => state.cart.cartItems);
    const finalAmount = useSelector((state) => state.cart.finalAmount);
    const { payment_id } = useParams()
    return (
        <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0 h-[100vh]">
            <h2 className="text-3xl font-bold">Thank you for purchasing</h2>
            <div className="mt-3 text-sm">
                Check the status of recent and old orders & discover more products
            </div>
            <div className="mt-8 flex flex-col overflow-hidden rounded-lg border border-gray-300 md:flex-row">
                <div className="w-full border-r border-gray-300 bg-gray-100 md:max-w-xs">
                    <div className="p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1">
                            {/* {[
                                ['Order ID', '#74557994327'],
                                ['Date', '4 March, 2023'],
                                ['Total Amount', '₹84,499'],
                                ['Order Status', 'Confirmed'],
                            ].map(([key, value]) => (
                                <div key={key} className="mb-4">
                                    <div className="text-sm font-semibold">{key}</div>
                                    <div className="text-sm font-medium text-gray-700">{value}</div>
                                </div>
                            ))} */}
                            <div className="mb-4">
                                <div className="text-sm font-semibold">Order ID</div>
                                <div className="text-sm font-medium text-gray-700">#{payment_id}</div>
                            </div>
                            <div className="mb-4">
                                <div className="text-sm font-semibold">Total Amount</div>
                                <div className="text-sm font-medium text-gray-700">₹{finalAmount}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="p-8">
                        <ul className="-my-7 divide-y divide-gray-200">
                            {Object.keys(products).map((product) => (
                                <OrderDetailscard product={products[product]} />
                            ))}
                        </ul>
                        <hr className="my-8 border-t border-t-gray-200" />
                        <div className="space-x-4">
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                View Order
                            </button>
                            <button
                                type="button"
                                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                View Invoice
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
