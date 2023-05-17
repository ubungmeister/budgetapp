import React from 'react';

const Logo = () => {
    const scale = 0.75;
    return (
    <div className="relative flex w-full flex-col items-center justify-center border-b pb-5 border-gray-100">
        <img
          width={200 * scale}
          height={80 * scale}
          src="/assets/logo.svg"
          alt="logo"
        />
    </div>
    );
};

export default Logo;