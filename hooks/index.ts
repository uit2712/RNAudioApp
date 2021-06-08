import { ICurrentAudioInfo, IDrawerHomeContext, IPlayer, IRequestAudioHelper } from '@interfaces/index';
import { formatTimeString, shuffleArray } from '@functions/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AudioStatusType } from '@types/index';
import { BackHandler } from 'react-native';
import { DrawerHomeContext } from '@context-api/index';
import React from 'react';
import { SoundFileType } from '@types/songs-screen-types';
import SoundPlayer from 'react-native-sound';
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

function initPlayer({
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

function initPlayerCallback({
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

function useCurrentTime({
    player,
    status,
}: {
    player?: SoundPlayer,
    status: AudioStatusType,
}) {
    const [currentTime, setCurrentTime] = React.useState(0);
    React.useEffect(() => {
        const interval = setInterval(() => {
            if (player && status === 'play') {
                player.getCurrentTime((seconds: number) => {
                    setCurrentTime(seconds);
                })
            }
        }, 100);

        return () => clearInterval(interval);
    });

    return {
        currentTime,
        setCurrentTime,
    }
}

function useSpeed({
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

function useShuffle() {
    const [isShuffle, setIsShuffle] = React.useState(false);
    function shuffle() {
        setIsShuffle(!isShuffle);
    }

    return {
        isShuffle,
        shuffle,
    }
}

function useAudioHelperDisabledButtonStatus({
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

function getAudioHelperCurrentAudioInfo({
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
        }
    }

    return {
        name: '',
        genre: '',
        artist: '',
        album: '',
        other: '<unknown>',
        durationString: formatTimeString(0),
        currentTimeString: formatTimeString(0),
        duration,
        currentTime,
    }
}

function useIsLogStatus({
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

function useAudioHelperVolume() {
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

function useAudioHelperMuteAction({
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