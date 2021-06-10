import React from 'react';
import { getAllAlbums } from '@functions/albums-screen-functions';
import { setListAlbumsAction } from '@store/actions/albums-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetAllAlbumsSelector } from '@store/selectors/albums-screen-selectors';
import { useRefresh } from '@hooks/index';

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
        return getAllAlbums().then((albums) => {
            dispatch(setListAlbumsAction(albums));
            setIsLoading(false);
        }).catch((error: Error) => {
            setIsLoading(false);
            setErrorMessage(error.message);
        });
    }

    const { setIsRefresh } = useRefresh(getAlbums);

    return {
        albums,
        isLoading,
        errorMessage,
        isFinished: isLoadFirstTime === true,
        refresh: () => setIsRefresh(true),
    }
}