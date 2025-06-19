import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { CheckCircle, X, Plus, Minus, Star } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../redux/slices/cart'

function ProductDetails({ cartItems, setCartItems, addToCartToast }) {
    const [productDetails, setProductDetails] = useState(null)
    const [itemQuantity, setItemQuantity] = useState(1)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    const tempCartItems = useSelector((state) => state.cart.cartItems)
    const dispatch = useDispatch()

    const { id } = useParams()

    const fetchAllProductDetails = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${id}`)
            const jsonData = await response.json()
            setProductDetails(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        fetchAllProductDetails()
    }, [id])

    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    const navigate = useNavigate()

    const addItemToCart = () => {
        if (!isLoggedIn) {
            navigate('/login')
        } else {
            if (tempCartItems[Number(id)]) {
                const tempQuantity = tempCartItems[Number(id)].quantity
                dispatch(
                    addToCart({
                        data: productDetails,
                        quantity: tempQuantity + itemQuantity,
                        id: Number(id),
                        totalAmount:
                            itemQuantity *
                            Math.floor(
                                productDetails.price /
                                    (1 - productDetails.discountPercentage / 100)
                            ),
                        discountAmount:
                            itemQuantity *
                            Math.floor(
                                (productDetails.price *
                                    (productDetails.discountPercentage / 100)) /
                                    (1 -
                                        productDetails.discountPercentage / 100)
                            ),
                        finalAmount: itemQuantity * productDetails.price,
                    })
                )
                addToCartToast()
            } else {
                dispatch(
                    addToCart({
                        data: productDetails,
                        quantity: itemQuantity,
                        id: Number(id),
                        totalAmount:
                            itemQuantity *
                            Math.floor(
                                productDetails.price /
                                    (1 - productDetails.discountPercentage / 100)
                            ),
                        discountAmount:
                            itemQuantity *
                            Math.floor(
                                (productDetails.price *
                                    (productDetails.discountPercentage / 100)) /
                                    (1 -
                                        productDetails.discountPercentage / 100)
                            ),
                        finalAmount: itemQuantity * productDetails.price,
                    })
                )
                addToCartToast()
            }
        }
    }

    if (!productDetails) {
        return <ProductDetailsSkeleton />
    }

    const originalPrice = Math.floor(
        productDetails.price /
            (1 - productDetails.discountPercentage / 100)
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <ToastContainer
                autoClose={2000}
                className="w-1/4 justify-center items-center m-0"
                toastClassName="rounded-lg border-l-4 border-green-500 bg-white dark:bg-gray-800 p-4 shadow-lg"
                bodyStyle={{ padding: 0, margin: 0 }}
                icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                style={{ height: 100 }}
                closeButton={
                    <div className="justify-center items-center">
                        <X className="h-6 w-6 cursor-pointer text-green-900 dark:text-green-400" />
                    </div>
                }
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
            <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16 py-8">
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                Home
                            </a>
                        </li>
                        <li>/</li>
                        <li>
                            <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors capitalize">
                                Products
                            </a>
                        </li>
                        <li>/</li>
                        <li className="text-gray-900 dark:text-white font-medium capitalize">
                            {productDetails.category}
                        </li>
                    </ol>
                </nav>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    <div className="space-y-6">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                                src={productDetails.images[selectedImageIndex]}
                                alt={productDetails.title}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        {productDetails.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {productDetails.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImageIndex(index)}
                                        className={`aspect-square rounded-lg overflow-hidden transition-all duration-200 ${
                                            selectedImageIndex === index
                                                ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                                                : 'hover:opacity-75'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${productDetails.title} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                {productDetails.title}
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                                {productDetails.description}
                            </p>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(productDetails.rating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300 dark:text-gray-600'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    ({productDetails.rating})
                                </span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                                    ${productDetails.price}
                                </span>
                                {productDetails.discountPercentage > 0 && (
                                    <>
                                        <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                                            ${originalPrice}
                                        </span>
                                        <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-sm font-medium">
                                            -{Math.round(productDetails.discountPercentage)}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <button
                                        key={size}
                                        className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-semibold transition-all duration-200 hover:border-gray-900 dark:hover:border-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Color</h3>
                            <div className="flex flex-wrap gap-3">
                                {['bg-orange-400', 'bg-pink-400', 'bg-violet-600', 'bg-red-500'].map((color, index) => (
                                    <button
                                        key={index}
                                        className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 transition-all duration-200 hover:border-gray-900 dark:hover:border-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <span className={`block w-full h-full rounded-md ${color}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                                <button
                                    onClick={() => {
                                        if (itemQuantity > 1) setItemQuantity(itemQuantity - 1)
                                    }}
                                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="px-6 py-3 text-lg font-semibold text-gray-900 dark:text-white min-w-[4rem] text-center">
                                    {itemQuantity}
                                </span>
                                <button
                                    onClick={() => setItemQuantity(itemQuantity + 1)}
                                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                            <button
                                onClick={addItemToCart}
                                className="flex-1 bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200 hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
                            >
                                Add to Cart
                            </button>
                        </div>
                        <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-900 dark:text-white">SKU:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400">{productDetails.stock}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-900 dark:text-white">Category:</span>
                                    <span className="ml-2 text-gray-600 dark:text-gray-400 capitalize">{productDetails.category}</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-700">
                            <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                                    Product Details
                                    <Plus className="w-5 h-5 transition-transform group-open:rotate-45" />
                                </summary>
                                <div className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Our Customer Experience Team is available 7 days a week and we offer 2 ways to get
                                    in contact. Email and Chat. We try to reply quickly, so you need not to wait too
                                    long for a response!
                                </div>
                            </details>
                            <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors border-t border-gray-200 dark:border-gray-700">
                                    Additional Information
                                    <Plus className="w-5 h-5 transition-transform group-open:rotate-45" />
                                </summary>
                                <div className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Additional product information and specifications will be displayed here.
                                </div>
                            </details>
                            <details className="group">
                                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors border-t border-gray-200 dark:border-gray-700">
                                    Customer Reviews
                                    <Plus className="w-5 h-5 transition-transform group-open:rotate-45" />
                                </summary>
                                <div className="pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Customer reviews and ratings will be displayed here.
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails
