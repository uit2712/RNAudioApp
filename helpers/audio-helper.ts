import { formatTimeString, shuffleArray } from '@functions/index';

import { AUDIO_HELPER_CURRENT_AUDIO_INFO } from '@constants/index';
import { AudioStatusType } from 'types/index';
import { ICurrentAudioInfo } from '@interfaces/index';
import React from 'react';
import { SoundFileType } from 'types/songs-screen-types';
import SoundPlayer from 'react-native-sound';

export function initPlayer({
    audioIndex,
    oldPlayer,
    listSounds,
    onError,
    onSuccess,
    onInitSettings,
}: {
    audioIndex: number,
    oldPlayer?: SoundPlayer,
    listSounds: SoundFileType[],
    onError: (error: Error) => void,
    onSuccess: (player?: SoundPlayer) => void,
    onInitSettings: (player?: SoundPlayer) => void,
}) {
    return new Promise((resolve: (value?: SoundPlayer) => void) => {
        if (audioIndex >= 0 && audioIndex < listSounds.length) {
            if (oldPlayer) {
                oldPlayer.release();
            }

            const currentAudio = listSounds[audioIndex];
            // If the audio is a 'require' then the second parameter must be the callback.
            let newPlayer: SoundPlayer | undefined;
            switch(currentAudio.type) {
                default: break;
                case 'app-bundle':
                    newPlayer = new SoundPlayer(currentAudio.path, currentAudio.basePath, (error: Error) => initPlayerCallback({
                        error,
                        onError: () => onError(error),
                        onSuccess: () => {
                            onSuccess(newPlayer);
                            resolve(newPlayer);
                        }
                    }));
                    break;
                case 'other':
                    newPlayer = new SoundPlayer(currentAudio.path, undefined, (error) => initPlayerCallback({
                        error,
                        onError: () => onError(error),
                        onSuccess: () => {
                            onSuccess(newPlayer);
                            resolve(newPlayer);
                        }
                    }));
                    break;
                case 'directory':
                    newPlayer = new SoundPlayer(currentAudio.path, (error) => initPlayerCallback({
                        error,
                        onError: () => onError(error),
                        onSuccess: () => {
                            onSuccess(newPlayer);
                            resolve(newPlayer);
                        }
                    }));
                    break;
            }
            onInitSettings && onInitSettings(newPlayer);
        } else {
            resolve(undefined);
        }
    });
}

export function initPlayerCallback({
    error,
    onSuccess,
    onError,
}: {
    error: Error,
    onSuccess?: () => void,
    onError?: () => void,
}) {
    if (error) {
        onError && onError();
    } else {
        onSuccess && onSuccess();
    }
}

export function useCurrentTime({
    player,
    status,
}: {
    player?: SoundPlayer,
    status: AudioStatusType,
}) {
    const [currentTime, setCurrentTime] = React.useState(0);

    function getCurrentTime(cb?: ((seconds: number, isPlaying: boolean) => void) | undefined) {
        player?.getCurrentTime(cb);
    }

    return {
        currentTime,
        setCurrentTime,
        getCurrentTime,
    }
}

export function useSpeed({
    player,
}: {
    player?: SoundPlayer,
}) {
    const [speed, setSpeed] = React.useState(1);
    function changeSpeed(value: number) {
        if (player && value > 0 && value <= 2) {
            player.setSpeed(value);
            setSpeed(value);
        }
    }

    return {
        speed,
        changeSpeed,
    }
}

export function useShuffle() {
    const [isShuffle, setIsShuffle] = React.useState(false);
    function shuffle() {
        setIsShuffle(!isShuffle);
    }

    return {
        isShuffle,
        shuffle,
    }
}

export function useAudioHelperDisabledButtonStatus({
    status,
    index,
    listSounds,
}: {
    status: AudioStatusType,
    index: number,
    listSounds: SoundFileType[],
}) {
    return {
        isDisabledButtonPlay: status === 'loading' || status === 'play',
        isDisabledButtonPause: status === 'loading' || status === 'pause' || status === 'stop',
        isDisabledButtonStop: status === 'loading' || status === 'stop',
        isDisabledButtonNext: status === 'loading' || index === listSounds.length - 1,
        isDisabledButtonPrevious: status === 'loading' || index === 0,
    }
}

export function getAudioHelperCurrentAudioInfo({
    index,
    listSounds,
    duration,
    currentTime,
}: {
    index: number,
    listSounds: SoundFileType[],
    duration: number,
    currentTime: number,
}): ICurrentAudioInfo {
    if (listSounds.length > 0 && index >= 0) {
        const currentSound = listSounds[index];
        return {
            name: currentSound.name,
            genre: currentSound.genre,
            artist: currentSound.artist,
            album: currentSound.album,
            other: currentSound.other,
            durationString: formatTimeString(duration * 1000),
            currentTimeString: formatTimeString(currentTime * 1000),
            duration,
            currentTime,
            cover: currentSound.cover,
            originalInfo: currentSound,
        }
    }

    return AUDIO_HELPER_CURRENT_AUDIO_INFO;
}

export function useIsLogStatus({
    isLogStatus,
    status,
}: {
    isLogStatus?: boolean,
    status: AudioStatusType,
}) {
    React.useEffect(() => {
        if (isLogStatus === true) {
            console.log(`${status}...`);
        }
    }, [isLogStatus, status])
}

export function useAudioHelperVolume() {
    const [volume, setVolume] = React.useState(100); // percent
    function changeVolume(player: SoundPlayer | undefined, volume: number) {
        if (player && volume >= 0 && volume <= 100) {
            player.setVolume(volume / 100.0);
            setVolume(volume);
        }
    }

    return {
        volume,
        changeVolume,
    }
}

export function useAudioHelperMuteAction({
    player,
    volume,
    changeVolume,
}: {
    player?: SoundPlayer,
    volume: number,
    changeVolume: (player: SoundPlayer | undefined, volume: number) => void,
}) {
    const [previousVolume, setPreviousVolume] = React.useState(volume);
    const [isMuted, setIsMuted] = React.useState(false);
    React.useEffect(() => {
        if (volume > 0 && isMuted === true) {
            setIsMuted(false);
        }
    }, [volume]);

    function mute() {
        if (isMuted === false) {
            setIsMuted(true);
            setPreviousVolume(volume);
            changeVolume(player, 0);
        }
    }

    function unmute() {
        if (isMuted === true) {
            setIsMuted(false);
            changeVolume(player, previousVolume);
        }
    }

    return {
        mute,
        unmute,
        isMuted,
    }
}

export function useChangeTime({
    player,
    timeRate,
    duration,
    setCurrentTime,
}: {
    player?: SoundPlayer,
    timeRate: number,
    duration: number,
    setCurrentTime: (seconds: number) => void,
}) {
    function increaseTime() {
        if (player) {
            player.getCurrentTime((seconds) => {
                if (seconds + timeRate < duration) {
                    seekToTime(seconds + timeRate)
                } else {
                    seekToTime(duration);
                }
            });
        }
    }

    function decreaseTime() {
        if (player) {
            player.getCurrentTime((seconds) => {
                if (seconds - timeRate > 0) {
                    seekToTime(seconds - timeRate);
                } else {
                    seekToTime(0);
                }
            });
        }
    }

    function seekToTime(seconds: number) {
        if (player) {
            player.setCurrentTime(seconds);
            setCurrentTime(seconds);
        }
    }

    return {
        increaseTime,
        decreaseTime,
        seekToTime,
    }
}

export function useRemainingIndices({
    listSounds,
    index,
}: {
    listSounds: SoundFileType[],
    index: number,
}) {
    const [remainingIndices, setRemainingIndices] = React.useState([...Array(listSounds.length).keys()].filter(value => value !== index));
    React.useEffect(() => {
        setRemainingIndices(remainingIndices.filter(value => value !== index));
    }, [index]);

    return {
        remainingIndices,
        setRemainingIndices,
    }
}

export function next({
    listSounds,
    index,
    setStatus,
    isShuffle,
    remainingIndices,
    setRemainingIndices,
    setIndex,
}: {
    listSounds: SoundFileType[],
    index: number,
    setStatus: (status: AudioStatusType) => void,
    isShuffle: boolean,
    remainingIndices: number[],
    setRemainingIndices: (indices: number[]) => void,
    setIndex: (index: number) => void,
}) {
    if (listSounds.length > 0) {
        
        let newIndex = -1;
        if (isShuffle === true) {
            let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
            setRemainingIndices(newRemainingIndices);
            newIndex = newRemainingIndices[0] as number;
        } else {
            newIndex = (index + 1) % listSounds.length;
        }
        if (newIndex !== index) {
            setStatus('next');
            setIndex(newIndex);
        }
    }
}

export function previous({
    listSounds,
    index,
    setStatus,
    isShuffle,
    remainingIndices,
    setRemainingIndices,
    setIndex,
}: {
    listSounds: SoundFileType[],
    index: number,
    setStatus: (status: AudioStatusType) => void,
    isShuffle: boolean,
    remainingIndices: number[],
    setRemainingIndices: (indices: number[]) => void,
    setIndex: (index: number) => void,
}) {
    if (listSounds.length > 0 && index >= 0) {
        let newIndex = -1;
        if (isShuffle === true) {
            let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
            setRemainingIndices(newRemainingIndices);
            newIndex = newRemainingIndices[0] as number;
        } else {
            newIndex = index - 1 >= 0 ? index - 1 : listSounds.length - 1;
        }
        if (newIndex !== index) {
            setStatus('previous');
            setIndex(newIndex);
        }
    }
}

export function useLoop() {
    const [isLoop, setIsLoop] = React.useState(false);
    function loop() {
        setIsLoop(!isLoop);
    }

    return {
        isLoop,
        loop,
    }
}