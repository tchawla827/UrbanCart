import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ProductLists from '../components/ProductLists'
import { CheckCircle, X, AlertTriangle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import {
  addCategoryProducts,
  setProducts,
  removeCategoryProducts,
  sortByHighToLow,
  sortByLowToHigh,
  sortByRating
} from '../redux/slices/products'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { id: 1, value: 'smartphones' },
      { id: 2, value: 'laptops' },
      { id: 3, value: 'fragrances' },
      { id: 4, value: 'skincare' },
      { id: 5, value: 'groceries' },
      { id: 6, value: 'home-decoration' },
      { id: 7, value: 'furniture' },
      { id: 8, value: 'tops' },
      { id: 9, value: 'womens-dresses' },
      { id: 10, value: 'womens-shoes' },
      { id: 11, value: 'mens-shirts' },
      { id: 12, value: 'mens-shoes' },
      { id: 13, value: 'mens-watches' },
      { id: 14, value: 'womens-watches' },
      { id: 15, value: 'womens-bags' },
      { id: 16, value: 'womens-jewellery' },
      { id: 17, value: 'sunglasses' },
      { id: 18, value: 'automotive' },
      { id: 19, value: 'motorcycle' },
      { id: 20, value: 'lighting' }
    ]
  }
]

function ProductDisplay({ cartItems, setCartItems, addToCart, categoryAdded, categoryRemoved }) {
  const dispatch = useDispatch()
  const [selectedCategories, setSelectedCategories] = useState([])
  const [lastSelectedCategory, setLastSelectedCategory] = useState('')
  const [page, setPage] = useState(1)
  const [sortBy, setSortBy] = useState('')

  // fetch-all or by-category
  useEffect(() => {
    if (selectedCategories.length === 0) {
      fetchAllData()
    } else if (lastSelectedCategory !== '') {
      fetchDataCategory()
    }
  }, [selectedCategories, lastSelectedCategory])

  const sortItems = (value) => {
    if (value === 'Sort By: High to Low') {
      dispatch(sortByHighToLow())
    } else if (value === 'Sort By: Low to High') {
      dispatch(sortByLowToHigh())
    } else if (value === 'Sort By: Rating') {
      dispatch(sortByRating())
    }
    toast.success(`Items ${value}`, { containerId: 'Sort Toast' })
  }

  const fetchAllData = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products?limit=0')
      const json = await res.json()
      dispatch(setProducts(json.products))
    } catch (err) {
      console.error(err)
    }
  }

  const fetchDataCategory = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/category/${lastSelectedCategory}?limit=0`
      )
      const json = await res.json()
      dispatch(
        addCategoryProducts({
          data: json.products,
          isFirst: selectedCategories.length === 1
        })
      )
    } catch (err) {
      console.error(err)
    }
  }

  const removeCategory = (value) => {
    dispatch(removeCategoryProducts(value))
    setSelectedCategories((prev) => prev.filter((x) => x !== value))
    setLastSelectedCategory('')
    categoryRemoved()
  }

  const handleCategoryToggle = (e, value) => {
    if (e.target.checked) {
      setLastSelectedCategory(value)
      setSelectedCategories((prev) => [...prev, value])
      categoryAdded()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      removeCategory(value)
    }
  }

  // infinite scroll
  useEffect(() => {
    const handleInfinite = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((p) => p + 1)
      }
    }
    window.addEventListener('scroll', handleInfinite)
    return () => window.removeEventListener('scroll', handleInfinite)
  }, [])

  return (
    <section className="pt-16 w-full min-h-screen bg-gradient-to-br from-gray-50/80 via-white to-gray-100/60 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Toasts */}
      <ToastContainer
        containerId="AddToCart"
        autoClose={2000}
        className="w-1/4 justify-center items-center m-0"
        toastClassName="rounded-lg border-l-4 border-green-500 bg-white dark:bg-gray-800 p-4 shadow-lg backdrop-blur-sm"
        bodyStyle={{ padding: 0, margin: 0 }}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        closeButton={
          <div className="justify-center items-center">
            <X className="h-6 w-6 cursor-pointer text-green-900 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors" />
          </div>
        }
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        enableMultiContainer
      />
      <ToastContainer
        enableMultiContainer
        containerId="CategoryAdded"
        autoClose={2000}
        className="w-1/4 justify-center items-center m-0"
        toastClassName="rounded-lg border-l-4 border-green-500 bg-white dark:bg-gray-800 p-4 shadow-lg backdrop-blur-sm"
        bodyStyle={{ padding: 0, margin: 0 }}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <ToastContainer
        enableMultiContainer
        containerId="CategoryRemoved"
        autoClose={2000}
        className="w-1/5 justify-center items-center m-0"
        toastClassName="rounded-lg border-l-4 border-red-500 bg-white dark:bg-gray-800 p-4 shadow-lg backdrop-blur-sm"
        bodyStyle={{ padding: 0, margin: 0 }}
        icon={<AlertTriangle className="h-[20px] w-[20px] text-red-600" />}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <ToastContainer
        containerId="Sort Toast"
        autoClose={2000}
        className="w-1/4 justify-center items-center m-0"
        toastClassName="rounded-lg border-l-4 border-green-500 bg-white dark:bg-gray-800 p-4 shadow-lg backdrop-blur-sm"
        bodyStyle={{ padding: 0, margin: 0 }}
        icon={<CheckCircle className="h-6 w-6 text-green-600" />}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        enableMultiContainer
      />

      <div className="mx-auto max-w-[1500px] px-4 py-8 lg:px-10">
        {/* Header + sort controls */}
        <div className="md:flex md:flex-row md:items-start md:justify-between">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Products
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Discover our curated collection
            </p>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3 pt-2 md:mt-0 md:pt-0">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value)
                sortItems(e.target.value)
              }}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <option>Sort By: Relevance</option>
              <option>Sort By: High to Low</option>
              <option>Sort By: Low to High</option>
              <option>Sort By: Rating</option>
            </select>
            {/* mobile filter buttons */}
            <button className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 lg:hidden">
              Category <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 lg:hidden">
              Color <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 lg:hidden">
              Size <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* ←── pure-CSS sticky sidebar */}
          <div className="lg:col-span-2 self-start sticky top-16 space-y-6 z-20">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 p-6 shadow-lg backdrop-blur-sm">
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-700 pb-3">
                    {filter.name}
                  </h3>
                  <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                    <ul className="space-y-3">
                      {filter.options.map((option) => (
                        <li key={option.id} className="group">
                          <div className="flex items-center space-x-3 rounded-lg p-2 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 animate-slide-in-left">
                            <input
                              onChange={(e) => handleCategoryToggle(e, option.value)}
                              id={option.id.toString()}
                              name={option.value}
                              type="checkbox"
                              className="peer h-4 w-4 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:scale-105 transition-transform"
                            />
                            <label
                              htmlFor={option.id.toString()}
                              className="flex-1 cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 capitalize transition-all duration-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 peer-checked:text-white peer-checked:px-2 peer-checked:py-1 peer-checked:rounded-md peer-checked:shadow-md"
                            >
                              {option.value.replace('-', ' ')}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* main product grid */}
          <div className="lg:col-span-10 lg:col-start-3 animate-fade-in">
            <ProductLists
              page={page}
              addToCart={addToCart}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplay
