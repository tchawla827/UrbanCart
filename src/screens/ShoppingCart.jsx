import React from 'react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { AlertTriangle, X, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import ShoppingCartProductCard from '../components/ShoppingCartProductCard';
import { useSelector } from 'react-redux';


function ShoppingCart() {

    const navigate = useNavigate()
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const discountAmount = useSelector((state) => state.cart.discountAmount);
    const finalAmount = useSelector((state) => state.cart.finalAmount);

    const handleContinueShopping = () => {
        navigate("/page/1")
    }
    const handleProductClick = (id) => {
        navigate(`/page/product_detail/${id}`)
    }
    return (
        <div className="mx-auto h-full max-w-7xl px-2 lg:px-0">
            <ToastContainer
                autoClose={2000}
                className="w-1/5 justify-center items-center m-0"
                toastClassName="rounded-md border-l-4 border-red-500 bg-white justify-center items-center h-[10px]"
                bodyStyle={{ padding: 0, margin: 0 }}
                icon={<AlertTriangle className="h-[20px] w-[20px] text-red-600" />}
                style={{ height: 100 }}
                closeButton={
                    <div className="justify-center items-center">
                        <X className="h-6 w-6 cursor-pointer text-red-600" />
                    </div>
                }
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
            <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping Cart
                </h1>
                <form className="min-h-screen mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                    <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                        <ul role="list" className="grid grid-cols-12 gap-2">
                            {Object.keys(cartItems).map((product, productIdx) => (
                                <ShoppingCartProductCard handleProductClick={handleProductClick} key={productIdx} product={cartItems[product]} />
                            ))}
                        </ul>
                        {
                            Object.keys(cartItems).length === 0 &&
                            <div className="w-full h-full flex">
                                <h1 className="text-[20px] leading-1">Oops ! Your Cart is Empty</h1>
                                <button
                                    onClick={() => handleContinueShopping()}
                                    type="button"
                                    className="ml-[20px] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        }
                    </section>
                    {/* Order summary */}
                    <section
                        aria-labelledby="summary-heading"
                        className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                    >
                        <h2
                            id="summary-heading"
                            className="border-b border-gray-200 py-3 text-lg font-medium text-gray-900 sm:p-2"
                        >
                            Price Details
                        </h2>
                        <div>
                            <dl className=" space-y-1 px-2 py-4">
                                <div className="flex items-center justify-between">
                                    <dt className="text-sm text-gray-800">Price ( {Object.keys(cartItems).length} )</dt>
                                    <dd className="text-sm font-medium text-gray-900">{totalAmount == 0 ? "-" : "₹ " + totalAmount}</dd>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <dt className="flex items-center text-sm text-gray-800">
                                        <span>Discount</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">{discountAmount == 0 ? "-" : "- ₹ " + discountAmount}</dd>
                                </div>
                                <div className="flex items-center justify-between py-4">
                                    <dt className="flex text-sm text-gray-800">
                                        <span>Delivery Charges</span>
                                    </dt>
                                    <dd className="text-sm font-medium text-green-700">Free</dd>
                                </div>
                                <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                    <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                    <dd className="text-base font-medium text-gray-900">{finalAmount == 0 ? "-" : "₹ " + finalAmount}</dd>
                                </div>
                            </dl>
                            {/* <div className="px-2 pb-4 font-medium text-green-700">
                                You will save ₹ 3,431 on this order
                            </div> */}
                        </div>
                        <div>
                            <button
                                onClick={() => navigate("/checkout")}
                                type="button"
                                className="w-full justify-center inline-flex items-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-black/80"
                            >
                                Proceed to Checkout
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </button>
                        </div>
                    </section>
                </form>
            </div>
        </div>
    )
}

export default ShoppingCart