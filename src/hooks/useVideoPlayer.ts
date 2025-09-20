/**
 * Custom hook per gestire il video player
 * Estrae la logica complessa dal componente Hero
 */

import * as React from 'react';

export type VideoPlayerState = {
  isPlaying: boolean;
  isPaused: boolean;
  isMuted: boolean;
  volumePercent: number;
  lastVolumeBeforeMute: number;
  videoFirstFrameSrc: string | null;
};

type VideoPlayerActions = {
  setIsPlaying: (playing: boolean) => void;
  handleToggleMute: () => void;
  handleVolumeChange: (percent: number) => void;
  handleTogglePlay: () => Promise<void>;
};

export type UseVideoPlayerReturn = VideoPlayerState & VideoPlayerActions;

export const useVideoPlayer = (videoRef: React.RefObject<HTMLVideoElement | null>) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [volumePercent, setVolumePercent] = React.useState<number>(50);
  const [lastVolumeBeforeMute, setLastVolumeBeforeMute] = React.useState<number>(50);
  const [videoFirstFrameSrc, setVideoFirstFrameSrc] = React.useState<string | null>(null);

  // Controls hide timer
  const controlsHideTimerRef = React.useRef<number | null>(null);

  /**
   * Toggle mute/unmute del video
   */
  const handleToggleMute = React.useCallback(() => {
    const next = !isMuted;
    setIsMuted(next);
    const video = videoRef.current;
    if (video) {
      video.muted = next;
      if (next) {
        if (volumePercent > 0) setLastVolumeBeforeMute(volumePercent);
        setVolumePercent(0);
        video.volume = 0;
      } else {
        const restore = lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : 50;
        setVolumePercent(restore);
        video.volume = restore / 100;
      }
    }
  }, [isMuted, volumePercent, lastVolumeBeforeMute, videoRef]);

  /**
   * Gestisce il cambio di volume
   */
  const handleVolumeChange = React.useCallback((nextPercent: number) => {
    const clamped = Math.max(0, Math.min(100, nextPercent));
    setVolumePercent(clamped);
    const video = videoRef.current;
    if (video) {
      video.volume = clamped / 100;
      const shouldMute = clamped === 0;
      setIsMuted(shouldMute);
      video.muted = shouldMute;
    }
  }, [videoRef]);

  /**
   * Toggle play/pause del video
   */
  const handleTogglePlay = React.useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      try {
        await video.play();
        setIsPaused(false);
      } catch {
        // ignore
      }
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, [videoRef]);

  /**
   * Genera il primo frame del video come poster
   */
  React.useEffect(() => {
    let isCancelled = false;
    const generateFirstFrame = async () => {
      try {
        const video = document.createElement("video");
        video.src = "/videos/hero.mp4";
        video.preload = "auto";
        video.muted = true;
        video.playsInline = true;
        await new Promise<void>((resolve) => {
          const onLoaded = () => resolve();
          video.addEventListener("loadeddata", onLoaded, { once: true });
        });
        // Seek a tiny bit to avoid possible black first frame
        await new Promise<void>((resolve) => {
          const onSeeked = () => resolve();
          video.currentTime = 0.1;
          video.addEventListener("seeked", onSeeked, { once: true });
        });
        if (isCancelled) return;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/webp", 0.9);
        setVideoFirstFrameSrc(dataUrl);
      } catch {
        // Silently ignore and keep fallback image
      }
    };
    generateFirstFrame();
    return () => {
      isCancelled = true;
    };
  }, []);

  /**
   * Gestisce l'avvio del video quando isPlaying diventa true
   */
  React.useEffect(() => {
    if (!isPlaying) return;
    const video = videoRef.current;
    if (!video) return;
    const handleCanPlay = () => {
      // Video ready - nessuna azione necessaria
    };
    video.addEventListener("canplay", handleCanPlay, { once: true });
    const tryPlay = async () => {
      try {
        video.muted = isMuted;
        video.volume = volumePercent / 100;
        await video.play();
        setIsPaused(false);
      } catch {
        try {
          video.muted = true;
          await video.play();
          setIsMuted(true);
          setIsPaused(false);
        } catch {
          // Se fallisce ancora, manteniamo l'immagine
        }
      }
    };
    void tryPlay();
    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [isPlaying, isMuted, volumePercent, videoRef]);

  /**
   * Gestisce l'auto-hide dei controlli
   */
  React.useEffect(() => {
    if (!isPlaying) return;
    const container = document.querySelector('[data-controls]') as HTMLElement | null;
    if (!container) return;
    const root = container.parentElement as HTMLElement | null;
    if (!root) return;
    const showControls = () => container.setAttribute('data-hidden', 'false');
    const hideControls = () => container.setAttribute('data-hidden', 'true');
    const scheduleHide = () => {
      if (controlsHideTimerRef.current) window.clearTimeout(controlsHideTimerRef.current);
      controlsHideTimerRef.current = window.setTimeout(() => hideControls(), 2000);
    };
    const onMove = () => {
      showControls();
      scheduleHide();
    };
    root.addEventListener('mousemove', onMove);
    root.addEventListener('touchstart', onMove);
    showControls();
    scheduleHide();
    return () => {
      root.removeEventListener('mousemove', onMove);
      root.removeEventListener('touchstart', onMove);
      if (controlsHideTimerRef.current) window.clearTimeout(controlsHideTimerRef.current);
    };
  }, [isPlaying]);

  /**
   * Keyboard shortcuts
   */
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleToggleMute();
      }
      if (e.key.toLowerCase() === 'k' || e.key === ' ') {
        e.preventDefault();
        void handleTogglePlay();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPlaying, handleToggleMute, handleTogglePlay]);

  return {
    // State
    isPlaying,
    isPaused,
    isMuted,
    volumePercent,
    lastVolumeBeforeMute,
    videoFirstFrameSrc,
    // Actions
    setIsPlaying,
    handleToggleMute,
    handleVolumeChange,
    handleTogglePlay,
  };
};
