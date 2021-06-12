import * as React from 'react';

import { IDrawerHomeContext, IPlayer, ISortByBottomSheetContextWithType, } from '@interfaces/index';

import { AUDIO_HELPER_CURRENT_AUDIO_INFO } from '@constants/index';
import { SoundFileType } from 'types/songs-screen-types';

export const SoundPlayerContext = React.createContext<IPlayer>({
    currentTime: 0,
    duration: 0,
    errorMessage: '',
    isDisabledButtonNext: false,
    isDisabledButtonPause: false,
    isDisabledButtonPlay: false,
    isDisabledButtonPrevious: false,
    isDisabledButtonStop: false,
    isLoop: false,
    isMuted: false,
    isShuffle: false,
    speed: 1,
    status: 'loading',
    timeRate: 15, // seconds
    volume: 100, // percent
    currentIndex: -1,
    listSounds: [],
    currentAudioInfo: AUDIO_HELPER_CURRENT_AUDIO_INFO,
    decreaseTime: () => {},
    increaseTime: () => {},
    loop: () => {},
    mute: () => {},
    next: () => {},
    pause: () => {},
    play: () => {},
    previous: () => {},
    seekToTime: (seconds: number) => {},
    setSpeed: (speed: number) => {},
    setVolume: (volume: number) => {},
    shuffle: () => {},
    stop: () => {},
    unmute: () => {},
    playAudio: (audioIndex: number) => {},
    setListSounds: (listSounds: SoundFileType[]) => {},
    getCurrentTime: (cb?: ((seconds: number, isPlaying: boolean) => void) | undefined) => {},
    setCurrentTime: (seconds: number) => {},
    setListSoundsAndPlay: (listSounds: SoundFileType[], audioIndex: number) => {},
});

export const DrawerHomeContext = React.createContext<IDrawerHomeContext>({
    isShowTabBar: true,
    setIsShowTabBar: (isShowTabBar: boolean) => {},
    isShowMiniPlayer: true,
    setIsShowMiniPlayer: (isShowMiniPlayer: boolean) => {},
});

export const SortByBottomSheetContext = React.createContext<ISortByBottomSheetContextWithType<string>>({
    isShowSortByBottomSheet: false,
    setIsShowSortByBottomSheet: (isVisible: boolean) => {},
    setSelectedType: (sectionIndex: number, selectedType: string) => {},
    getSelectedType: (sectionIndex: number) => '',
    data: [],
});