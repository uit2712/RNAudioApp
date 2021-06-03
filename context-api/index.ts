import * as React from 'react';
import { IResponseAudioHelper, SoundFileType } from '../hooks';

export const SoundPlayerContext = React.createContext<IResponseAudioHelper>({
    currentAudioName: '',
    currentTime: 0,
    currentTimeString: '',
    duration: 0,
    durationString: '',
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
    currentAudioInfo: null,
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
});

import { IDrawerHomeContext } from '../interfaces';
export const DrawerHomeContext = React.createContext<IDrawerHomeContext>({
    isShowTabBar: true,
    setIsShowTabBar: (isShowTabBar: boolean) => {},
});