import React from 'react';
import Price from './Price.jsx';

const Product = ({ product, index }) => {
  let oldPrices = ['12,495', '11,900', '1,599', '599'];
  let newPrices = ['8,999', '9,199', '899', '278'];
  let description = [
    ['8,000 DPI', '5 Programmable buttons'],
    ['intuitive surface', 'designed for iPad Pro'],
    ['designed for iPad Pro', 'intuitive surface'],
    ['wireless', 'optical orientation'],
  ];

  return (
    <>
      <div className="flex flex-col border-7 border-[#eaa712] rounded-lg font-monospace mb-4">
        <div className="w-85 flex flex-col flex-wrap gap-4 bg-[#77d7ff] p-5">
          <h2 className="flex align-content-center text-2xl font-bold min-h-16">
            {product}
          </h2>
          <p className="ml-2 font-semibold">{description[index][0]}</p>
          <p className="ml-2 font-semibold">{description[index][1]}</p>
        </div>
        <div>
          <Price oldPrice={oldPrices[index]} newPrice={newPrices[index]} />
        </div>
      </div>
    </>
  );
};

export default Product;
