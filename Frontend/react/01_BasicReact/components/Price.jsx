import React from 'react';

const Price = ({ oldPrice, newPrice }) => {
  return (
    <div className="bg-[#eaa712] flex flex-wrap justify-around align-center text-xl font-sans font-semibold">
      <span className="line-through">
        <small className="text-xs align-super">{'\u20B9'}</small>
        {oldPrice}
      </span>
      <span>
        <small className="text-xs align-super">{'\u20B9'}</small>
        {newPrice}
      </span>
    </div>
  );
};
export default Price;
