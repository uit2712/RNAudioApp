import { IDrawerHomeContext, IPlayer, IRequestAudioHelper } from '@interfaces/index';
import {
    getAudioHelperCurrentAudioInfo,
    useAudioHelperDisabledButtonStatus,
    useAudioHelperMuteAction,
    useAudioHelperVolume,
    useChangeTime,
    useCurrentTime,
    useIsLogStatus,
    useShuffle,
    useSpeed
} from '@helpers/audio-helper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AudioStatusType } from '@types/index';
import { BackHandler } from 'react-native';
import { DrawerHomeContext } from '@context-api/index';
import React from 'react';
import SoundPlayer from 'react-native-sound';
import { shuffleArray } from '@functions/index';
import { useGetAllAlbums } from './albums-screen-hooks';
import { useGetAllArtists } from './artists-screen-hooks';
import { useGetAllMusicFiles } from './songs-screen-hooks';

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
    const [player, setPlayer] = React.useState<SoundPlayer>();
    const { currentTime, setCurrentTime } = useCurrentTime({ player, status });
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
    useIsLogStatus({ status, isLogStatus: request.isLogStatus });

    function initialized(audioIndex: number) {
        return initPlayer({
            audioIndex,
            listSounds,
            oldPlayer: player,
            onInitSettings: (newPlayer?: SoundPlayer) => {
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
            onSuccess: (player?: SoundPlayer) => {
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
                next();
            } else {
                repeat();
            }
        }
    }

    function repeat() {
        setCurrentTime(0);
        play();
    }

    function playCurrentIndex(player?: SoundPlayer) {
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
            initialized(index).then((result?: SoundPlayer) => {
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

    const [remainingIndices, setRemainingIndices] = React.useState([...Array(listSounds.length).keys()].filter(value => value !== index));
    React.useEffect(() => {
        setRemainingIndices(remainingIndices.filter(value => value !== index));
    }, [index]);
    
    function next() {
        if (listSounds.length > 0) {
            setStatus('next');
            
            let newIndex = -1;
            if (isShuffle === true) {
                let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
                setRemainingIndices(newRemainingIndices);
                newIndex = newRemainingIndices[0] as number;
            } else {
                newIndex = (index + 1) % listSounds.length;
            }
            playAudio(newIndex);
        }
    }

    function previous() {
        if (listSounds.length > 0 && index >= 0) {
            setStatus('previous');

            let newIndex = -1;
            if (isShuffle === true) {
                let newRemainingIndices = shuffleArray(remainingIndices.length === 0 ? [...Array(listSounds.length).keys()].filter(value => value !== index) : remainingIndices);
                setRemainingIndices(newRemainingIndices);
                newIndex = newRemainingIndices[0] as number;
            } else {
                newIndex = index - 1 >= 0 ? index - 1 : listSounds.length - 1;
            }
            playAudio(newIndex);
        }
    }

    

    const [isLoop, setIsLoop] = React.useState(false);
    function loop() {
        setIsLoop(!isLoop);
    }

    function playAudio(audioIndex: number) {
        if (audioIndex !== index) {
            initialized(audioIndex).then((player?: SoundPlayer) => {
                if (player) {
                    playCurrentIndex(player);
                }
            }).catch(() => {});
        }
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

    return {
        ...disabledButtonStatus,
        ...getPlayerSettings(),
        play: () => play(),
        pause,
        stop,
        next,
        previous,
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
    }
}

export function useDrawHomeSettings(): IDrawerHomeContext {
    const [isShowTabBar, setIsShowTabBar] = React.useState(true);

    return {
        isShowTabBar,
        setIsShowTabBar,
    }
}

export function useHomeBottomTabHelper() {
    const { setIsShowTabBar } = React.useContext(DrawerHomeContext);
    const navigation = useNavigation();
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => setIsShowTabBar(false));
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                setIsShowTabBar(true);
                return false;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return {
        setIsShowTabBar,
    }
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