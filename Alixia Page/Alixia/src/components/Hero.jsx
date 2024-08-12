import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='flex flex-col justify-center h-auto sm:text-left p-4 sm:p-8 sm:ml-20 mt-15 sm:mt-0'>
      <motion.h1
        className='text-4xl sm:text-6xl text-white leading-tight mb-3 mt-2 sm:mt-5'
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        Targeting the Tumor Ecosystem
      </motion.h1>
      <br className='block lg:hidden' />
      <motion.h1
        className='text-4xl sm:text-6xl text-white leading-tight mb-3 mt-8 sm:mt-5'
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      >
        to address cancer drug resistance
      </motion.h1>
      <br className='block lg:hidden'/>
      <motion.h1
        className='text-4xl sm:text-6xl text-white leading-tight mb-3 mt-7 sm:mt-5'
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.6 }}
      >
        and improve patients' lives
      </motion.h1>
      <br className='block lg:hidden'/>
      <motion.div
        className='mt-10 sm:mt-20'
        initial="hidden"
        animate="visible"
        variants={textVariants}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.9 }}
      >
        <p className='text-white text-sm sm:text-base w-72 sm:w-80 py-5'>
          Cancers are dynamic ecosystems - it's time we start treating them as such.
        </p>
      </motion.div>
    </div>
  );
};

export default Hero;
