import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductDetailsSkeleton from '../components/ProductDetailsSkeleton';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle, X, Star, Heart, Share2, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cart';

function ProductDetails({ cartItems, setCartItems, addToCartToast }) {
  const [productDetails, setProductDetails] = useState(null);
  const [itemQuantity, setItemQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const tempCartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();

  const fetchAllProductDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const jsonData = await response.json();
      setProductDetails(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllProductDetails();
  }, [id]);

  const addItemToCart = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (productDetails) {
      const productId = Number(id);
      if (tempCartItems[productId]) {
        const tempQuantity = tempCartItems[productId].quantity;
        dispatch(
          addToCart({
            data: productDetails,
            quantity: tempQuantity + itemQuantity,
            id: productId,
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
                  (1 - productDetails.discountPercentage / 100)
              ),
            finalAmount: itemQuantity * productDetails.price,
          })
        );
        addToCartToast();
      } else {
        addToCartToast();
        dispatch(
          addToCart({
            data: productDetails,
            quantity: itemQuantity,
            id: productId,
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
                  (1 - productDetails.discountPercentage / 100)
              ),
            finalAmount: itemQuantity * productDetails.price,
          })
        );
      }
    }
  };

  if (!productDetails) {
    return <ProductDetailsSkeleton />;
  }

  const originalPrice = Math.floor(
    productDetails.price / (1 - productDetails.discountPercentage / 100)
  );
  const savings = originalPrice - productDetails.price;

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer
        autoClose={2000}
        className="w-1/4 justify-center items-center m-0"
        toastClassName="rounded-md border-l-4 border-green-500 bg-white dark:bg-gray-800 p-4"
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

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 2xl:px-16">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <a href="#" className="hover:text-foreground transition-colors">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="hover:text-foreground transition-colors capitalize">
                {productDetails.category}
              </a>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate">{productDetails.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden rounded-2xl bg-muted group">
              <img
                src={productDetails.images[selectedImage]}
                alt={productDetails.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {productDetails.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productDetails.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
                      selectedImage === index
                        ? 'ring-2 ring-primary shadow-lg'
                        : 'hover:ring-2 hover:ring-muted-foreground/30'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productDetails.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {productDetails.title}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{productDetails.rating}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {productDetails.stock} in stock
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {productDetails.description}
              </p>

              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-4xl font-bold text-foreground">
                  ${productDetails.price}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${originalPrice}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                  Save ${savings}
                </span>
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Size</h3>
              <div className="flex gap-3">
                {['S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-medium transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary/50 hover:bg-muted'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Orange', class: 'bg-orange-400' },
                  { name: 'Pink', class: 'bg-pink-400' },
                  { name: 'Purple', class: 'bg-violet-600' },
                  { name: 'Red', class: 'bg-red-500' },
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
                      selectedColor === color.name
                        ? 'border-primary scale-110'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <div className={`w-full h-full rounded-full ${color.class}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setItemQuantity(Math.max(1, itemQuantity - 1))}
                      className="p-3 hover:bg-muted transition-colors duration-200"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="px-6 py-3 font-medium border-x border-border bg-muted/50 min-w-[60px] text-center">
                      {itemQuantity}
                    </span>
                    <button
                      onClick={() => setItemQuantity(itemQuantity + 1)}
                      className="p-3 hover:bg-muted transition-colors duration-200"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={addItemToCart}
                  className="flex-1 bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-4 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6 pt-8 border-t border-border">
              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold">
                  Product Details
                  <Plus className="h-5 w-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="pb-4 text-muted-foreground">
                  Our Customer Experience Team is available 7 days a week and we offer 2 ways to get
                  in contact. Email and Chat. We try to reply quickly, so you need not wait too
                  long for a response!
                </div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold border-t border-border">
                  Additional Information
                  <Plus className="h-5 w-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="pb-4 text-muted-foreground">
                  <ul className="space-y-2">
                    <li><strong>SKU:</strong> {productDetails.stock}</li>
                    <li><strong>Category:</strong> {productDetails.category}</li>
                    <li><strong>Tags:</strong> {productDetails.title}, {productDetails.category}</li>
                  </ul>
                </div>
              </details>

              <details className="group">
                <summary className="flex cursor-pointer items-center justify-between py-4 text-lg font-semibold border-t border-border">
                  Customer Reviews
                  <Plus className="h-5 w-5 transition-transform group-open:rotate-45" />
                </summary>
                <div className="pb-4 text-muted-foreground">
                  Customer reviews and ratings will be displayed here.
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
