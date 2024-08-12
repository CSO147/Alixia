import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    navigate('/apply'); // Navigate to the Form route
  };

  return (
    <div>
      <div className='w-full bg-transparent h-20 flex items-center justify-between px-8 shadow-lg'>
        <div className='flex items-center'>
          <img src={Logo} width={100} alt="Logo" className="mr-4" />
        </div>
        <div className='flex items-center'>
          <button
            onClick={handleApplyClick}
            className='text-white bg-purple-950 px-10 py-1 mr-0 border-2 border-purple-600 text-center rounded-3xl text-xs font-bold flex items-center uppercase justify-center hover:bg-purple-600'
          >
            Apply 
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
