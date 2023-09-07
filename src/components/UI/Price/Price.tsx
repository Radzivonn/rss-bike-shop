import React, { type ComponentProps } from 'react';

interface IPriceProps extends ComponentProps<'div'> {
  price: number;
  discountPrice?: number;
  formatter?: (value: number) => string;
}

export const Price = ({ price, discountPrice, className, formatter, ...props }: IPriceProps) => {
  const showDiscountPrice = discountPrice && discountPrice < price;

  return (
    <p className={`price ${className ?? ''}`} {...props}>
      <span className="product-details__new-price">
        {showDiscountPrice
          ? formatter?.(discountPrice) ?? discountPrice
          : formatter?.(price) ?? price}
      </span>
      <span className="product-details__old-price">
        {showDiscountPrice ? formatter?.(price) ?? price : ''}
      </span>
    </p>
  );
};
