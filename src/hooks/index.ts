/**
 * Hooks layer - Export centralizzato per tutti i custom hooks
 * Segue il pattern di separazione logica per migliore riusabilità
 */

export { useVideoPlayer, type UseVideoPlayerReturn, type VideoPlayerState } from './useVideoPlayer';
export { useClientMount, useAnimationReady } from './useClientMount';
