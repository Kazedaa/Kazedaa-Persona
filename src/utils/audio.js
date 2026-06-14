let selectAudio = null;

export const playSelectSound = () => {
  if (typeof window === 'undefined') return;
  
  if (!selectAudio) {
    selectAudio = new Audio('/audio/select.mp3');
    selectAudio.volume = 0.5;
  }
  
  // Reset playback position
  selectAudio.currentTime = 0;
  selectAudio.play().catch(() => {});
};
