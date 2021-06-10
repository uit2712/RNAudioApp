import { IBottomSheetSectionWithType, IDrawerHomeContext, IPlayer, IRequestAudioHelper, ISortByBottomSheetContextWithType, } from '@interfaces/index';
import {
    getAudioHelperCurrentAudioInfo,
    initPlayer,
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

import { AudioStatusType } from 'types/index';
import { BackHandler } from 'react-native';
import { DrawerHomeContext } from '@context-api/index';
import React from 'react';
import Sound from 'react-native-sound';
import { shuffleArray } from '@functions/index';
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
            initialized(audioIndex).then((player?: Sound) => {
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
        getCurrentTime,
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


// export function useSoundPlayer(request: IRequestAudioHelper = {
//     listSounds: [],
//     isLogStatus: false,
//     timeRate: 15,
// }): ISoundPlayer {
//     const [listSounds, setListSounds] = React.useState(request.listSounds);
//     const [status, setStatus] = React.useState<AudioStatusType>('loading');

//     const [index, setIndex] = React.useState(-1);

//     function playAudioId(soundIndex: number) {
//         if (soundIndex !== index && soundIndex >= 0 && soundIndex < listSounds.length) {
//             setIndex(soundIndex);
//             setStatus('loading');
//             const { path, name, album, artist, cover, genre, duration  } = listSounds[soundIndex];
//             setInfo({
//                 ...info,
//                 name,
//                 album,
//                 artist,
//                 cover,
//                 genre,
//                 durationString: duration ?? formatTimeString(0),
//                 currentTime: 0,
//                 currentTimeString: formatTimeString(0),
//             })
//             SoundPlayer.loadUrl(path);
//         }
//     }

//     React.useEffect(() => {
//         const onFinishedPlayingSubscription = SoundPlayer.addEventListener('FinishedPlaying', ({ success }) => {
//             if (success) {
//                 if (isLoop() === false) {
//                     next();
//                 } else {
//                     repeat();
//                 }
//             }
//         });

//         return () => onFinishedPlayingSubscription.remove();
//     });

//     function repeat() {
//         seek(0);
//         resume();
//     }

//     // React.useEffect(() => {
//     //     const onFinishedLoadingSubscription = SoundPlayer.addEventListener('FinishedLoading', async ({ success }) => {
//     //         if (success) {
//     //             await getInfo();
//     //             setStatus('play');
//     //         }
//     //     });

//     //     return () => onFinishedLoadingSubscription.remove();
//     // });

//     React.useEffect(() => {
//         const onFinishedLoadingURLSubscription = SoundPlayer.addEventListener('FinishedLoadingURL', async ({ success }) => {
//             if (success) {
//                 SoundPlayer.play();
//                 await getInfo();
//                 setStatus('play');
//             }
//         });

//         return () => onFinishedLoadingURLSubscription.remove();
//     });

//     function pause() {
//         setStatus('pause');
//         SoundPlayer.pause();
//     }

//     function resume() {
//         setStatus('play');
//         SoundPlayer.resume();
//     }

//     function stop() {
//         setStatus('stop');
//         SoundPlayer.stop();
//     }

//     function next() {
//         if (hasSong()) {
//             setStatus('next');
//             const newIndex = (index + 1) % listSounds.length;
//             playAudioId(newIndex);
//         }
//     }

//     function previous() {
//         if (hasSong()) {
//             setStatus('previous');
//             const newIndex = index === 0 ? listSounds.length - 1 : index - 1;
//             playAudioId(newIndex);
//         }
//     }

//     function hasSong() {
//         return listSounds.length > 0;
//     }

//     function seek(seconds: number) {
//         SoundPlayer.seek(seconds);
//         resume();
//     }

//     const [loopTimes, setLoopTimes] = React.useState(0);
//     React.useEffect(() => {
//         // SoundPlayer.setNumberOfLoops(loopTimes);
//     }, [loopTimes]);
//     function loop() {
//         const newLoopTimes = getNextLoopsTime();
//         setLoopTimes(newLoopTimes);
//     }
//     function isLoop() {
//         return loopTimes !== 0;
//     }
//     function getNextLoopsTime() {
//         switch(loopTimes) {
//             default: return 0;
//             case 1: return -1;
//             case -1: return 0;
//             case 0: return 1;
//         }
//     }

//     const [info, setInfo] = React.useState<ICurrentAudioInfo>(AUDIO_HELPER_CURRENT_AUDIO_INFO);
//     async function getInfo() {
//         const { currentTime, duration } = await SoundPlayer.getInfo();
//         setInfo({
//             ...info,
//             currentTime,
//             duration,
//             currentTimeString: formatTimeString(currentTime * 1000),
//             durationString: formatTimeString(duration * 1000),
//         });
//     }

//     const [currentTime, setCurrentTime] = React.useState(0);
//     React.useEffect(() => {
//         console.log(currentTime);
//     }, [currentTime]);
//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             if (status === 'play') {
//                 SoundPlayer.getInfo()
//                     .then(({ currentTime }) => {
//                         // setInfo({
//                         //     ...info,
//                         //     currentTime,
//                         //     currentTimeString: formatTimeString(currentTime * 1000),
//                         // })
                        
//                         // setCurrentTime(currentTime);
//                     }).catch(() => {});
//             }
//         }, 100);

//         return () => clearInterval(interval);
//     });

//     const [isShuffle, setIsShuffle] = React.useState(false);
//     function shuffle() {
//         setIsShuffle(!isShuffle);
//     }
    
//     return {
//         setListSounds,
//         playAudioId,
//         pause,
//         resume,
//         stop,
//         next,
//         previous,
//         seek,
//         loop,
//         currentAudioInfo: info,
//         status,
//         isLoop: isLoop(),
//         shuffle,
//         isShuffle,
//     }
// }