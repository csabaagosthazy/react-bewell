import React, { useRef, useState, useEffect } from 'react';
import { Box } from '@mui/material';
import VideoControls from './VideoControls';

export default function CustomVideoPlayer({ videoUrl }) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const hideTimeout = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.pause();
    else video.play();
  };

  const handleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleVolumeChange = (e, newValue) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = newValue;
    video.muted = newValue === 0;
    setVolume(newValue);
    if (newValue > 0) setMuted(false);
  };

  const handleSeekChange = (e, newValue) => {
    setPlayed(newValue);
    setSeeking(true);
  };

  const handleSeekCommit = (e, newValue) => {
    const video = videoRef.current;
    if (!video) return;
    setSeeking(false);
    video.currentTime = newValue * duration;
  };

  const toggleFullscreen = () => {
    const elem = containerRef.current;
    if (!document.fullscreenElement) {
      elem?.requestFullscreen?.();
      setFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = !!document.fullscreenElement;
      setFullscreen(isFullscreen);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      if (!seeking) {
        setPlayed(video.currentTime / video.duration);
        setPlayedSeconds(video.currentTime);
      }
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('loadedmetadata', onLoadedMetadata);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('loadedmetadata', onLoadedMetadata);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
    };
  }, [seeking]);

  useEffect(() => {
    if (!fullscreen) {
      setControlsVisible(true);
      return;
    }

    const showControls = () => {
      setControlsVisible(true);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      hideTimeout.current = setTimeout(() => setControlsVisible(false), 2000);
    };

    const handleMouseMove = () => showControls();
    const container = containerRef.current;

    container?.addEventListener('mousemove', handleMouseMove);
    showControls();

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [fullscreen]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        backgroundColor: 'rgba(94, 80, 63, 0.08)',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          onContextMenu={(e) => e.preventDefault()}
        />
      </Box>

      <VideoControls
        fullscreen={fullscreen}
        visible={controlsVisible}
        playing={playing}
        muted={muted}
        volume={volume}
        played={played}
        playedSeconds={playedSeconds}
        duration={duration}
        videoUrl={videoUrl}
        onPlayPause={handlePlayPause}
        onMute={handleMute}
        onVolumeChange={handleVolumeChange}
        onSeekChange={handleSeekChange}
        onSeekCommit={handleSeekCommit}
        onToggleFullscreen={toggleFullscreen}
      />
    </Box>
  );
}
