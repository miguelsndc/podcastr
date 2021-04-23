import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Array<Episode>;
  currentEpisodeIndex: number;
  isPlaying: boolean;
  setIsPlayingState: (state: boolean) => void;
  togglePlay: () => void;
  playList: (list: Array<Episode>, index: number) => void;
  playNext: () => void;
  playPrevious: () => void;
  play: (episode: Episode) => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  isLooping: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  isShuffling: boolean;
  clearPlayerState: () => void;
};

type PlayerProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [episodeList, setEpisodeList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Array<Episode>, index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying((IsPlayingPrevState) => !IsPlayingPrevState);
  }

  function toggleLoop() {
    setIsLooping((isLoopingPrevState) => !isLoopingPrevState);
  }

  function toggleShuffle() {
    setIsShuffling((isShufflingPrevState) => !isShufflingPrevState);
  }

  function setIsPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || currentEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(
        Math.random() * episodeList.length
      );
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpisodeIndex((prevIndex) => prevIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpisodeIndex((prevIndex) => prevIndex - 1);
    }
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider
      value={{
        currentEpisodeIndex,
        episodeList,
        play,
        playList,
        togglePlay,
        isPlaying,
        setIsPlayingState,
        playPrevious,
        hasPrevious,
        playNext,
        hasNext,
        isLooping,
        toggleLoop,
        isShuffling,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
