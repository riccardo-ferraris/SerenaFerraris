import React from 'react';

const Divider = ({ text }) => {
  return (
    <div className="flex items-center justify-center my-8">
      <hr className="w-1/3 border-t-2 border-gray-300" />
      <span className="mx-8 text-[#102e5e] text-3xl font-bold">{text}</span>
      <hr className="w-1/3 border-t-2 border-gray-300" />
    </div>
  );
};

export default Divider;