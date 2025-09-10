import React, { useState, useEffect, useCallback } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageSlider({ images }) {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%', // fills MediaContainer’s fixed height
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <AnimatePresence mode='wait'>
        <motion.img
          key={images[index]?.asset?._id || index}
          src={images[index]?.asset?.url}
          alt={images[index]?.shortDescription || ''}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{
            position: 'absolute', // ✅ prevents layout hop
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain', // same as single image
          }}
        />
      </AnimatePresence>

      {/* Prev Button */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.6)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Next Button */}
      <IconButton
        onClick={nextSlide}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(255,255,255,0.6)',
          '&:hover': { bgcolor: 'rgba(255,255,255,0.8)' },
        }}
      >
        <ArrowForward />
      </IconButton>
    </Box>
  );
}
