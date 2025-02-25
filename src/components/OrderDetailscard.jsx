import React from 'react'

function OrderDetailscard({product}) {
    return (
        <li
            key={product.id}
            className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
        >
            <div className="flex flex-1 items-stretch">
                <div className="flex-shrink-0">
                    <img
                        className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                        src={product.thumbnail}
                        // alt={product.imageSrc}
                    />
                </div>

                <div className="ml-5 flex flex-col justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{product.title}</p>
                        <p className="mt-1.5 text-sm font-medium text-gray-500">
                            {product.description}
                        </p>
                    </div>

                    <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                </div>
            </div>

            <div className="ml-auto flex flex-col items-end justify-between">
                <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
            </div>
        </li>
    )
}

export default OrderDetailscard