import React from 'react';

const Banner: React.FC = () => {
  return (
    <div className="bg-yellow-400 p-6 flex flex-col items-center">
      <h1 className="text-white text-4xl">Quẹo lựa, Quà xinh cho nàng</h1>
      <button className="mt-4 bg-white text-yellow-500 py-2 px-4 rounded-full">Mua sắm ngay</button>
    </div>
  );
};

export default Banner;
