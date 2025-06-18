import React from 'react';

interface Product {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
}

interface OrderDetailscardProps {
  product: Product;
}

function OrderDetailscard({ product }: OrderDetailscardProps) {
  return (
    <li
      key={product.id}
      className="group flex flex-col justify-between space-y-4 py-6 px-4 rounded-xl bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 ease-in-out hover:scale-[1.01] md:flex-row md:space-y-0 md:space-x-5 dark:bg-card dark:border-border"
    >
      <div className="flex flex-1 items-stretch gap-4">
        <div className="flex-shrink-0">
          <img
            className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg border border-border bg-background object-cover object-center shadow-sm group-hover:scale-105 transition-transform duration-300"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
              {product.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
              Qty: {product.quantity}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-center md:justify-between">
        <p className="text-right text-sm sm:text-base font-bold text-foreground">
          ${product.price}
        </p>
      </div>
    </li>
  );
}

export default OrderDetailscard;
