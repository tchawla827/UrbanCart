import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Toaster } from 'sonner';
import "react-toastify/dist/ReactToastify.css";
import { AlertTriangle, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ShoppingCartProductCard from '../components/ShoppingCartProductCard';
import { useSelector } from 'react-redux';

function ShoppingCart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const discountAmount = useSelector((state) => state.cart.discountAmount);
  const finalAmount = useSelector((state) => state.cart.finalAmount);

  const handleContinueShopping = () => {
    navigate("/page/1");
  };

  const handleProductClick = (id) => {
    navigate(`/page/product_detail/${id}`);
  };

  const itemCount = Object.keys(cartItems).length;

  return (
    <div className="min-h-screen bg-background">
      <ToastContainer
        autoClose={2000}
        className="w-1/5 justify-center items-center m-0"
        toastClassName="rounded-md border-l-4 border-red-500 bg-white dark:bg-gray-800 justify-center items-center h-[10px]"
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
      <Toaster richColors />
      
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {itemCount === 0 ? 'Your cart is empty' : `${itemCount} item${itemCount > 1 ? 's' : ''} in your cart`}
          </p>
        </div>

        {itemCount === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <button
              onClick={handleContinueShopping}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Items in your cart</h2>
                </div>
                <div className="divide-y divide-border">
                  {Object.values(cartItems).map((product, index) => (
                    <div key={index} className="p-6 hover:bg-muted/50 transition-colors duration-200">
                      <ShoppingCartProductCard 
                        handleProductClick={handleProductClick} 
                        product={product} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="lg:col-span-4">
              <div className="bg-card rounded-2xl border border-border shadow-sm sticky top-8">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
                    <span className="font-medium text-foreground">
                      {totalAmount === 0 ? '—' : `₹${totalAmount}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="font-medium text-green-600 dark:text-green-400">
                      {discountAmount === 0 ? '—' : `−₹${discountAmount}`}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                  </div>
                  
                  <div className="border-t border-border pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-foreground">Total</span>
                      <span className="text-lg font-bold text-foreground">
                        {finalAmount === 0 ? '—' : `₹${finalAmount}`}
                      </span>
                    </div>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                      <p className="text-sm font-medium text-green-800 dark:text-green-400">
                        You're saving ₹{discountAmount} on this order!
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="p-6 border-t border-border">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
