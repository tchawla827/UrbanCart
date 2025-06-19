import React from 'react';
import { ArrowRight, ShoppingBag, CreditCard, MapPin, User, Tag } from 'lucide-react';
import { useSelector } from 'react-redux';
import CheckoutProductCard from '../components/CheckoutProductCard';
import { useNavigate } from 'react-router-dom';

export function Checkout() {
  const products = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const finalAmount = useSelector(state => state.cart.finalAmount);
  const discountAmount = useSelector(state => state.cart.discountAmount);

  const navigate = useNavigate();

  const loadScript = src => {
    return new Promise(resolve => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async amount => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('You are offline');
      return;
    }

    const options = {
      key: 'rzp_test_nrHrsMJkNeOshh',
      currency: 'INR',
      amount: Math.round(amount * 100),
      name: 'Welcome to e-com',
      description: 'Thank you for purchasing :)',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        navigate(`/checkout/${response.razorpay_payment_id}`);
      },
      prefill: 'Come Again',
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const itemCount = Object.keys(products).length;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Complete your purchase</p>
        </div>

        {itemCount === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Add some items to your cart to proceed with checkout.</p>
            <button
              onClick={() => navigate('/page/1')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 inline-flex items-center gap-2"
            >
              Continue Shopping
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <User className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Contact Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Shipping Address</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-foreground mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter your address"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-foreground mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        placeholder="City"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="region" className="block text-sm font-medium text-foreground mb-2">
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="region"
                        placeholder="State or Province"
                        className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="postal-code" className="block text-sm font-medium text-foreground mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postal-code"
                      placeholder="Postal code"
                      className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h2 className="text-xl font-semibold text-foreground">Billing Information</h2>
                </div>
                <div className="flex items-center">
                  <input
                    id="same-as-shipping"
                    name="same-as-shipping"
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary/50"
                  />
                  <label htmlFor="same-as-shipping" className="ml-3 text-sm font-medium text-foreground">
                    Same as shipping information
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
                  <p className="text-sm text-muted-foreground mt-1">{itemCount} items</p>
                </div>
                <div className="divide-y divide-border max-h-96 overflow-y-auto">
                  {Object.values(products).map((product, index) => (
                    <div key={index} className="p-4">
                      <CheckoutProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Tag className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Apply Coupon</h3>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                  />
                  <button
                    type="button"
                    className="px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{totalAmount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium text-green-600 dark:text-green-400">−₹{discountAmount}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-foreground">₹{finalAmount}</span>
                  </div>
                  <button
                    onClick={() => handlePayment(finalAmount)}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <CreditCard className="h-5 w-5" />
                    Complete Payment
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

export default Checkout;
