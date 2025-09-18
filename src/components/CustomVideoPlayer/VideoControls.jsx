import React from 'react';
import { Box, IconButton, Slider, Stack, Typography } from '@mui/material';
import {
  PlayArrow,
  Pause,
  VolumeUp,
  VolumeOff,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material';

export default function VideoControls({
  fullscreen,
  visible = true,
  playing,
  muted,
  volume,
  played,
  playedSeconds,
  duration,
  videoUrl,
  onPlayPause,
  onMute,
  onVolumeChange,
  onSeekChange,
  onSeekCommit,
  onToggleFullscreen,
}) {
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const buttonStyles = {
    color: fullscreen ? '#ffffff' : '#5e503f',
    transform: fullscreen ? 'scale(1.4)' : 'scale(1)',
    transition: 'all 0.2s ease-in-out',
  };

  const sliderStyles = {
    color: fullscreen ? '#ffffff' : '#5e503f',
    height: fullscreen ? 6 : 4,
    '& .MuiSlider-thumb': {
      color: fullscreen ? '#ffffff' : '#5e503f',
      width: fullscreen ? 14 : 10,
      height: fullscreen ? 14 : 10,
    },
    '& .MuiSlider-rail': {
      color: fullscreen ? '#cccccc' : '#5e503f',
      opacity: fullscreen ? 0.6 : 1,
    },
    '& .MuiSlider-track': {
      color: fullscreen ? '#ffffff' : '#5e503f',
    },
  };

  return (
    <Box
      sx={{
        position: fullscreen ? 'absolute' : 'relative',
        bottom: fullscreen ? 0 : 'auto',
        left: 0,
        width: '100%',
        backgroundColor: fullscreen
          ? 'rgba(0, 0, 0, 0.4)'
          : 'rgba(94, 80, 63, 0.08)',
        px: 1,
        pb: 0.5,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Seeker bar */}
      <Slider
        value={played}
        min={0}
        max={1}
        step={0.001}
        onChange={onSeekChange}
        onChangeCommitted={onSeekCommit}
        sx={{ ...sliderStyles, mb: 0.5 }}
      />

      <Stack
        direction='row'
        spacing={1}
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' spacing={0.5} alignItems='center'>
          {/* Play / Pause */}
          <IconButton sx={buttonStyles} onClick={onPlayPause}>
            {playing ? <Pause /> : <PlayArrow />}
          </IconButton>
          <Typography
            variant='caption'
            sx={{
              color: fullscreen ? '#ffffff' : '#5e503f',
              minWidth: 80,
              whiteSpace: 'nowrap',
              fontSize: fullscreen ? '0.9rem' : '0.75rem',
            }}
          >
            {`${formatTime(playedSeconds)} / ${formatTime(duration)}`}
          </Typography>
        </Stack>

        <Stack direction='row' spacing={0.5} alignItems='center'>
          {/* Volume */}
          <IconButton sx={buttonStyles} onClick={onMute}>
            {muted || volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          <Slider
            value={muted ? 0 : volume}
            min={0}
            max={1}
            step={0.01}
            onChange={onVolumeChange}
            sx={{ ...sliderStyles, width: fullscreen ? 150 : 100 }}
          />
        </Stack>

        {/* Fullscreen */}
        <IconButton sx={buttonStyles} onClick={onToggleFullscreen}>
          {fullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Stack>
    </Box>
  );
}
