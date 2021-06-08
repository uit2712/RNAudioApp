import { IApplicationState } from '@store/interfaces';
import { SoundFileType } from 'types/songs-screen-types';
import { useGetSearchTextSelector } from './search-screen-selectors';
import { useSelector } from 'react-redux';

export function useGetAllSongsSelector() {
    return useSelector<IApplicationState, { songs: SoundFileType[], isLoadFirstTime: boolean }>(state => ({
        songs: state.songs.songs,
        isLoadFirstTime: state.songs.isLoadListSongsFirstTime,
    }));
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