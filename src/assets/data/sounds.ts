export const soundData = {
  background : "/sounds/background.mp3",
  correct: "/sounds/correct.mp3",
  incorrect: "/sounds/incorrect.mp3",
  clock: "/sounds/clock.mp3",
  timer: "/sounds/timer.mp3",
  celebration: "/sounds/celebration.mp3",
};

/* export type objectAudio = {
  src: string;
  volume?: number;
  loop?: boolean;
};

const sound = ({ src, volume = 1, loop = false }: objectAudio) => {
  const audio = new Audio(src);
  (audio.volume = volume), (audio.loop = loop);

  return audio;
};

export const soundBackground = sound({
  src: "/sounds/background.mp3",
  volume: 0.2,
  loop: true,
});

export const soundCorrect = sound({ src: "/sounds/correct.mp3" });

export const soundIncorrect = sound({ src: "/sounds/incorrect.mp3" });

export const soundClock = sound({ src: "/sounds/clock.mp3" });

export const soundTimer = sound({ src: "/sounds/timer.mp3" });

export const soundCelebration = sound({ src: "/sounds/celebration.mp3" }); */
