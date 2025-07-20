import { useRef, useCallback } from 'react';

export const useSound = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((soundPath: string, volume = 0.5) => {
    try {
      // Создаем новый аудио элемент для каждого воспроизведения
      const audio = new Audio(soundPath);
      audio.volume = volume;
      audio.preload = 'auto';
      
      // Проигрываем звук
      audio.play().catch((error) => {
        console.warn('Не удалось воспроизвести звук:', error);
      });

      audioRef.current = audio;
    } catch (error) {
      console.warn('Ошибка при создании аудио:', error);
    }
  }, []);

  const playCaseOpenSound = useCallback(() => {
    playSound('/sounds/case-open.mp3', 0.7);
  }, [playSound]);

  return {
    playSound,
    playCaseOpenSound
  };
};