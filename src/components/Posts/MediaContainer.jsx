import React from 'react';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player';
import ImageSlider from './ImageSlider';

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
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <ReactPlayer
          src={videoUrl}
          title={videoCaption}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          controls
          onContextMenu={(e) => e.preventDefault()}
          controlsList='nodownload'
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload',
                onContextMenu: (e) => e.preventDefault(),
              },
            },
          }}
        />
      </Box>
    );
  }
  return null;
}
