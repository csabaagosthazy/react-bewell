import React, { useState } from 'react';
import {
  Tooltip,
  IconButton,
  ClickAwayListener,
  createTheme,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function CustomTooltip({ text, placement }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: '#4682B4', // steel blue
      },
      secondary: {
        main: '#A65E2E', // terracotta
      },
    },
  });

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <Tooltip
          title={text}
          placement={placement}
          open={open}
          onClose={handleClickAway}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          PopperProps={{
            sx: {
              '& .MuiTooltip-tooltip': {
                bgcolor: 'white',
                color: 'black',
                boxShadow: 2,
                fontSize: '0.875rem',
              },
            },
          }}
        >
          <IconButton onClick={handleClick} size='large'>
            <InfoOutlinedIcon
              fontSize='large'
              sx={{ color: 'secondary.main' }}
            />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
