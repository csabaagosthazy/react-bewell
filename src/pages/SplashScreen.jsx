// components/SplashScreen.js
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SplashScreen.css';

export default function SplashScreen({ onFinish, language }) {
  const [show, setShow] = useState(true);

  let text = 'Üdvözlöm a légyjólközpont oldalán!';
  if (language === 'en') text = 'Welcome to the legyjolkozpont website!';
  else if (language === 'de')
    text = 'Willkommen auf der Website von legyjolkozpont!';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, 2500); // 2.5s splash duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence mode='wait'>
      {show && (
        <motion.div
          className='splash-container'
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
        >
          <motion.div
            className='splash-logo'
            initial={{ y: 0, scale: 1 }}
            animate={{ scale: 0.25 }} // move up + shrink
            transition={{ duration: 1.5, ease: 'easeInOut', delay: 1 }}
          />
          <motion.h1
            className='splash-text'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {text}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
