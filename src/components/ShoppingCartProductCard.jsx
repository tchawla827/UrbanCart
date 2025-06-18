import React, { useEffect } from 'react';
import { Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, increaseCartItem, decreaseCartItem } from '../redux/slices/cart';
import { toast } from 'sonner';

function ShoppingCartProductCard({ product, handleProductClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    console.log(product.id, 'rendering from shopping cart');
  }, [product]);

  const removeItem = () => {
    dispatch(removeCartItem({ id: product.id }));
    toast.error('Item Removed');
  };

  const increaseItem = () => {
    dispatch(increaseCartItem({ id: product.id }));
  };

  const decreaseItem = () => {
    const tempQuantity = cartItems[product.id].quantity;
    if (tempQuantity === 1) {
      removeItem();
    } else {
      dispatch(decreaseCartItem({ id: product.id }));
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Product Image */}
        <div
          onClick={() => handleProductClick(product.id)}
          className="cursor-pointer flex-shrink-0 group"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-24 w-24 sm:h-32 sm:w-32 rounded-lg object-cover object-center border border-border group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3">
          <div
            onClick={() => handleProductClick(product.id)}
            className="cursor-pointer group"
          >
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Product Attributes */}
          {(product.color || product.size) && (
            <div className="flex gap-4 text-sm text-muted-foreground">
              {product.color && <span>Color: {product.color}</span>}
              {product.size && <span>Size: {product.size}</span>}
            </div>
          )}

          {/* Pricing */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-muted-foreground line-through">
              ${Math.floor(product.price / (1 - product.discountPercentage / 100))}
            </span>
            <span className="text-lg font-bold text-foreground">
              ${product.price}
            </span>
            {product.discount && (
              <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                {product.discount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity Controls and Remove Button */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground mr-2">Qty:</span>
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={decreaseItem}
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors duration-200 hover:scale-110 active:scale-95"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center bg-background border-x border-border text-sm font-medium text-foreground">
              {product.quantity}
            </div>
            <button
              onClick={increaseItem}
              type="button"
              className="w-8 h-8 flex items-center justify-center bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors duration-200 hover:scale-110 active:scale-95"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={removeItem}
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200 hover:scale-105 active:scale-95"
          aria-label="Remove item from cart"
        >
          <Trash size={16} />
          <span className="text-sm font-medium">Remove</span>
        </button>
      </div>
    </div>
  );
}

export default ShoppingCartProductCard;
