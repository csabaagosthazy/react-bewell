import React from 'react';
import Box from '@mui/material/Box';
import ImageSlider from './ImageSlider';
import CustomVideoPlayer from '../CustomVideoPlayer/CustomVideoPlayer';

export default function MediaContainer({ images, videoUrl, videoCaption }) {
  if (images && images.length > 1) {
    return (
      <Box sx={{ width: '100%', height: 400 }}>
        <ImageSlider images={images} />
      </Box>
    );
  }
  if (images && images.length === 1) {
    return (
      <Box
        component='img'
        src={images[0].asset?.url || ''}
        alt={images[0].shortDescription || ''}
        sx={{
          width: '100%',
          height: { xs: 'auto', md: '100%' },
          maxHeight: 400,
          objectFit: 'contain',
        }}
      />
    );
  }
  if (videoUrl) {
    return (
      <CustomVideoPlayer videoUrl={videoUrl} videoCaption={videoCaption} />
    );
  }
  return null;
}
