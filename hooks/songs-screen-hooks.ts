import { PERMISSIONS, check } from 'react-native-permissions';
import RN, { PermissionsAndroid } from 'react-native';

import { ITrackInfo } from '@interfaces/songs-screen-interfaces';
import MusicFiles from 'react-native-get-music-files';
import React from 'react';
import { SoundFileType } from 'types/songs-screen-types';
import { avatarHelper } from '@helpers/songs-screen-helpers';
import { formatTimeString } from '@functions/index';
import { setListSongs } from '@store/actions/songs-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetAllSongsSelector } from '@store/selectors/songs-screen-selectors';

export function useGetAllMusicFiles() {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();
    function getAllMusicFiles() {
        setIsLoading(true);
        MusicFiles.getAll({
            id: true, // get id
            artist: true, // get artist
            duration: true, // get duration
            genre: true, // get genre
            title: true, // get title
            fileName: true, // get file name
            displayName: true,
            albumArtist: true,
            author: true,
            album: true,
            blured: true,
        }).then((tracks: ITrackInfo[]) => {
            const songs: SoundFileType[] = tracks.map((item: ITrackInfo) => ({
                type: 'other',
                id: item.id,
                name: item.title ?? '',
                path: item.path ?? '',
                author: item.artist,
                album: item.album,
                genre: item.genre,
                cover: item.cover ?? avatarHelper.getAvatar(),
                duration: formatTimeString(item.duration ? Number(item.duration) : 0),
                other: item.author ?? item.artist ?? item.album ?? item.albumArtist ?? '<unknown>',
                bluredImage: item.blur,
            }));
            dispatch(setListSongs(songs));
            setIsLoading(false);
        }).catch((error: Error) => {
            setIsLoading(false);
            setErrorMessage(error.message);
        });
    }

    const { songs, isLoadFirstTime } = useGetAllSongsSelector();
    const [errorMessage, setErrorMessage] = React.useState('');
    const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    React.useEffect(() => {
        if (isLoadFirstTime === false) {
            setIsLoading(true);
            check(permission)
                .then((result) => {
                    setIsLoading(false);
                    if (result === 'granted') {
                        getAllMusicFiles();
                    } else {
                        requestPermission();
                    }
                }).catch((err: Error) => {
                    setIsLoading(false);
                    setErrorMessage(err.message);
                });
        }
    }, [isLoadFirstTime]);

    const [warningMessage, setWarningMessage] = React.useState('');
    function requestPermission() {
        setIsLoading(true);
        PermissionsAndroid.request(permission, {
            title: 'Quyền truy cập bộ nhớ',
            message: 'Music App cần đọc bộ nhớ của bạn để bạn có thể nghe nhạc.',
            buttonNeutral: 'Hỏi tôi sau',
            buttonNegative: 'Hủy',
            buttonPositive: 'Đồng ý'
        }).then((granted: RN.PermissionStatus) => {
            setIsLoading(false);
            switch(granted) {
                default: break;
                case 'granted':
                    getAllMusicFiles();
                    break;
                case 'denied':
                    setWarningMessage('Bạn không thể chơi nhạc được nếu không cấp quyền cho ứng dụng này.')
                    break;
            }
        }).catch((error: Error) => {
            setErrorMessage(error.message);
            setIsLoading(false);
        });
    }

    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            check(permission)
                .then((result) => {
                    setIsLoading(false);
                    if (result === 'granted') {
                        getAllMusicFiles();
                    } else {
                        requestPermission();
                    }
                }).catch((err: Error) => {
                    setIsLoading(false);
                    setErrorMessage(err.message);
                });
        }
    }, [isRefresh]);

    return {
        songs,
        errorMessage,
        isLoading,
        warningMessage,
        isFinished: isLoadFirstTime === true,
        refresh: () => setIsRefresh(true),
    };
}