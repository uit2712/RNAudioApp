import { useSelector } from 'react-redux';
import { SoundFileType } from '../../types/songs-screen-types';
import { IApplicationState } from '../interfaces';

export function useGetAllSongsSelector() {
    return useSelector<IApplicationState, { songs: SoundFileType[], isLoadFirstTime: boolean }>(state => ({
        songs: state.songs.songs,
        isLoadFirstTime: state.songs.isLoadListSongsFirstTime,
    }));
}