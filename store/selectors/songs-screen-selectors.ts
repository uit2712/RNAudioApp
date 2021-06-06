import { IApplicationState } from '../interfaces';
import { SoundFileType } from '../../types/songs-screen-types';
import { useSelector } from 'react-redux';

export function useGetAllSongsSelector() {
    return useSelector<IApplicationState, { songs: SoundFileType[], isLoadFirstTime: boolean }>(state => ({
        songs: state.songs.songs,
        isLoadFirstTime: state.songs.isLoadListSongsFirstTime,
    }));
}