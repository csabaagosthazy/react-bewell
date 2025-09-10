import React from 'react';
import Box from '@mui/material/Box';
import TextContent from './TextContent';

export default function BodyContainer({ body }) {
  const hasBody = !!body;

  return hasBody ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
      }}
    >
      <TextContent text={body} />
    </Box>
  ) : null;
}
