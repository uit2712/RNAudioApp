import React from 'react';
import MusicFiles from 'react-native-get-music-files';
import { useDispatch } from 'react-redux';
import { avatarHelper } from '../helpers/songs-screen-helpers';
import { IArtist } from '../interfaces/artists-screen-interfaces';
import { setListArtists } from '../store/actions/artists-screen-actions';
import { useGetAllArtistsSelector } from '../store/selectors/artists-screen-selectors';

export function useGetAllArtists() {
    const { artists, isLoadFirstTime } = useGetAllArtistsSelector();
    React.useEffect(() => {
        if (isLoadFirstTime === false) {
            getArtists();
        }
    }, [isLoadFirstTime]);
    
    const [isLoading, setIsLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const dispatch = useDispatch();
    function getArtists() {
        setIsLoading(true);
        MusicFiles.getArtists()
            .then((result: IArtist[]) => {
                setIsLoading(false);
                setIsRefresh(false);
                const artists = result.map(item => ({
                    ...item,
                    numberOfSongs: Number(item.numberOfSongs),
                    cover: avatarHelper.getAvatar(),
                }));
                dispatch(setListArtists(artists));
            }).catch((error: Error) => {
                setIsLoading(false);
                setIsRefresh(false);
                setErrorMessage(error.message);
            });
    }
    
    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            getArtists();
        }
    }, [isRefresh]);

    return {
        artists,
        isLoading,
        errorMessage,
        refresh: () => setIsRefresh(true),
    }
}