import React from 'react';
import { useDispatch } from 'react-redux';
import { getAllArtists } from '../functions/artists-screen-functions';
import { setListArtists } from '../store/actions/artists-screen-actions';
import { useGetAllArtistsSelector } from '../store/selectors/artists-screen-selectors';

export function useGetAllArtists() {
    const { artists, isLoadFirstTime } = useGetAllArtistsSelector();
    React.useEffect(() => {
        if (isLoadFirstTime === false) {
            getArtists();
        }
    }, [isLoadFirstTime]);
    
    const dispatch = useDispatch();
    async function getArtists() {
        let artists = await getAllArtists();
        dispatch(setListArtists(artists));
    }
    
    const [isRefresh, setIsRefresh] = React.useState(false);
    React.useEffect(() => {
        if (isRefresh === true) {
            getArtists();
        }
    }, [isRefresh]);

    return {
        artists,
        refresh: () => setIsRefresh(true),
    }
}