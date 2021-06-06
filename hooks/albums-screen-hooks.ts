import { useGetAllAlbumsSelector } from '../store/selectors/albums-screen-selectors';
import MusicFiles from 'react-native-get-music-files';
import React from 'react';
import { IAlbum } from '../interfaces/albums-screen-interfaces';
import { avatarHelper } from '../helpers/songs-screen-helpers';
import { useDispatch } from 'react-redux';
import { setListAlbums } from '../store/actions/albums-screen-actions';

export function useGetAllAlbums() {
    const { albums, isLoadFirstTime } = useGetAllAlbumsSelector();

    React.useEffect(() => {
        if (isLoadFirstTime === false) {
            getAlbums();
        }
    }, [isLoadFirstTime]);

    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const dispatch = useDispatch();
    function getAlbums() {
        setIsLoading(true);
        MusicFiles.getAlbums()
            .then((result: IAlbum[]) => {
                setIsLoading(false);
                const albums = result.map(item => ({
                    ...item,
                    numberOfSongs: Number(item.numberOfSongs),
                    cover: avatarHelper.getAvatar(),
                }));
                dispatch(setListAlbums(albums));
            })
            .catch((error: Error) => {
                setIsLoading(false);
                setErrorMessage(error.message)
            });
    }

    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            getAlbums();
        }
    }, [isRefresh]);

    return {
        albums,
        isLoading,
        errorMessage,
        refresh: () => setIsRefresh(true),
    }
}