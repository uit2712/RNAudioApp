import { IApplicationState } from '@store/interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { dynamicSort } from '@functions/index';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllSongsSelector() {
    return useSelector<IApplicationState, { songs: SoundFileType[], isLoadFirstTime: boolean }>(state => {
        const orderStr = state.songs.orderType === 'asc' ? '' : '-';
        const songs = state.songs.songs.sort(dynamicSort(orderStr + state.songs.sortByProperyType));
        console.log(songs.map(item => item.album));
        return {
            songs,
            isLoadFirstTime: state.songs.isLoadListSongsFirstTime,
        }
    });
}

export function useGetSearchedSongsSelector() {
    const searchText = useGetSearchTextSelector();
    
    return useSelector<IApplicationState, SoundFileType[]>(state => {
        const songs = state.songs.songs;
        if (!searchText) {
            return songs;
        }

        return songs.filter(item => item.name.includes(searchText) === true);
    });
}