import { IDrawerHomeContext, IPlayer, IRequestAudioHelper } from '../interfaces';
import { formatTimeString, shuffleArray } from '@functions/index';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { AudioStatusType } from '../types/index';
import { BackHandler } from 'react-native';
import { DrawerHomeContext } from '@context-api/index';
import React from 'react';
import SoundPlayer from 'react-native-sound';
import { useGetAllAlbums } from './albums-screen-hooks';
import { useGetAllArtists } from './artists-screen-hooks';
import { useGetAllMusicFiles } from './songs-screen-hooks';
import { useGetPlaylists } from '../store/selectors/playlists-screen-selectors';

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

    const [speed, setSpeed] = React.useState(1);
    function changeSpeed(value: number) {
        if (player && value > 0 && value <= 2) {
            player.setSpeed(value);
            setSpeed(value);
        }
    }

    const [duration, setDuration] = React.useState(0);
    const [player, setPlayer] = React.useState<SoundPlayer>();

    function initPlayer(audioIndex: number) {
        return new Promise((resolve: (value?: SoundPlayer) => void) => {
            if (audioIndex >= 0 && audioIndex < listSounds.length) {
                if (player) {
                    player.release();
                }
    
                const callback = (error: Error, player?: SoundPlayer) => {
                    if (!player) {
                        resolve(undefined);
                        return;
                    }
        
                    if (error) {
                        setStatus('error');
                        setErrorMessage(error.message);
                    } else {
                        setStatus('success');
                        setErrorMessage('');
                    }
                    player.setSpeed(speed);
                    player.setCurrentTime(0);
                    setDuration(player.getDuration());
                    changeVolume(player, volume);
                    resolve(player);
                    return;
                }
                
                const currentAudio = listSounds[audioIndex];
                // If the audio is a 'require' then the second parameter must be the callback.
                let newPlayer: SoundPlayer | undefined;
                switch(currentAudio.type) {
                    default: break;
                    case 'app-bundle':
                        newPlayer = new SoundPlayer(currentAudio.path, currentAudio.basePath, (error: Error) => callback(error, newPlayer));
                        break;
                    case 'other':
                        newPlayer = new SoundPlayer(currentAudio.path, undefined, (error) => callback(error, newPlayer));
                        break;
                    case 'directory':
                        newPlayer = new SoundPlayer(currentAudio.path, (error) => callback(error, newPlayer));
                        break;
                }
                if (newPlayer) {
                    setIndex(audioIndex);
                    seekToTime(0);
                    setPlayer(newPlayer);
                }
            } else {
                resolve(undefined);
            }
        });
    }

    const [index, setIndex] = React.useState(-1);
    const [isShuffle, setIsShuffle] = React.useState(false);
    function shuffle() {
        setIsShuffle(!isShuffle);
    }

    React.useEffect(() => {
        if (request.isLogStatus === true) {
            switch(status) {
                default: break;
                case 'loading':
                    console.log('loading...');
                    break;
                case 'next':
                    console.log('next...');
                    break;
                case 'pause':
                    console.log('pause...');
                    break;
                case 'play':
                    console.log('play...');
                    break;
                case 'previous':
                    console.log('previous...');
                    break;
                case 'stop':
                    console.log('stop...');
                    break;
                case 'error':
                    console.log('error...');
                    break;
                case 'success':
                    console.log('success...');
                    break;
            }
        }
    }, [request.isLogStatus, status])

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
            initPlayer(index).then((result?: SoundPlayer) => {
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

    const [volume, setVolume] = React.useState(100); // percent
    const [previousVolume, setPreviousVolume] = React.useState(volume);
    function changeVolume(player: SoundPlayer | undefined, volume: number) {
        if (player && volume >= 0 && volume <= 100) {
            player.setVolume(volume / 100.0);
            setVolume(volume);
        }
    }


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

    function playAudio(audioIndex: number) {
        if (audioIndex !== index) {
            initPlayer(audioIndex).then((player?: SoundPlayer) => {
                if (player) {
                    playCurrentIndex(player);
                }
            }).catch(() => {});
        }
    }

    function getDurationString() {
        return formatTimeString(duration * 1000);
    }

    function getCurrentTimeString() {
        return formatTimeString(currentTime * 1000);
    }

    function getCurrentAudioName() {
        return listSounds.length > 0 && index >= 0 && index < listSounds.length ? listSounds[index].name : '';
    }

    function getCurrentAudioInfo() {
        if (listSounds.length > 0 && index >= 0) {
            const currentSound = listSounds[index];
            return {
                name: currentSound.name,
                genre: currentSound.genre,
                artist: currentSound.artist,
                album: currentSound.album,
                other: currentSound.other,
                durationString: getDurationString(),
                currentTimeString: getCurrentTimeString(),
                duration,
                currentTime,
                cover: currentSound.cover,
            }
        }

        return null;
    }

    function isDisabledButtonPlay() {
        return status === 'loading' || status === 'play';
    }

    function isDisabledButtonPause() {
        return status === 'loading' || status === 'pause' || status === 'stop';
    }

    function isDisabledButtonStop() {
        return status === 'loading' || status === 'stop';
    }

    function isDisabledButtonNext() {
        return status === 'loading' || index === listSounds.length - 1;
    }

    function isDisabledButtonPrevious() {
        return status === 'loading' || index === 0;
    }

    return {
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
        durationString: getDurationString(),
        currentTimeString: getCurrentTimeString(),
        currentAudioName: getCurrentAudioName(),
        currentAudioInfo: getCurrentAudioInfo(),
        isDisabledButtonPlay: isDisabledButtonPlay(),
        isDisabledButtonPause: isDisabledButtonPause(),
        isDisabledButtonStop: isDisabledButtonStop(),
        isDisabledButtonNext: isDisabledButtonNext(),
        isDisabledButtonPrevious: isDisabledButtonPrevious(),
        timeRate,
        speed,
        isShuffle,
        errorMessage,
        isLoop,
        isMuted,
        volume,
        currentIndex: index,
        setListSounds,
        listSounds,
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

export function useGetAllData() {
    const songsData = useGetAllMusicFiles();
    const artistsData = useGetAllArtists();
    const albumsData = useGetAllAlbums();
    return {
        isGetAllDataFinished: songsData.isFinished && artistsData.isFinished && albumsData.isFinished,
    }
}