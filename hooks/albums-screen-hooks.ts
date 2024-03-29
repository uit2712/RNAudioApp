import React from 'react';
import { getAllAlbums } from '@functions/albums-screen-functions';
import { setListAlbumsAction } from '@store/actions/albums-screen-actions';
import { useDispatch } from 'react-redux';
import { useGetAllAlbumsSelector } from '@store/selectors/albums-screen-selectors';
import { useRefreshPromise } from '@hooks/index';

export function useGetAllAlbums(isGrantedPermission: boolean) {
    const { albums, isLoadFirstTime } = useGetAllAlbumsSelector();
    React.useEffect(() => {
        if (isLoadFirstTime === false && isGrantedPermission === true) {
            getAlbums();
        }
    }, [isLoadFirstTime, isGrantedPermission]);

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

    const { setIsRefresh } = useRefreshPromise(getAlbums);

    return {
        albums,
        isLoading,
        errorMessage,
        isFinished: isLoadFirstTime === true,
        refresh: () => setIsRefresh(true),
    }
}