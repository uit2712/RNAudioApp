import { IApplicationState } from '@interfaces/index';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllArtistsSelector() {
    return useSelector<IApplicationState, { artists: IArtist[], isLoadFirstTime: boolean }>(state => ({
        artists: state.artists.artists,
        isLoadFirstTime: state.artists.isLoadListArtistsFirstTime,
    }));
}

export function useGetSearchedArtistsSelector() {
    const searchText = useGetSearchTextSelector();
    return useSelector<IApplicationState, IArtist[]>(state => {
        const artists = state.artists.artists;
        if (!searchText) {
            return artists;
        }

        return artists.filter(item => item.artist.includes(searchText) === true);
    });
}