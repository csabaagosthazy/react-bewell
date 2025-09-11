// components/PostContent.js
import React from 'react';
import { Paper, Typography, Stack, Box } from '@mui/material';
import MediaContainer from './MediaContainer';
import BodyContainer from './BodyContainer';
import CustomTooltip from './CustomTooltip';
import TextContent from './TextContent';

export default function PostContent({ post }) {
  const {
    title,
    images,
    videoUrl,
    videoCaption,
    body,
    textPosition,
    extraContent,
  } = post;
  const getDirection = () => {
    switch (textPosition) {
      case 'left':
        return { xs: 'column', md: 'row' };
      case 'right':
        return { xs: 'column', md: 'row-reverse' };
      case 'above':
        return 'column';
      case 'below':
        return 'column-reverse';
      default:
        return 'column';
    }
  };

  return (
    <Paper
      elevation={3}
      className='post-paper'
      sx={{
        p: 2,
        m: 2,
        width: { xs: '100%', md: '90%' },
        backgroundColor: 'transparent',
      }}
    >
      {(title || extraContent) && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            position: 'relative',
          }}
        >
          {title && (
            <Typography
              variant='h5'
              component='h2'
              sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1 }}
            >
              {title}
            </Typography>
          )}
          {extraContent && (
            <Box sx={{ ml: 'auto' }}>
              <CustomTooltip
                text={<TextContent text={extraContent} />}
                placement='left'
              />
            </Box>
          )}
        </Box>
      )}

      <Stack
        direction={getDirection()}
        spacing={2}
        sx={{ alignItems: 'center', minHeight: { md: 400 } }}
      >
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: 1 },
            width: { xs: '100%', md: '50%' },
          }}
        >
          <BodyContainer body={body} />
        </Box>
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: 1 },
            width: { xs: '100%', md: '50%' },
          }}
        >
          <MediaContainer
            images={images}
            videoUrl={videoUrl}
            videoCaption={videoCaption}
          />
        </Box>
      </Stack>
    </Paper>
  );
}
