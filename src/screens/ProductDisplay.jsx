import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import ProductLists from '../components/ProductLists'
import { CheckCircle, X } from 'lucide-react'
import "react-toastify/dist/ReactToastify.css";
import { AlertTriangle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addCategoryProducts, addProducts, removeCategoryProducts, sortByHighToLow, sortByLowToHigh, sortByRating } from '../redux/slices/products';
import { useDispatch } from 'react-redux';

const filters = [
    {
        id: 'category',
        name: 'Category',
        options: [
            { id: 1, value: "smartphones" },
            { id: 2, value: "laptops" },
            { id: 3, value: "fragrances" },
            { id: 4, value: "skincare" },
            { id: 5, value: "groceries" },
            { id: 6, value: "home-decoration" },
            { id: 7, value: "furniture" },
            { id: 8, value: "tops" },
            { id: 9, value: "womens-dresses" },
            { id: 10, value: "womens-shoes" },
            { id: 11, value: "mens-shirts" },
            { id: 12, value: "mens-shoes" },
            { id: 13, value: "mens-watches" },
            { id: 14, value: "womens-watches" },
            { id: 15, value: "womens-bags" },
            { id: 16, value: "womens-jewellery" },
            { id: 17, value: "sunglasses" },
            { id: 18, value: "automotive" },
            { id: 19, value: "motorcycle" },
            { id: 20, value: "lighting" }
        ],
    }
]


function ProductDisplay({ cartItems, setCartItems, addToCart, categoryAdded, categoryRemoved }) {

    //All States

    const dispatch = useDispatch();
    const [isAttached, setIsAttached] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [lastSelectedCategory, setLastSelectedCategory] = useState("")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("");

    //All UseEffect Calls

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            setIsAttached(scrollTop > 250);
        };
        if (window.pageYOffset > 250) setIsAttached(true)
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (selectedCategories.length === 0) {
            fetchAllData()
        }
        else {
            if (lastSelectedCategory !== "") fetchDataCategory()
        }
    }, [selectedCategories, lastSelectedCategory])

    const sortItems = (value) => {
        if (value === "Sort By: High to Low") {
            dispatch(sortByHighToLow());
        }
        else if (value === "Sort By: Low to High") {
            dispatch(sortByLowToHigh());
        }
        else if (value === "Sort By: Rating") {
            dispatch(sortByRating())
        }
        sortedToast(value)
    }

    const fetchAllData = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=0`);
            const jsonData = await response.json();
            console.log(jsonData.products, "all data")
            dispatch(addProducts(jsonData.products))
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchDataCategory = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products/category/${lastSelectedCategory}?limit=0`);
            const jsonData = await response.json();
            const newArray = jsonData.products
            dispatch(addCategoryProducts({ data: newArray, isFirst: selectedCategories.length === 1 }));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const removeCategory = (value) => {
        dispatch(removeCategoryProducts(value))
        const allSelectedCategories = selectedCategories;
        const updatedSelectedCategories = allSelectedCategories.filter(x => x !== value);
        setSelectedCategories(updatedSelectedCategories);
        setLastSelectedCategory("")
        categoryRemoved()
    }

    const handleCategoryToggle = (e, value) => {
        if (e.target.checked) {
            setLastSelectedCategory(value)
            setSelectedCategories([...selectedCategories, value]);
            categoryAdded()
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            removeCategory(value)
        }
        console.log(selectedCategories);
    }
    
    const sortedToast = (message) => {
        toast.success(`Items ${message}`, {
            containerId: "Sort Toast",
        })
    }

    const handleInfiniteScroll = async () => {
        console.log("scrollHeight", document.documentElement.scrollHeight);
        console.log("innerHeight", window, innerHeight);
        console.log("scrollTop", document.documentElement.scrollTop);

        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1);
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll)
        return () => window.removeEventListener("scroll", handleInfiniteScroll)
    }, [])

    return (
        <section className="w-full">
            <ToastContainer
                containerId={"AddToCart"}
                autoClose={2000}
                className="w-1/4 justify-center items-center m-0"
                toastClassName="rounded-md border-l-4 border-green-500 bg-white p-4"
                bodyStyle={{ padding: 0, margin: 0 }}
                icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                style={{ height: 100 }}
                closeButton={
                    <div className="justify-center items-center">
                        <X className="h-6 w-6 cursor-pointer text-green-900" />
                    </div>
                }
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                enableMultiContainer
            />
            <ToastContainer
                enableMultiContainer
                containerId={"CategoryAdded"}
                autoClose={2000}
                className="w-1/4 justify-center items-center m-0"
                toastClassName="rounded-md border-l-4 border-green-500 bg-white p-4"
                bodyStyle={{ padding: 0, margin: 0 }}
                icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                style={{ height: 100 }}
                closeButton={
                    <div className="justify-center items-center">
                        <X className="h-6 w-6 cursor-pointer text-green-900" />
                    </div>
                }
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />
            <ToastContainer
                enableMultiContainer
                containerId={"CategoryRemoved"}
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
            <ToastContainer
                containerId={"Sort Toast"}
                autoClose={2000}
                className="w-1/4 justify-center items-center m-0"
                toastClassName="rounded-md border-l-4 border-green-500 bg-white p-4"
                bodyStyle={{ padding: 0, margin: 0 }}
                icon={<CheckCircle className="h-6 w-6 text-green-600" />}
                style={{ height: 100 }}
                closeButton={
                    <div className="justify-center items-center">
                        <X className="h-6 w-6 cursor-pointer text-green-900" />
                    </div>
                }
                pauseOnFocusLoss={false}
                pauseOnHover={false}
                enableMultiContainer
            />
            <div className="mx-auto max-w-[1500px] px-2 py-10 lg:px-10">
                <div className="md:flex md:flex-row md:items-start md:justify-between">
                    <div>
                        <h1 className="text-xl font-bold">Products</h1>
                    </div>
                    <div className="mt-6 flex items-center  pt-2 md:mt-0 md:space-x-4  md:pt-0">
                        <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); sortItems(e.target.value) }} className="items-center rounded-md py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:inline-flex">
                            <option className='w-[200px]'>Sort By: Relevance</option>
                            <option>Sort By: High to Low</option>
                            <option>Sort By: Low to High</option>
                            <option>Sort By: Rating</option>
                        </select>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
                        >
                            Category <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
                        >
                            Color <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black lg:hidden"
                        >
                            Size <ChevronDown className="ml-2 h-4 w-4" />
                        </button>
                    </div>
                </div>
                <hr className="my-8" />
                <div className="lg:grid lg:grid-cols-12 lg:gap-x-6">
                    <div className={isAttached ? "space-y-6 divide-y w-[216px] lg:block fixed top-0" : "space-y-6 divide-y lg:col-span-2 lg:block"}>
                        {filters.map((filter) => (
                            <div key={filter.id} className="pt-6">
                                <h3 className="text-lg font-semibold text-gray-900">{filter.name}</h3>
                                <ul className="mt-4 h-[600px] overflow-scroll">
                                    {filter.options.map((option, index) => (
                                        <li key={index} className="flex items-center justify-between py-2">
                                            <div className="flex items-center">
                                                <input
                                                    onChange={(e) => handleCategoryToggle(e, option.value)}
                                                    id={option.id}
                                                    name={option.value}
                                                    defaultValue={option.value}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <label
                                                    htmlFor={`${filter.id}-${option.value}`}
                                                    className="ml-3 text-sm font-medium text-gray-900"
                                                >
                                                    {option.value}
                                                </label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <ProductLists page={page} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} />
                </div>
                {/* <ProductPagination page={page} setPage={setPage} totalPages={selectedCategories.length === 0 ? totalPages : categoryTotalPages} /> */}
            </div>
        </section>
    )
}

export default ProductDisplay