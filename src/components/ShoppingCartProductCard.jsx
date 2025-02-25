import React, { useEffect } from 'react'
import { Heart, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeCartItem, increaseCartItem, decreaseCartItem } from '../redux/slices/cart';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function ShoppingCartProductCard({ product, handleProductClick }) {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);

    useEffect(() => {
        console.log(product.id, "rendering from shopping cart")
    }, [product])

    const removeItem = () => {
        dispatch(removeCartItem({ id: product.id }))
        toast.error("Item Removed")
    }

    const increaseItem = () => {
        dispatch(increaseCartItem({ id: product.id }));
    }

    const decreaseItem = () => {
        const tempQuantity = cartItems[product.id].quantity;
        if (tempQuantity === 1) {
            removeItem();
        }
        else {
            dispatch(decreaseCartItem({ id: product.id }))
        }
    }

    return (
        <div className="col-span-6 border-2 py-[10px] px-[20px] ">
            <li className="flex">
                <div onClick={() => { handleProductClick(product.id) }} className="cursor-pointer flex-shrink-0">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                    />
                </div>
                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-1 sm:gap-x-6 sm:pr-0">
                        <div>
                            <div onClick={() => { handleProductClick(product.id) }} className="cursor-pointer flex-col justify-between">
                                <h3 className="text-md">
                                    <a href={product.href} className="font-semibold text-black">
                                        {product.title}
                                    </a>
                                </h3>
                                <h2 className="text-[10px]">
                                    {product.description}
                                </h2>
                            </div>
                            <div className="mt-1 flex text-sm">
                                <p className="text-sm text-gray-500">{product.color}</p>
                                {product.size ? (
                                    <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                        {product.size}
                                    </p>
                                ) : null}
                            </div>
                            <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-gray-500 line-through">
                                    ${Math.floor((product.price) / ((1 - ((product.discountPercentage) / 100))))}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    &nbsp;&nbsp; ${product.price}
                                </p>
                                &nbsp;&nbsp;
                                <p className="text-sm font-medium text-green-500">{product.discount}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <div className="mb-2 flex">
                <div className="min-w-24 flex">
                    <button onClick={(e) => decreaseItem()} type="button" className="h-7 w-7">
                        -
                    </button>
                    <div className="mx-1 h-7 w-9 rounded-md border text-center">
                        {product.quantity}
                    </div>
                    <button onClick={(e) => { increaseItem() }} type="button" className="flex h-7 w-7 items-center justify-center">
                        +
                    </button>
                </div>
                <div className="ml-6 flex text-sm">
                    <button onClick={(e) => removeItem()} type="button" className="rounded-lg justify-center hover:bg-red-200 flex items-center space-x-1 px-4 py-1">
                        <Trash size={12} className="text-red-500" />
                        <span className="text-xs font-medium text-red-500">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartProductCard