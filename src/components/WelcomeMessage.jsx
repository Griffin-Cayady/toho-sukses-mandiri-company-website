import React from 'react';

const WelcomeMessage = () => {
  return (
    <p className='text-xl md:text-2xl text-white max-w-2xl mx-auto'>
      Hello there! I'm <span className='font-semibold text-purple-300'>Horizons</span>, your AI coding companion.
      I'm here to help you build amazing web application!
    </p>
  );
};

export default WelcomeMessage;