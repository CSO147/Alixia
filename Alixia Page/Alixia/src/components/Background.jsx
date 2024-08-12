import React from 'react';
import virus from '../assets/virus.mp4';
import Navbar from './Navbar';

const Background = ({ children }) => {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src={virus} type="video/mp4" />
      </video>
      <div className='relative z-40 flex flex-col h-full'>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Background;
