import { IApplicationState } from '@store/interfaces';
import { IArtist } from '@interfaces/artists-screen-interfaces';
import { SortArtistByPropertyType } from 'types/artists-screen-types';
import { SortOrderType } from 'types/index';
import { dynamicSortMultiple } from '@functions/index';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllArtistsSelector() {
    return useSelector<IApplicationState, { artists: IArtist[], isLoadFirstTime: boolean }>(state => {
        const orderStr = state.artists.orderType === 'asc' ? '' : '-';
        const artists = state.artists.artists.sort(dynamicSortMultiple(orderStr + state.artists.sortByProperyType, orderStr + 'artist'));

        return {
            artists,
            isLoadFirstTime: state.artists.isLoadListArtistsFirstTime,
        }
    });
}

export function useGetArtistOrderType() {
    return useSelector<IApplicationState, SortOrderType>(state => {
        return state.artists.orderType;
    });
}

export function useGetArtistSortByPropertyType() {
    return useSelector<IApplicationState, SortArtistByPropertyType>(state => {
        return state.artists.sortByProperyType;
    });
}

export function useGetSearchedArtistsSelector() {
    const searchText = useGetSearchTextSelector();
    return useSelector<IApplicationState, IArtist[]>(state => {
        const artists = state.artists.artists;
        if (!searchText) {
            return artists;
        }

        return artists.filter(item => item.artist.toLowerCase().includes(searchText.toLowerCase()) === true);
    });
}