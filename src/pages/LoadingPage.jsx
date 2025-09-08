import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingPage.css';
import { useSanityContent } from '../context/SanityContentProvider';

export default function LoadingPage() {
  const { loading } = useSanityContent();
  return (
    <AnimatePresence mode='sync'>
      {loading && (
        <motion.div
          className='loading-overlay'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <img src='/logo.png' alt='Loading' className='loading-image' />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
