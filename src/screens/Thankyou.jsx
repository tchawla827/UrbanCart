import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle, Package, FileText } from 'lucide-react';
import OrderDetailscard from '../components/OrderDetailscard';

export const Thankyou = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const finalAmount = useSelector((state) => state.cart.finalAmount);
  const { payment_id } = useParams();

  return (
    <div className="min-h-screen bg-background py-8 animate-fade-in">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8 animate-slide-in-down">
          <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sticky top-8 animate-slide-in-left">
              <h2 className="text-xl font-semibold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Order ID</span>
                  <span className="text-sm font-mono text-foreground bg-muted px-2 py-1 rounded">
                    #{payment_id?.slice(-8).toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground">Total Items</span>
                  <span className="text-sm font-semibold text-foreground">
                    {Object.keys(cartItems).length}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <span className="text-base font-semibold text-foreground">Total Amount</span>
                  <span className="text-lg font-bold text-foreground">₹{finalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Package className="h-4 w-4" />
                  View Order
                </button>
                <button
                  type="button"
                  className="w-full bg-muted text-foreground px-4 py-3 rounded-lg font-medium hover:bg-muted/80 transition-all duration-200 hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4" />
                  View Invoice
                </button>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden animate-slide-in-right">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">Order Items</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {Object.keys(cartItems).length} items in your order
                </p>
              </div>

              <div className="divide-y divide-border">
                {Object.keys(cartItems).map((productId, index) => {
                  const product = cartItems[productId];

                  return (
                    <div
                      key={productId}
                      className="p-4 hover:bg-muted/30 transition-colors duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <OrderDetailscard product={product} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* What's Next Section */}
        <div className="mt-8 bg-card rounded-2xl border border-border shadow-sm p-6 animate-fade-in-up">
          <h3 className="text-lg font-semibold text-foreground mb-4">What's Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📧</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Confirmation Email</h4>
              <p className="text-sm text-muted-foreground">You'll receive an order confirmation email shortly</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Processing</h4>
              <p className="text-sm text-muted-foreground">Your order will be processed within 1-2 business days</p>
            </div>
            <div className="p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚚</span>
              </div>
              <h4 className="font-medium text-foreground mb-1">Shipping</h4>
              <p className="text-sm text-muted-foreground">Track your package once it's shipped</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
