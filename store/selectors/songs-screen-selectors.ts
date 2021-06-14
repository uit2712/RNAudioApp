import { SortSongByPropertyType, SoundFileType } from 'types/songs-screen-types';

import { IApplicationState } from '@store/interfaces';
import { SortOrderType } from 'types/index';
import { dynamicSortMultiple } from '@functions/index';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllSongsSelector() {
    return useSelector<IApplicationState, { songs: SoundFileType[], isLoadFirstTime: boolean }>(state => {
        const orderStr = state.songs.orderType === 'asc' ? '' : '-';
        const songs = state.songs.songs.sort(dynamicSortMultiple(orderStr + state.songs.sortByProperyType, orderStr + 'name'));
        
        return {
            songs,
            isLoadFirstTime: state.songs.isLoadListSongsFirstTime,
        }
    });
}

export function useGetSongOrderType() {
    return useSelector<IApplicationState, SortOrderType>(state => {
        return state.artists.orderType;
    });
}

export function useGetSongSortByPropertyType() {
    return useSelector<IApplicationState, SortSongByPropertyType>(state => {
        return state.songs.sortByProperyType;
    });
}

export function useGetSearchedSongsSelector() {
    const searchText = useGetSearchTextSelector();
    
    return useSelector<IApplicationState, SoundFileType[]>(state => {
        const songs = state.songs.songs;
        if (!searchText) {
            return songs;
        }

        return songs.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()) === true);
    });
}