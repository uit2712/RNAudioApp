import {
    IBottomSheetSectionWithType,
    IDrawerHomeContext,
    IPlayer,
    IRequestAudioHelper,
    ISortByBottomSheetContextWithType,
} from '@interfaces/index';
import {
    getAudioHelperCurrentAudioInfo,
    initPlayer,
    next,
    previous,
    useAudioHelperDisabledButtonStatus,
    useAudioHelperMuteAction,
    useAudioHelperVolume,
    useChangeTime,
    useCurrentTime,
    useIsLogStatus,
    useLoop,
    useRemainingIndices,
    useShuffle,
    useSpeed
} from '@helpers/audio-helper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AudioStatusType } from 'types/index';
import { BackHandler } from 'react-native';
import { DrawerHomeContext, } from '@context-api/index';
import React from 'react';
import Sound from 'react-native-sound';
import { SoundFileType } from 'types/songs-screen-types';
import { useGetAllAlbums } from '@hooks/albums-screen-hooks';
import { useGetAllArtists } from '@hooks/artists-screen-hooks';
import { useGetAllMusicFiles } from '@hooks/songs-screen-hooks';

export function useAudioHelper(request: IRequestAudioHelper = {
    listSounds: [],
    isLogStatus: false,
    timeRate: 15,
    isAutoplayOnLoad: false,
}): IPlayer {
    const [timeRate, setTimeRate] = React.useState(request.timeRate ?? 15); // seconds
    const [status, setStatus] = React.useState<AudioStatusType>('loading');
    const [errorMessage, setErrorMessage] = React.useState('');
    const [listSounds, setListSounds] = React.useState(request.listSounds);
    const [index, setIndex] = React.useState(-1);
    const { isShuffle, shuffle } = useShuffle();
    const [duration, setDuration] = React.useState(0);
    const [player, setPlayer] = React.useState<Sound>();
    const { currentTime, setCurrentTime, getCurrentTime, } = useCurrentTime({ player, status });
    const { speed, changeSpeed } = useSpeed({ player });
    const { volume, changeVolume } = useAudioHelperVolume();
    const { isMuted, mute, unmute } = useAudioHelperMuteAction({ player, volume, changeVolume });
    const disabledButtonStatus = useAudioHelperDisabledButtonStatus({ status, index, listSounds });
    const { decreaseTime, increaseTime, seekToTime } = useChangeTime({
        player,
        duration,
        timeRate,
        setCurrentTime,
    });
    const { remainingIndices, setRemainingIndices } = useRemainingIndices({ listSounds, index });
    const { isLoop, loop } = useLoop();
    useIsLogStatus({ status, isLogStatus: request.isLogStatus });

    function initialized(audioIndex: number) {
        return initPlayer({
            audioIndex,
            listSounds,
            oldPlayer: player,
            onInitSettings: (newPlayer?: Sound) => {
                if (newPlayer) {
                    setIndex(audioIndex);
                    seekToTime(0);
                    setPlayer(newPlayer);
                }
            },
            onError: (error: Error) => {
                setStatus('error');
                setErrorMessage(error.message);
            },
            onSuccess: (player?: Sound) => {
                if (player) {
                    setStatus('success');
                    setErrorMessage('');
                    player.setSpeed(speed);
                    player.setCurrentTime(0);
                    setDuration(player.getDuration());
                    changeVolume(player, volume);
                }
            }
        })
    }

    function playComplete(isEnd: boolean) {
        if (isEnd === true) {
            if (isLoop === false) {
                _next();
            } else {
                repeat();
            }
        }
    }

    function repeat() {
        setCurrentTime(0);
        play();
    }

    function playCurrentIndex(player?: Sound) {
        if (player) {
            if (isMuted === true) {
                changeVolume(player, 0);
            }
            player.play(playComplete);
            setStatus('play');
        }
    }

    function play() {
        if (!player) {
            initialized(index).then((result?: Sound) => {
                playCurrentIndex(result);
            }).catch(() => {});
        } else {
            playCurrentIndex(player);
        }
    }

    function pause() {
        if (player) {
            player.pause();
            setStatus('pause');
        }
    }

    function stop() {
        if (player) {
            player.stop();
            setStatus('stop');
        }
    }

    function playAudio(audioIndex: number) {
        setIndex(audioIndex);
    }

    function _next() {
        next({
            index,
            isShuffle,
            listSounds,
            remainingIndices,
            setIndex,
            setRemainingIndices,
            setStatus,
        })
    }


    function getPlayerSettings() {
        return {
            timeRate,
            speed,
            isShuffle,
            isLoop,
            isMuted,
            volume,
            currentIndex: index,
            listSounds,
        }
    }

    function setListSoundsAndPlay(listSounds: SoundFileType[], audioIndex: number) {
        setListSounds(listSounds);
        setIndex(audioIndex);
    }
    React.useEffect(() => {
        initialized(index).then((player?: Sound) => {
            if (player) {
                playCurrentIndex(player);
            }
        }).catch(() => {});
    }, [index]);

    return {
        ...disabledButtonStatus,
        ...getPlayerSettings(),
        play,
        pause,
        stop,
        next: _next,
        previous: () => previous({
            index,
            isShuffle,
            listSounds,
            remainingIndices,
            setIndex,
            setRemainingIndices,
            setStatus,
        }),
        increaseTime,
        decreaseTime,
        seekToTime,
        setSpeed: (speed: number) => changeSpeed(speed),
        shuffle,
        loop,
        mute,
        unmute,
        setVolume: (volume: number) => changeVolume(player, volume),
        playAudio,
        status,
        duration,
        currentTime,
        currentAudioInfo: getAudioHelperCurrentAudioInfo({ index, currentTime, duration, listSounds }),
        errorMessage,
        setListSounds,
        getCurrentTime,
        setCurrentTime,
        setListSoundsAndPlay,
    }
}

export function useDrawHomeSettings(): IDrawerHomeContext {
    const [isShowTabBar, setIsShowTabBar] = React.useState(true);
    const [isShowMiniPlayer, setIsShowMiniPlayer] = React.useState(true);

    return {
        isShowTabBar,
        isShowMiniPlayer,
        setIsShowTabBar,
        setIsShowMiniPlayer,
    }
}

export function useHomeBottomTabHelper({
    onFocus,
    onBack,
}: {
    onFocus?: () => void,
    onBack?: () => void,
}) {
    const navigation = useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            onFocus && onFocus();
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                onBack && onBack();
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );
}

/**
 * Get all data includes: songs, artists, albums
 */
export function useGetAllData() {
    const songsData = useGetAllMusicFiles();
    const artistsData = useGetAllArtists();
    const albumsData = useGetAllAlbums();
    return {
        isGetAllDataFinished: songsData.isFinished && artistsData.isFinished && albumsData.isFinished,
    }
}

/**
 * 
 * @param callback The function callback should call when isRefresh=true
 */
export function useRefresh(callback: () => Promise<any>) {
    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            callback().then(() => {
                setIsRefresh(false);
            }).catch(() => {
                setIsRefresh(false);
            });
        }
    }, [isRefresh]);

    return {
        isRefresh,
        setIsRefresh,
    }
}

export function useSortByBottomSheetSettings<T>(request: IBottomSheetSectionWithType<T>[]): ISortByBottomSheetContextWithType<T> {
    const [isShowSortByBottomSheet, setIsShowSortByBottomSheet] = React.useState(false);
    const [data, setData] = React.useState(request);
    React.useEffect(() => {
        request.forEach((section) => section.selectedType = section.defaultSelectedType);
    }, []);

    function setSelectedType(sectionIndex: number, selectedType: T) {
        if (sectionIndex >= 0 && sectionIndex < data.length) {
            const newData = [...data];
            newData[sectionIndex].selectedType = selectedType;
            setData(newData);
            setIsShowSortByBottomSheet(false);
        }
    }

    function getSelectedType(sectionIndex: number) {
        return data[sectionIndex].selectedType;
    }

    return {
        isShowSortByBottomSheet,
        setIsShowSortByBottomSheet,
        setSelectedType,
        data,
        getSelectedType,
    }
}

export function useDisabledButton() {
    const [isDisabled, setIsDisabled] = React.useState(false);

    return {
        isDisabled,
        disable: () => setIsDisabled(true),
        enable: () => setIsDisabled(false),
    }
}