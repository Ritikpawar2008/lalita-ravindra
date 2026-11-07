import React, { useEffect, useRef, useCallback } from 'react';

interface AudioControllerProps {
  autoPlayTrigger?: boolean;
}

/**
 * AudioController
 * Persistent background audio manager at the application root.
 * Completely headless — NO visible toggle buttons or icons anywhere in the invitation.
 * Automatically attempts playback on load, with graceful fallback to the first deliberate
 * user interaction (lotus tap, seal tap, or screen gesture).
 * Continuous, gapless infinite looping at a comfortable background volume (0.6).
 */
export const AudioController: React.FC<AudioControllerProps> = ({ 
  autoPlayTrigger = false,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const attemptPlay = useCallback((): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return Promise.resolve(false);

    // If already playing, keep looping seamlessly without restarting
    if (!audio.paused) {
      return Promise.resolve(true);
    }

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      return playPromise
        .then(() => true)
        .catch(() => {
          // Browser autoplay policy blocked unprompted audio;
          // will resume on first deliberate user gesture
          return false;
        });
    }
    return Promise.resolve(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set configuration: comfortable classical background volume & loop
    audio.volume = 0.6;
    audio.loop = true;

    // Mobile WebView loop fallback to guarantee continuous playback
    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    audio.addEventListener('ended', handleEnded);

    // 1. Attempt playback immediately upon page load
    attemptPlay();

    // 2. Fallback: on first deliberate user interaction anywhere on the screen
    const onUserInteraction = () => {
      if (audio.paused) {
        attemptPlay();
      }
    };

    const interactionEvents = ['pointerdown', 'touchstart', 'click', 'keydown'];
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, onUserInteraction, { passive: true, once: true });
    });

    return () => {
      audio.removeEventListener('ended', handleEnded);
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserInteraction);
      });
    };
  }, [attemptPlay]);

  // When ceremony progression triggers (e.g. lotus tap or seal tap)
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current?.paused) {
      attemptPlay();
    }
  }, [autoPlayTrigger, attemptPlay]);

  return (
    <audio
      id="bgMusic"
      ref={audioRef}
      src="/audio/sakharpuda-music.mp3"
      loop
      preload="auto"
      playsInline
      style={{ display: 'none' }}
    />
  );
};
