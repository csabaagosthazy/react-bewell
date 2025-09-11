import React, { useState } from 'react';
import { Tooltip, IconButton, ClickAwayListener } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function CustomTooltip({ text, placement }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev);
  const handleClickAway = () => setOpen(false);
  console.log('CustomTooltip text:', text);
  console.log('CustomTooltip placement:', placement);

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
          <IconButton onClick={handleClick} size='medium'>
            <InfoOutlinedIcon size='medium' />
          </IconButton>
        </Tooltip>
      </div>
    </ClickAwayListener>
  );
}
