import React from 'react';
import Product from './Product.jsx';

const ProductTab = () => {
  let productName = [
    'Logitech MX Master 3S',
    'Apple Pencil(2nd Gen)',
    'Zebronics Zeb-Transformer',
    'Portronics Toad 23 Wireless Mouse',
  ];

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 min-h-screen">
        <h1 className="flex justify-center align-center text-lg font-semibold">
          Blockbuster Deals on Computer Accessories | &nbsp;{' '}
          <span className="text-green-500 font-bold">Shop Now</span>
        </h1>
        <div className="flex justify-evenly flex-wrap gap-3">
          <Product product={productName[0]} index={0} />
          <Product product={productName[1]} index={1} />
          <Product product={productName[2]} index={2} />
          <Product product={productName[3]} index={3} />
        </div>
      </div>
    </>
  );
};
export default ProductTab;
