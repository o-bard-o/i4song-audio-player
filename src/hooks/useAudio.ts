import React, { useState, useEffect } from 'react';

const useAudio = (url: string) => {
  const [audio, setAudio] = useState(new Audio(url)); 
  const [play, setPlay] = useState(false); 

  useEffect(() => {
    if (play) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [play]);

  return {
    play,
    audio,
    toggle: () => setPlay((prev) => !prev)
  };
};

export default useAudio;