import React from 'react';
import Box from '@mui/material/Box';
import ReactPlayer from 'react-player';

export default function MediaContainer({
  imageUrl,
  imageAlt,
  videoUrl,
  videoCaption,
}) {
  if (imageUrl) {
    return (
      <Box
        component='img'
        src={imageUrl}
        alt={imageAlt || ''}
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
